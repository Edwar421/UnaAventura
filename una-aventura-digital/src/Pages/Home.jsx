import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { PublicationCard } from '../Components/PublicationCard.tsx';
import '../Styles/Home.css';

const Home = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'publications'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPublications(posts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Vive Una Aventura Digital</h1>
      <div className="publications">
        {publications.map(publication => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </div>
  );
};

export default Home;
