import Footer from '../components/Footer';
import AllPosts from '../components/AllPosts';
import Navbar from '../components/Navbar';
import RecentPosts from '../components/RecentPosts';
import Loading from '../components/Loading';
import Posts from '../hooks/posts';

const HomeScreen = () => {
  const { posts, isLoading } = Posts();

  return (
    <>
      <Navbar />

      {/* Recent Posts section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          {isLoading ? <Loading /> : <RecentPosts posts={posts} />}
        </div>
      </section>

      {/* All Posts section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">All Posts</h2>
          {isLoading ? <Loading /> : <AllPosts posts={posts} />}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomeScreen;
