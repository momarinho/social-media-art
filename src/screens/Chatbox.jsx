import React, { useEffect, useRef, useState } from 'react';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import Message from '../components/chat/Message';
import SendMessage from '../components/chat/SendMessage';
import Navbar from '../components/Navbar';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messages);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen mt-2 mr-2 ml-2 mb-16 flex flex-col justify-between">
        <div className="flex-grow overflow-y-auto">
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div className="flex justify-center items-center h-12 bg-gray-200">
          <span className="text-sm mr-2">New messages!</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 19c-4.7 0-8.5-3.8-8.5-8.5S5.3 2 10 2s8.5 3.8 8.5 8.5c0 4.7-3.8 8.5-8.5 8.5zm0-1.5c3.6 0 6.5-2.9 6.5-6.5S13.6 4.5 10 4.5 3.5 7.4 3.5 11c0 3.6 2.9 6.5 6.5 6.5zm-2.8-9.2L9 9.4v4.4c0 .3.2.5.5.5s.5-.2.5-.5V9.4l1.3-1.3c.2-.2.2-.5 0-.7s-.5-.2-.7 0L10 8.3l-1.5-1.5c-.2-.2-.5-.2-.7 0s-.2.5 0 .7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="sticky bottom-0 left-0 right-0">
          <SendMessage scroll={scroll} />
        </div>
      </main>
    </>
  );
};

export default ChatBox;
