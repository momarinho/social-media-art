import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';

import Loading from './Loading';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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

  const searchPosts = () => {
    const queryText = inputValue.trim().toLowerCase();
    if (queryText) {
      const filteredPosts = posts.filter((post) => {
        return (
          post.caption.toLowerCase().includes(queryText) ||
          post.content.toLowerCase().includes(queryText)
        );
      });
      setPosts(filteredPosts);
    } else {
      const collectionRef = collection(db, 'posts');
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setPosts(data);
      });
      return () => unsubscribe();
    }
  };

  const handleSearch = () => {
    searchPosts();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="mx-12">
        <div className="mx-4 my-8 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-md mr-2 ml-12 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
              width="26"
              height="26"
            >
              <path
                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M338.29 338.29L448 448"
              ></path>
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="fixed left-4 top-24 items-center flex justify-center w-10 h-10 bg-white rounded-full border border-gray-300 shadow-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
          onClick={handleBack}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4 text-gray-500">All Posts</h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mx-4 my-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="bg-white rounded-lg shadow-2xl p-24 hover:shadow-xl relative"
            >
              <h2 className="text-xl font-bold mb-2">{post.caption}</h2>
              <p
                className="mb-4 text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: `${post.content.substring(0, 100)}...`,
                }}
              ></p>
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0 hover:opacity-100"
                style={{ backgroundColor: 'gray' }}
              />

              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt.toDate()).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
