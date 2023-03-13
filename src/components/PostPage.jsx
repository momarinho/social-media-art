import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import Navbar from './Navbar';
import Loading from './Loading';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setPost({ ...doc.data(), id: doc.id });
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [id]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto mt-10">
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full object-cover"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
            <div className="px-3 pt-3 pb-2">
              <p className="text-sm">{post.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
