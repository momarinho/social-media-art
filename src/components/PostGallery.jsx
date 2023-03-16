import React from 'react';
import { Link } from 'react-router-dom';

export default function PostGallery({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mx-auto max-w-5xl">
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`} className="relative group">
          <img
            key={post.id}
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full hover:scale-110 cursor-pointer transition-transform duration-500 ease-in-out"
          />
        </Link>
      ))}
    </div>
  );
}
