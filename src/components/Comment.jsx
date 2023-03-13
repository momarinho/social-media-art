import { useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Comment = ({ postId }) => {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentDoc = {
        text: comment,
        createdAt: new Date(),
        userId: user.uid,
        postId,
      };
      await addDoc(collection(db, 'comments'), commentDoc);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full h-10 px-3 py-2 text-base placeholder-gray-500 border rounded-lg focus:shadow-outline"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-700 focus:outline-none focus:shadow-outline-blue hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
};

export default Comment;
