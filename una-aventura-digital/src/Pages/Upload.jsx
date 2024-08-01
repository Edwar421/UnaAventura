import React, { useState } from 'react';
import { storage, db } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import '../Styles/Upload.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Upload = () => {
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      setDescriptions(Array(files.length).fill('')); // Inicializar descripciones vacías
    }
  };

  const handleDescriptionChange = (index, e) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = e.target.value;
    setDescriptions(newDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Por favor, selecciona al menos una imagen.');
      return;
    }
    setError(''); // Resetear el error
    setIsLoading(true);

    const imagePromises = images.map((image, index) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url: downloadURL, description: descriptions[index] });
          }
        );
      });
    });

    try {
      const imageData = await Promise.all(imagePromises);
      await addDoc(collection(db, 'images'), {
        images: imageData,
        timestamp: new Date()
      });
      alert('Imágenes subidas exitosamente!');
      setImages([]);
      setDescriptions([]);
    } catch (error) {
      console.error("Error subiendo imágenes: ", error);
      setError('Error al subir las imágenes. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="upload-form">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label htmlFor="imageUpload">Subir Imágenes</label>
              <input 
                type="file" 
                id="imageUpload" 
                multiple 
                onChange={handleImageChange} 
                className="form-control" 
              />
            </div>
            {images.length > 0 && (
              <div className="form-group">
                {images.map((image, index) => (
                  <div key={index} className="image-description-group">
                    <label htmlFor={`description-${index}`}>Descripción para la imagen {index + 1}</label>
                    <input 
                      type="text" 
                      id={`description-${index}`} 
                      value={descriptions[index] || ''} 
                      onChange={(e) => handleDescriptionChange(index, e)} 
                      className="form-control" 
                    />
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="preview-image"
                    />
                  </div>
                ))}
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Subiendo...' : 'Subir'}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="static-image-container">
            <img src="/Imagenes/Collage.jpg" alt="Viaje Fotográfico" className="static-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
