import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddPost from './components/AddPost';
import UpdateProfile from './components/UpdateProfile';
import Profile from './components/Profile';
import PostPage from './components/PostPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route exact path="/posts/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
