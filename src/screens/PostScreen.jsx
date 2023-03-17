import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useNavigate, useParams, Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Comment from '../components/Comment';
import Comments from '../components/Comments';
import Footer from '../components/Footer';
import LikeButton from '../components/LikeButton';
import BackButton from '../components/BackButton';

const PostScreen = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
          <div className="flex items-center justify-center space-x-4">
            <BackButton />
            <LikeButton post={post} />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="mx-auto w-auto h-auto object-cover"
                  style={{ maxHeight: '580px', minHeight: '420px' }}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </div>

              <div className="w-full lg:w-1/2 px-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{post.caption}</h2>
                      <p className="text-gray-700">{post.content}</p>
                    </div>
                    <div className="flex items-center">
                      <Link key={post.uid} to={`/profile/${post.uid}`}>
                        <img
                          src={post.userPhoto}
                          alt={post.userName}
                          className="w-10 h-10 rounded-full mr-2 object-cover"
                        />
                        <p className="font-bold">{post.userName}</p>
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-4">
                    <Comments postId={id} />
                  </div>
                </div>

                <div className="mt-4">
                  <Comment postId={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default PostScreen;
