import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import LoginPage from "./components/Login";
import PostPage from "./components/PostsPage";
import ProfilePage from "./components/ProfilePage";
import ProfileEditPage from "./components/ProfileEditPage";
import PostEditor from "./components/PostEditPage";
import PostView from "./components/PostView";
import SearchPostPage from "./components/SearchPostPage";
import CommentPage from "./components/CommentsPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleAuthRedirect from "./components/GoogleAuthRedirect";

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/comments/:postId" element={<CommentPage />} />
            <Route path="/users/:userId" element={<ProfilePage />} />
            <Route path="/users/edit/:userId" element={<ProfileEditPage />} />
            <Route path="/posts/create" element={<PostEditor />} />
            <Route path="/posts/edit/:postId" element={<PostEditor />} />
            <Route path="/posts/:postId" element={<PostView />}/>
            <Route path="/posts" element={<PostPage />} />
            <Route path="/posts/search" element={<SearchPostPage />} />
            <Route path="/auth/google" element={<GoogleAuthRedirect />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
