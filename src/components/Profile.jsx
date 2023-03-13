import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import Navbar from './Navbar';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h2>Profile</h2>
        <p>Display Name: {displayName}</p>
        <p>Bio: {bio}</p>
        {/* {userGallery && (
         {}
        )} */}
      </div>
      <Link to="/update-profile">Edit</Link>
    </>
  );
};

export default Profile;
