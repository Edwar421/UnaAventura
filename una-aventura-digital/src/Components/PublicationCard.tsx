import React, { useEffect, useState } from 'react';
import '../Styles/PublicationCard.css'; // Asegúrate de tener este archivo CSS para estilos adicionales

interface PublicationProps {
  publication: {
    id: string;
    username: string;
    description: string;
    images: string[];
    likes: number; // Añadido para contar los likes
  };
}

export const PublicationCard: React.FC<PublicationProps> = ({ publication }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % publication.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [publication.images.length]);

  return (
    <div className="publication-card">
      <div className="publication-content">
        <div className="image-carousel">
          {publication.images.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded by ${publication.username}`} style={{ display: index === currentImageIndex ? 'block' : 'none' }} />
          ))}
        </div>
        <div className="publication-text">
          <h3>{publication.username}</h3>
          <p>{publication.description}</p>
          <div className="comments-reactions">
            <input type="text" placeholder="Add a comment" className="comment-input" />
            <button className="react-button">React</button>
          </div>
          <div className="likes">
            <i className="heart-icon">❤️</i> {publication.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
