import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, db, storage } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Navbar from './Navbar';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email');
      return;
    }

    if (password.length < 8) {
      alert('Password must be ate least 8 chars long');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Created account for:', user.email);

        // Add user profile information to Firestore
        const profileRef = collection(db, 'profile');
        const userDoc = {
          userPhoto: imageUrl,
          userName: user.displayName,
          uid: user.uid,
          bio: '',
        };
        addDoc(profileRef, userDoc)
          .then(() => {
            navigate('/');
          })
          .catch((error) => {
            console.log(
              'Error adding user profile information to Firestore:',
              error
            );
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error: ', errorCode, errorMessage);
      });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, 'profile/' + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Image uploaded successfully');
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        console.log('Image URL:', url);
        setImageUrl(url); // set imageUrl state variable
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="max-w-md w-full mx-auto p-8 md:p-10 rounded-md bg-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Signup Form</h2>
          <form onSubmit={handleRegisterFormSubmit} className="grid gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Email</span>
              <div className="flex items-center rounded-md shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full p-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Password</span>
              <div className="flex items-center rounded-md shadow-sm">
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full p-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="********"
                />
              </div>
            </label>
            
            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Profile Picture</span>
              <div className="flex items-center rounded-md shadow-sm">
                <input
                  type="file"
                  onChange={handleUpload}
                  className="block w-full p-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
