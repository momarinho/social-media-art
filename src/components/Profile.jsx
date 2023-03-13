import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import Navbar from './Navbar';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [artworkURL, setArtworkURL] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
      setArtworkURL(user.artworkURL || '');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h2>Profile</h2>
        <p>Display Name: {displayName}</p>
        <p>Bio: {bio}</p>
        {artworkURL && (
          <img src={artworkURL} alt="Artwork" style={{ maxWidth: '200px' }} />
        )}
      </div>
      <Link to="/update-profile">Edit</Link>
    </>
  );
};

export default Profile;
