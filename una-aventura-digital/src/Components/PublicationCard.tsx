import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import '../Styles/PublicationCard.css'; // Asegúrate de tener este archivo CSS para estilos adicionales
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

interface PublicationProps {
  publication: {
    id: string;
    username: string;
    description: string;
    images: string[];   
    likes: number;
    comments: string[]; // Asegúrate de que el campo 'comments' esté en la base de datos
  };
}

export const PublicationCard: React.FC<PublicationProps> = ({ publication }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likes, setLikes] = useState(publication.likes);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(publication.comments || []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % publication.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [publication.images.length]);

  useEffect(() => {
    // Sincroniza los comentarios con los datos actuales de la base de datos
    const fetchPublicationData = async () => {
      const publicationRef = doc(db, 'publications', publication.id);
      const docSnap = await getDoc(publicationRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.comments) {
          setComments(data.comments);
        }
      }
    };

    fetchPublicationData();
  }, [publication.id]);

  const handleLike = async () => {
    try {
      if (!liked) {
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);

        // Actualiza el número de likes en la base de datos
        const publicationRef = doc(db, 'publications', publication.id);
        await updateDoc(publicationRef, {
          likes: likes + 1
        });
      }
    } catch (error) {
      console.error("Error al actualizar los likes:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      const newComment = comment.trim();
      setComments((prevComments) => [...prevComments, newComment]);
      setComment('');
  
      try {
        const publicationRef = doc(db, 'publications', publication.id);
        await updateDoc(publicationRef, {
          comments: arrayUnion(newComment)  // Agrega el comentario a la lista en la base de datos
        });
      } catch (error) {
        console.error("Error al agregar el comentario:", error);
      }
    }
  };

  return (
    <div className="publication-card">
      <div className={`like-animation ${liked ? 'active' : ''}`} onAnimationEnd={() => setLiked(false)}></div>
      <div className="publication-content">
        <div className="image-carousel">
          <div className="image-container">
            {publication.images.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded by ${publication.username}`} style={{ display: index === currentImageIndex ? 'block' : 'none' }} />
            ))}
          </div>
        </div>
        <div className="publication-text">
          <h3>{publication.username}</h3>
          <p>{publication.description}</p>
          <div className="comments-section">
            {comments.map((comm, index) => (
              <div key={index} className="comment">{comm}</div>
            ))}
          </div>
          <div className="likes-comments">
            <div className="likes" onClick={handleLike}>
              <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} className="heart-icon" /> {likes}
            </div>
            <div className="comments-reactions">
              <input 
                type="text" 
                placeholder="Add a comment" 
                className="comment-input" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
              />
              <FontAwesomeIcon 
                icon={faPaperPlane} 
                className="send-icon" 
                onClick={handleCommentSubmit} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PublicationCard;