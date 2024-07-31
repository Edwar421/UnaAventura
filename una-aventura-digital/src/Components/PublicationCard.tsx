// PublicationCard.tsx
import React, { useEffect, useState } from 'react';

interface PublicationProps {
  publication: {
    id: string;
    username: string;
    description: string;
    images: string[];
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
      <h3>{publication.username}</h3>
      <p>{publication.description}</p>
      <div className="image-carousel">
        {publication.images.map((image, index) => (
          <img key={index} src={image} alt={`Uploaded by ${publication.username}`} style={{ display: index === currentImageIndex ? 'block' : 'none' }} />
        ))}
      </div>
      <div className="comments-reactions">
        <input type="text" placeholder="Add a comment" />
        <button>React</button>
      </div>
    </div>
  );
};
