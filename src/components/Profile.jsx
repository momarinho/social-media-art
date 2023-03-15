import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Navbar from './Navbar';
import Loading from './Loading';

function PostGallery({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 mx-4">
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <img
            key={post.id}
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full hover:scale-105 cursor-pointer"
          />
        </Link>
      ))}
    </div>
  );
}

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const postQuery = query(postsRef, where('uid', '==', id));
    const unsubscribePost = onSnapshot(postQuery, (querySnapshot) => {
      const updatedPosts = [];
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ ...doc.data(), id: doc.id });
        if (doc.data().uid === id) {
          setUser(doc.data());
        }
      });
      setPosts(updatedPosts);
      setIsLoading(false);
    });

    return () => {
      unsubscribePost();
    };
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
              <div className="flex justify-center items-center flex-col">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {user.userName}
                </h1>
                {/* <Link to={`/edit-profile/${id}`}>Edit Profile</Link> */}

                <img
                  src={user.userPhoto}
                  alt={user.userName}
                  className="w-24 h-24 rounded-full mb-4"
                />
                {posts.length > 0 && <PostGallery posts={posts} />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
