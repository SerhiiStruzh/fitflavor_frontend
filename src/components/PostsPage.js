import { useState } from "react";
import PostCard from "./PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const PostPage = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/posts/search?q=${text}`);
    }

    const posts = [
        { id: 1, title: 'Post title...', username: 'username', likes: 100, comments: 100, isAuthor: true },
        { id: 2, title: 'Post title...', username: 'username', likes: 100, comments: 100, isAuthor: false },
        { id: 3, title: 'Post title...', username: 'username', likes: 100, comments: 100, isAuthor: false },
      ];

    return(
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-center text-2xl font-kanit mb-4">Posts</h1>

            <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Find..."
                    value={text}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-200"
                />
            </form>
            </div>

            <div className="flex justify-between gap-4 mb-6">
            <button className="bg-white text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
                Popular
            </button>
            <button className="bg-white text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
                Newest
            </button>
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

export default PostPage;