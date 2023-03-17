import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Navbar from './Navbar';
import Loading from './Loading';
import PostGallery from './PostGallery';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
              <div className="mb-4 md:mb-0">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
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
              </div>
              <div className="flex justify-center items-center flex-col">
                <img
                  src={user.userPhoto}
                  alt={user.userName}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {user.userName}
                </h1>
                <div className="w-full">
                  <Tabs>
                    <TabList>
                      <Tab>Gallery</Tab>
                      <Tab>Bio</Tab>
                      <Tab>Contact Links</Tab>
                    </TabList>

                    <TabPanel>
                      {posts.length > 0 ? (
                        <PostGallery posts={posts} />
                      ) : (
                        <p>No posts to display.</p>
                      )}
                    </TabPanel>
                    <TabPanel>
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Bio:
                      </h1>
                    </TabPanel>
                    <TabPanel>
                      <p>Contact Links tab content goes here.</p>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
