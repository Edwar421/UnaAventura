// src/components/ImageUploadForm.js
import React, { useState } from 'react';
import { storage, db } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const ImageUploadForm = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('Aventura');

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagePromises = images.map((image) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          () => {},
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    try {
      const imageUrls = await Promise.all(imagePromises);
      await addDoc(collection(db, 'images'), {
        description,
        urls: imageUrls,
        timestamp: new Date()
      });
      alert('Imágenes subidas exitosamente!');
      setImages([]);
    } catch (error) {
      console.error("Error subiendo imágenes: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <select id="description" value={description} onChange={handleDescriptionChange} className="form-control">
          <option value="Aventura">Aventura</option>
          <option value="Dia a dia">Día a día</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="imageUpload">Subir Imágenes</label>
        <input type="file" id="imageUpload" multiple onChange={handleImageChange} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Subir</button>
    </form>
  );
};

export default ImageUploadForm;
