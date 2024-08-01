import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { PublicationCard } from '../Components/PublicationCard.tsx';
import '../Styles/Home.css';

const Home = () => {
  const [publications, setPublications] = useState([]);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'publications'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPublications(posts);
    });

    return () => unsubscribe();
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

  return (
    <div>
      <div className={`banner ${showBanner ? '' : 'hidden'}`}>
        <div className="banner-content">
          <h1>Bienvenido a Tu Aventura Digital</h1>
          <h4>Un lugar increíble donde podrás ver los viajes más emocionantes
            y las mejores experiencias de los aventureros más intrépidos.
          </h4>
        </div>
      </div>
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
