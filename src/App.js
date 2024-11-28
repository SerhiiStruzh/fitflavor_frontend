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

function App() {
  return (
    <div className="min-h-screen">
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/comments/:postId" element={<CommentPage/>} />
            <Route path="/users/:userId" element={<ProfilePage />}/>
            <Route path="/users/:userId/edit" element={<ProfileEditPage />}/>
            <Route path="/posts/create" element={<PostEditor />}/>
            <Route path="/posts/:postId" element={<PostView 
                  username="JohnDoe"
                  likes={42}
                  comments={15}
                  title="Смачний рецепт"
                  content={`**Інгредієнти:**
                  ![Паста карбонара](D:\\web\\flitflavor-backend\\sources\\2e10b9fcffffb39d4bf93f35be340d0105.png)`}
            />}/>
            <Route path="/posts" element={<PostPage />}/>
            <Route path="/posts/search" element={<SearchPostPage />}/>
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
