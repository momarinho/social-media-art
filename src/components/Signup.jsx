import { useState } from 'react';
import { auth, storage } from '../config/firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create user account
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Upload photo to Firebase Storage
      if (photo) {
        const storageRef = storage.ref();
        const photoRef = storageRef.child(`users/${user.uid}/photo`);
        await photoRef.put(photo);
        const photoUrl = await photoRef.getDownloadURL();

        // Update user profile with photo URL
        await user.updateProfile({
          photoURL: photoUrl,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Photo:
          <input type="file" onChange={handlePhotoChange} />
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
