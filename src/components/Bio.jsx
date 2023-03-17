import React, { useEffect } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
} from 'firebase/firestore';

const Bio = ({ id }) => {
  useEffect(() => {
    const bioRef = doc(db, 'bios', id);
    const unsubscribeBio = onSnapshot(bioRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setBio(docSnapshot.data().bio);
      } else {
        setBio('');
      }
    });

    return () => {
      unsubscribeBio();
    };
  }, [id]);

  const handleBioSubmit = async (event) => {
    event.preventDefault();

    const bioRef = doc(db, 'bios', id);

    try {
      await setDoc(bioRef, { bio });
    } catch (error) {
      console.error('Error adding bio: ', error);
    }
  };

  return (
    <form onSubmit={handleBioSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bio"
          rows="5"
          placeholder="Tell us about yourself"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save
      </button>
    </form>
  );
};

export default Bio;
