import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import LikeButton from './buttons/LikeButton';
import Loading from './Loading';

const AllPosts = ({ posts }) => {
  const [hasMore, setHasMore] = useState(true);
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    setSortedPosts(sortedPosts);
  }, [posts]);

  const fetchMoreData = () => {
    if (sortedPosts.length >= posts.length) {
      setHasMore(false);
      return;
    }

    const newSortedPosts = posts
      .slice(sortedPosts.length, sortedPosts.length + 10)
      .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    setSortedPosts([...sortedPosts, ...newSortedPosts]);
  };

  return (
    <InfiniteScroll
      dataLength={sortedPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loading />}
      endMessage={
        <p className="text-gray-400 text-center">You have seen all posts!</p>
      }
    >
      <div className="flex justify-center mt-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {sortedPosts.map((post) => (
            <div
              key={post.id}
              className="w-80 bg-white m-4 border border-gray-300 rounded-lg overflow-hidden shadow-md"
            >
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-96 object-cover hover:scale-110"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </Link>
              <div className="p-4">
                <div className="flex items-center">
                  <Link
                    key={post.uid}
                    to={`/profile/${post.uid}`}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={post.userPhoto}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-medium">{post.userName}</p>
                  </Link>
                </div>
                <p className="text-gray-600 mt-2">{post.caption}</p>
              </div>
              <div className="flex justify-between p-4">
                <div className="flex items-center space-x-4">
                  <LikeButton post={post} />
                </div>
                <p className="text-sm text-gray-600">
                  {post.createdAt.toDate().toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default AllPosts;
