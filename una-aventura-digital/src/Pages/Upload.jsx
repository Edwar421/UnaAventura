import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { /*db,*/ UploadFile } from '../firebase-config';
//import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import '../Styles/Upload.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));

    if (validFiles.length === 0) {
      alert("Por favor, selecciona al menos un archivo de imagen.");
      return;
    }

    setFiles(validFiles);
    setSelectedFiles(validFiles.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (files.length === 0) {
      alert("Por favor, selecciona al menos un archivo.");
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
          const uploadTask = UploadFile(file);
  
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
                console.log("Datos a enviar a Firestore:", {
                  url: downloadURL,
                  description: description || '',
                  fileName: file.name || 'Sin nombre',
                });
  
                /*await addDoc(collection(db, 'uploads'), {
                  url: downloadURL,
                  description: description || '',
                  fileName: file.name || 'Sin nombre',
                });*/
                resolve();
              } catch (error) {
                reject(error.message);
              }
            }
          );
        });
      });
  
      await Promise.all(uploadPromises);
      alert("¡Archivos subidos con éxito!");
      navigate('/Home');
    } catch (error) {
      setError(`La carga falló: ${error.message}`);
    } finally {
      setUploading(false);
      setSelectedFiles([]);
    }
  };

  return (
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
  );
};

export default Upload;
