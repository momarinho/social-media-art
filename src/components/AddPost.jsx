import { useState } from 'react';
import { db, storage, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import BackButton from './buttons/BackButton';
import Footer from './Footer';

const AddPost = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uid, setUid] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, 'images/' + file.name);
    setIsLoading(true); // set isLoading to true when the upload starts
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Image uploaded successfully');
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        console.log('Image URL:', url);
        setImageUrl(url); // set imageUrl state variable
        setIsLoading(false); // set isLoading back to false when the upload is complete
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setIsLoading(false); // set isLoading back to false when there's an error
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If imageUrl is empty, return to prevent adding empty post
    if (!imageUrl) return;

    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, 'posts'), {
        userPhoto: user.photoURL,
        userName: user.displayName,
        uid: user.uid,
        imageUrl,
        caption,
        content,
        createdAt: new Date(),
      });
      console.log('New post added with ID:', docRef.id);
      setImageUrl('');
      setCaption('');
      setContent('');
      setUid('');
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      console.error('Error adding post:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 mb-10">
        <div className="mb-4 md:mb-0">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-5">Add Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="imageUrl"
            >
              Image
            </label>
            <input type="file" onChange={handleUpload} required />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="caption"
            >
              Caption
            </label>
            <input
              className="w-full border rounded py-2 px
              -3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Content
            </label>
            <textarea
              className="w-full border rounded py-2 px
              -3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!imageUrl || isLoading} // disable the button if imageUrl is empty or isLoading is true
          >
            {isLoading ? 'Adding post...' : 'Add Post'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddPost;
