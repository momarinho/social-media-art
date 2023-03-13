import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import Loading from './Loading';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newComments = [];
      querySnapshot.forEach((doc) => {
        newComments.push({ ...doc.data(), id: doc.id });
      });
      setComments(newComments);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [postId]);

  const sortedComments = comments
    .slice()
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="mt-4 space-y-4"
          style={{ maxHeight: '400px', overflowY: 'scroll' }}
        >
          {sortedComments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4">
              <img
                src={comment.userPhoto}
                alt={comment.userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{comment.userName}</p>
                <p className="text-lg">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
