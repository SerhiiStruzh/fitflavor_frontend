import { useLocation } from "react-router-dom";
import PostCard from "./PostCard";

const SearchPostPage = () => {
    const location = useLocation();
    const q = new URLSearchParams(location.search).get('q');

    const posts = [
        { id: 1, title: 'Post title...', username: 'username', likes: 100, comments: 100, isAuthor: true },
        { id: 2, title: 'Post title...', username: 'username', likes: 100, comments: 100, isAuthor: false },
        { id: 3, title: 'Post title...', username: 'username', likes: 100, comments: 100, isAuthor: false },
      ];

    return(
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-center text-2xl font-kanit mb-4">Posts</h1>

            <div className="mb-6">
            <input
                type="text"
                placeholder="Find..."
                className="w-full p-3 rounded-lg border border-gray-200"
            />
            </div>

            <div className="space-y-4">
            {posts.map((post) => (
                <PostCard
                key={post.id}
                title={post.title}
                username={post.username}
                likes={post.likes}
                comments={post.comments}
                isAuthor={post.isAuthor}
                />
            ))}
            </div>
        </div>
    );
};

export default SearchPostPage;