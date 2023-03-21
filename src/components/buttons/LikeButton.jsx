import React, { useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const LikeButton = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(
    post.likedBy?.includes(auth.currentUser?.uid) || false
  );

  const handleLikeClick = async () => {
    const currentUser = auth.currentUser;
    const postRef = doc(db, 'posts', post.id);

    // Check if the user is logged in
    if (!currentUser) {
      return;
    }

    // Check if the user has already liked the post
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();
    const likedBy = postData.likedBy || [];
    if (likedBy.includes(currentUser.uid)) {
      // User has already liked the post, so unlike it
      const newLikes =
        typeof postData.likes === 'number' ? postData.likes - 1 : 0;
      const newLikedBy = likedBy.filter((uid) => uid !== currentUser.uid);
      await updateDoc(postRef, { likes: newLikes, likedBy: newLikedBy });
      setLikes(newLikes);
      setIsLiked(false);
    } else {
      // User hasn't liked the post yet, so like it
      const newLikes =
        typeof postData.likes === 'number' ? postData.likes + 1 : 1;
      const newLikedBy = [...likedBy, currentUser.uid];
      await updateDoc(postRef, { likes: newLikes, likedBy: newLikedBy });
      setLikes(newLikes);
      setIsLiked(true);
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      type="button"
      className={
        'inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-500'
      }
      aria-label="Like"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-6 h-5 ${isLiked ? 'text-red-500 fill-current' : ''}`}
      >
        <path d="M21.77 6.03a5.5 5.5 0 0 0-7.78 0L12 7.94l-2.99-1.91a5.5 5.5 0 0 0-7.78 0c-2.14 2.14-2.14 5.64 0 7.78l10.77 6.89 10.77-6.89a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};

export default LikeButton;
