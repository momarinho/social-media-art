import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Comments = ({ postId }) => {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newComments = [];
      querySnapshot.forEach((doc) => {
        newComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(newComments);
    });
    return unsubscribe;
  }, [postId]);

  return (
    <>
      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment.id}>
            <p className="font-medium">{comment.userId}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
