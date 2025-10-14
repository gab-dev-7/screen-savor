// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, limit, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Firebase functions
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const searchCollection = collection(db, 'searches');
    const q = query(searchCollection, where('searchTerm', '==', searchTerm));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Update existing document
      const docSnapshot = querySnapshot.docs[0];
      await updateDoc(doc(db, 'searches', docSnapshot.id), {
        count: docSnapshot.data().count + 1,
      });
    } else {
      // Create new document
      await addDoc(searchCollection, {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        createdAt: new Date()
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const searchCollection = collection(db, 'searches');
    const q = query(searchCollection, orderBy('count', 'desc'), limit(5));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      $id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
