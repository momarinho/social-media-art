import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage } from '../config/firebase';
import Navbar from './Navbar';

function UpdateProfile() {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [artwork, setArtwork] = useState(null);

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Update display name and bio
      await user.updateProfile({
        displayName,
        bio,
      });

      // Upload artwork to Firebase Storage
      if (artwork) {
        const storageRef = storage.ref();
        const artworkRef = storageRef.child(`users/${user.uid}/artwork`);
        await artworkRef.put(artwork);
        const artworkUrl = await artworkRef.getDownloadURL();

        // Update user profile with artwork URL
        await user.updateProfile({
          artworkURL: artworkUrl,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleArtworkChange = (e) => {
    setArtwork(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Update Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <label>
            Display Name:
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <label>
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </label>
          <label>
            Artwork:
            <input type="file" onChange={handleArtworkChange} />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
