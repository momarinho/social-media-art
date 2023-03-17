import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentPosts = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
    .slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % sortedPosts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, sortedPosts.length]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="flex md:flex-row mx-auto flex-col">
          {sortedPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex"
              style={{ textDecoration: 'none' }}
            >
              <div
                className={`bg-white shadow-md mb-4 hover:scale-105 hover:opacity-80 ${
                  index === currentIndex ? '' : 'hidden'
                }`}
                style={{
                  backgroundImage: `url(${post.imageUrl})`,
                  height: '320px',
                  width: '520px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex flex-col justify-end px-6 pb-6 h-full">
                  <div
                    className="text-xl font-bold mb-4 text-white"
                    style={{
                      textShadow: '0px 0px 4px rgba(0,0,0, 1)',
                    }}
                  >
                    {post.caption}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center h-full mt-2">
          {sortedPosts.map((post, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              style={{
                textShadow: '1px 1px 4px rgba(0,0,0, 0.9)',
              }}
              onClick={() => goToIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
