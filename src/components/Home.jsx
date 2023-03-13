import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Loading from './Loading';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, 'posts');
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPosts(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto mt-10">
          <div className="flex flex-wrap justify-center">
            {posts.map((post) => (
              <div
                key={post.id}
                className="w-80 bg-white m-4 border border-gray-300 rounded-lg overflow-hidden shadow-md"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-80 object-cover"
                  />
                )}

                <div className="px-3 pt-3 pb-2">
                  <div className="flex items-center">
                    <img
                      src={user?.photoURL}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="ml-2 font-bold text-sm">{post.userEmail}</p>
                  </div>
                  <p className="text-sm">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
          {user && (
            <Link to="/add">
              <div className="fixed bottom-8 right-8 bg-blue-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-3xl font-bold shadow-lg">
                +
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
