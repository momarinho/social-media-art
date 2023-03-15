import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddPost from './components/AddPost';
import Profile from './components/Profile';
import PostPage from './components/PostPage';
// import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route exact path="/edit-profile/:id" component={UpdateProfile} /> */}
          <Route exact path="/posts/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
