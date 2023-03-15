import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Navbar from './Navbar';

function UpdateProfile() {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const userRef = doc(db, 'users', id);
    userRef.get().then((doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setUser(userData);
        setUserName(userData.userName);
        setUserPhoto(userData.userPhoto);
        setBio(userData.bio);
      } else {
        console.log('User not found!');
      }
    });
  }, [id]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserPhotoChange = (e) => {
    setUserPhoto(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, {
      userName,
      userPhoto,
      bio,
    });
    history.push(`/profile/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="userName"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={handleUserNameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="userPhoto"
              >
                Profile Picture URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userPhoto"
                type="text"
                placeholder="Profile Picture URL"
                value={userPhoto}
                onChange={handleUserPhotoChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bio"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={handleBioChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit
                "
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
