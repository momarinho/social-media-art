import React from 'react';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`flex mb-4 ${
        message.uid === user.uid ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`rounded-lg py-2 px-4 ${
          message.uid === user.uid ? 'bg-blue-400 text-white' : 'bg-gray-200'
        }`}
      >
        <p className="font-bold">{message.name}</p>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
