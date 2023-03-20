import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import HomeScreen from './screens/HomeScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import AddPost from './components/AddPost';
import Profile from './components/Profile';
import PostScreen from './screens/PostScreen';
import ChatBox from './screens/Chatbox';
import SearchPage from './screens/SearchPage';
import About from './screens/About';
import Contact from './screens/Contact';
// import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route exact path="/update-profile/:id" component={UpdateProfile} /> */}
          <Route exact path="/posts/:id" element={<PostScreen />} />
          <Route exact path="/chat" element={<ChatBox />} />
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
