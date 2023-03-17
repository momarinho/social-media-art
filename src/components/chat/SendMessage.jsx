import React, { useState } from 'react';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const EmoticonPicker = ({ onEmoticonSelect, onClose }) => {
  const emoticons = [
    '😀',
    '😂',
    '😍',
    '😎',
    '👍',
    '👎',
    '👌',
    '✌️',
    '🙌',
    '👏',
  ];

  return (
    <div className="flex flex-wrap my-2">
      {emoticons.map((emoticon) => (
        <button
          key={emoticon}
          type="button"
          className="mx-1 my-1 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={() => onEmoticonSelect(emoticon)}
        >
          {emoticon}
        </button>
      ))}
      <button
        type="button"
        className="text-white mx-1 my-1 px-2 rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none"
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
};

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState('');
  const [showEmoticonPicker, setShowEmoticonPicker] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (message.trim() === '') {
      alert('Enter a valid message');
      return;
    }

    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmoticonSelect = (emoticon) => {
    setMessage((prevMessage) => prevMessage + emoticon);
    setShowEmoticonPicker(false);
  };

  const handleCloseEmoticonPicker = () => {
    setShowEmoticonPicker(false);
  };

  return (
    <div className="py-2 bg-gray-700 fixed bottom-0 left-0 w-full">
      <form onSubmit={sendMessage} className="flex items-center">
        <label htmlFor="messageInput" className="sr-only">
          Enter Message
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2 m-1 flex-grow"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          id="messageInput"
          name="messageInput"
          type="text"
          maxLength={200}
          placeholder="Type your message here..."
        />
        <button
          type="button"
          className="m-1 bg-gray-200 hover:bg-gray-300 text-black font-bold p-2 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowEmoticonPicker(true)}
        >
          😀
        </button>
        {showEmoticonPicker && (
          <div className="absolute bottom-10 right-0 z-50 bg-white rounded-lg shadow-lg">
            <EmoticonPicker
              onEmoticonSelect={handleEmoticonSelect}
              onClose={handleCloseEmoticonPicker}
            />
            <button
              type="button"
              className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleCloseEmoticonPicker}
            ></button>
          </div>
        )}
        <button
          type="submit"
          className="m-1 bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;