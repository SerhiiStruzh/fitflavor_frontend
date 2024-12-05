import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { deletePost, getAllPosts, getNewestPosts, getPopularPosts } from "../api/postApi";
import { useError } from "./ErrorContext";

const PostPage = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [posts, setPosts] = useState([]);
    const { showError } = useError();

    useEffect(() => {
        const fecthPosts = async () => {
            try{
                const fetchedPosts = await getAllPosts();
                setPosts(fetchedPosts);
            } catch(err) {
                showError(err.response?.data.message || "Failed to fetch posts.");
                navigate('/');
            }
        };

        fecthPosts();
    }, [])

    function handleChange(e) {
        setText(e.target.value);
    }

    const handleNewestPosts = async () => {
        try{
            const newestPosts = await getNewestPosts();
            setPosts(newestPosts);
        } catch(err) {
            showError(err.response?.data.message || "Failed to fetch posts.");
            navigate('/');
        }
    };

    const handlePopularPosts = async () => {
        try{
            const popularPosts = await getPopularPosts();
            setPosts(popularPosts);
        } catch(err) {
            showError(err.response?.data.message || "Failed to fetch posts.");
            navigate('/');
        }
    };

    const handleDeletePost = async (postId) => {
        try {
          await deletePost(postId);
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (err) {
          showError(err.response?.data.message || "Failed to delete post.");
        }
    };

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
                    value={text}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-200"
                />
            </form>
            </div>

            <div className="flex justify-between gap-4 mb-6">
            <button className="bg-white text-green-800 px-4 py-2 rounded-lg hover:bg-green-100 font-kanit" onClick={handlePopularPosts}>
                Popular
            </button>
            <button className="bg-white text-green-800 px-4 py-2 rounded-lg hover:bg-green-100 font-kanit" onClick={handleNewestPosts}>
                Newest
            </button>
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

export default PostPage;