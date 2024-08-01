import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, db } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../Styles/Upload.css';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [username, setUsername] = useState('Usuario desconocido');
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUsername(userData.name || 'Usuario desconocido');
        }
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector('.banner');
      const header = document.querySelector('.navbar');
      const bannerHeight = banner?.offsetHeight || 0;
      const scrollY = window.scrollY;

      if (scrollY > bannerHeight) {
        setShowBanner(false);
        header.classList.add('navbar-scrolled');
      } else {
        setShowBanner(true);
        header.classList.remove('navbar-scrolled');
      }

      if (banner) {
        banner.style.transform = `translateY(${scrollY * -1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));

    if (validFiles.length === 0) {
      setError("Por favor, selecciona al menos un archivo de imagen.");
      return;
    }

    setFiles(validFiles);
    setSelectedFiles(validFiles.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Por favor, selecciona al menos un archivo.");
      return;
    }

    if (!description) {
      setError("La descripción no puede estar vacía.");
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `images/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              reject(error.message);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
              } catch (error) {
                reject(error.message);
              }
            }
          );
        });
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);

      await addDoc(collection(db, 'publications'), {
        username: username,
        description: description || '',
        images: uploadedImageUrls,
        likes: 0,
        comments: [],
        timestamp: serverTimestamp()
      });

      // Actualiza el estado de éxito y redirige después de un tiempo
      setSuccessMessage("¡Archivos subidos con éxito!");
      setTimeout(() => {
        navigate('/Home');
      }, 2000);
    } catch (error) {
      setError(`La carga falló: ${error}`);
    } finally {
      setUploading(false);
      setSelectedFiles([]);
    }
  };

  return (
    <div className="upload-page">
      <div className={`banner ${showBanner ? '' : 'hidden'}`}>
        <div className="banner-content">
          <h1>Comparte tu Aventura</h1>
          <h4>Comparte tus mejores momentos de viaje con otros aventureros. ¡Sube tus fotos ahora! y mira que opinan los demás.
          </h4>
        </div>
      </div>
      <div className="content">
        <div className="upload-container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="upload-form">
                <h2>Subir Imágenes</h2>
                <div className="form-group">
                  <label htmlFor="imageUpload">Seleccionar Imágenes</label>
                  <input
                    type="file"
                    id="imageUpload"
                    multiple
                    onChange={handleFileChange}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Descripción del Viaje</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    rows="4"
                    placeholder="Ingrese una descripción general del viaje"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={uploading}
                >
                  {uploading ? 'Subiendo...' : 'Subir Imágenes'}
                </button>
                {uploading && (
                  <div className="progress mt-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${uploadProgress}%` }}
                      aria-valuenow={uploadProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {Math.round(uploadProgress)}%
                    </div>
                  </div>
                )}
                {error && <div className="alert alert-danger mt-2">{error}</div>}
                {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
              </form>
              <div className="mt-3">
                {selectedFiles.length > 0 && (
                  <div>
                    <h4>Archivos Seleccionados:</h4>
                    <div className="image-description-group">
                      {selectedFiles.map((fileURL, index) => (
                        <img key={index} src={fileURL} alt={`Selected File ${index}`} className="selected-file-image" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="static-image-container">
                <img
                  src="/Imagenes/Collage.jpg"
                  alt="Viaje Fotográfico"
                  className="static-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
