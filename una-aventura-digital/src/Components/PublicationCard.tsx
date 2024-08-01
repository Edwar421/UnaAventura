import React, { useEffect, useState } from 'react';

interface PublicationProps {
  publication: {
    id: string;
    usuario: string;
    descripcion: string;
    imagenes: string[];
    comentarios: string[];
  };
}

const PublicationCard: React.FC<PublicationProps> = ({ publication }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % publication.imagenes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [publication.imagenes.length]);

  return (
    <div className="publication-card">
      <h3>{publication.usuario}</h3>
      <p>{publication.descripcion}</p>
      <div className="image-carousel">
        {publication.imagenes.map((image, index) => (
          <img key={index} src={image} alt={`Uploaded by ${publication.usuario}`} style={{ display: index === currentImageIndex ? 'block' : 'none' }} />
        ))}
      </div>
      <div className="comments-reactions">
        <input type="text" placeholder="Add a comment" />
        <button>React</button>
      </div>
    </div>
  );
};

export default PublicationCard;
