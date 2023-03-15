import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Loading from './Loading';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    const collectionRef = collection(db, 'users');
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUsers(data);
    });
    return () => unsubscribe();
  }, []);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-center mt-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {sortedPosts.map((post) => (
              <div
                key={post.id}
                className="w-80 bg-white m-4 border border-gray-300 rounded-lg overflow-hidden shadow-md"
              >
                <Link key={post.id} to={`/posts/${post.id}`}>
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-96 object-cover hover:scale-105"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                  />
                </Link>
                <Link
                  key={post.uid}
                  to={`/profile/${post.uid}`}
                  className="px-3 pt-3 pb-2"
                >
                  <div className="flex items-center ml-2">
                    <img
                      src={post.userPhoto}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="ml-2 text-sm">{post.userName}</p>
                  </div>
                  <p className="text-sm text-end mr-4">{post.caption}</p>
                </Link>
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
