import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import PublicationCard from '../Components/PublicationCard.tsx'; // Asegúrate de que la ruta sea correcta

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
    <div className="publications">
      {publications.map(publication => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
};

export default Home;
