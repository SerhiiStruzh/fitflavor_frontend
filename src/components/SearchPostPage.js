import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { useError } from "./ErrorContext";
import { deletePost, searchPosts } from "../api/postApi";

const SearchPostPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState("");
    const [posts, setPosts] = useState([]);
    const { showError } = useError();
    const q = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchPostByQuery = async () => {
            try{
                const fetchedPosts = await searchPosts(q);
                setPosts(fetchedPosts);
            } catch(err) {
                showError(err.response?.data.message || "Failed to fetch posts.");
                navigate('/');
            }
        };

        fetchPostByQuery();
    }, [q]);

    const handleDeletePost = async (postId) => {
        try {
          await deletePost(postId);
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (err) {
          showError(err.response?.data.message || "Failed to delete post.");
        }
    };

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/posts/search?q=${text}`);
    }

    return(
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-center text-2xl font-kanit mb-4">Posts</h1>

            <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Find..."
                    className="w-full p-3 rounded-lg border border-gray-200"
                    onChange={handleChange}
                />
            </form>
            </div>

            <div className="space-y-4">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    postId={post.id}
                    title={post.title}
                    username={post.username}
                    authorUserId={post.userId}
                    likes={post.likesAmount}
                    comments={post.commentsAmount}
                    isAuthor={post.isAuthor}
                    isLiked={post.isLiked}
                    authorPicture={post.authorPicture}
                    onDelete={handleDeletePost}
                />
            ))}
            </div>
        </div>
    );
};

export default SearchPostPage;