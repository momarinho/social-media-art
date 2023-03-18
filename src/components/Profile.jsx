import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Navbar from './Navbar';
import Loading from './Loading';
import PostGallery from './PostGallery';
import BackButton from './BackButton';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bio, setBio] = useState('');

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

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const userDoc = doc(usersRef, id);
    const unsubscribeUser = onSnapshot(userDoc, (doc) => {
      if (doc.exists()) {
        setUser(doc.data());
      }
    });

    return () => {
      unsubscribeUser();
    };
  }, [id, bio]); // Add `bio` to the dependencies array to re-run the effect when the `bio` state changes

  const handleBioSubmit = async (event) => {
    event.preventDefault();
    const usersRef = collection(db, 'users');
    const userDoc = doc(usersRef, id);
    await updateDoc(userDoc, {
      bio: bio,
    });
    setUser({ ...user, bio: bio }); // Update the `user` state with the new bio value
    setBio('');
  };

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
                <BackButton />
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
                      {user.bio ? <p>{user.bio}</p> : <p>No bio available.</p>}
                      <form onSubmit={handleBioSubmit}>
                        <label htmlFor="bio">Update Bio:</label>
                        <input
                          type="text"
                          id="bio"
                          value={bio}
                          onChange={(event) => setBio(event.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                          type="submit"
                          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Update
                        </button>
                      </form>
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
