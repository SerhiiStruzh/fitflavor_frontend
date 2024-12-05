import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import linktreeImg from "../assets/linktree.svg";
import profileDefaultImg from "../assets/profile.png";
import { findUserById } from "../api/userApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { useError } from "./ErrorContext";
import editImg from "../assets/edit.svg";
import { deletePost, getUserPosts } from "../api/postApi";
import { getUserLikedPosts } from "../api/likeApi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await findUserById(userId);

        setUserData({
          username: data.name,
          profileImg: data.picture || profileDefaultImg,
          linktree: data.linktree || null,
          isAuthor: data.isAuthor || false,
        });
        setPosts([]);
      } catch (err) {
        showError(err.response?.data.message || "Failed to fetch user data.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      const userPosts = await getUserPosts(userId); 
      setPosts(userPosts);
    } catch (err) {
      showError(err.response?.data.message || "Failed to fetch posts.");
    } 
  };

  const fetchUserLikedPosts = async () => {
    try {
      const userPosts = await getUserLikedPosts(userId); 
      setPosts(userPosts);
    } catch (err) {
      showError(err.response?.data.message || "Failed to fetch posts.");
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

  if (loading) {
    return <Loading></Loading>; 
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-center text-2xl font-kanit mb-8">Profile</h1>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-white shadow-md mb-4 overflow-hidden">
            <img
              src={userData.profileImg}
              alt="profile img"
              className="w-full h-full"
            />
          </div>
          {userData.isAuthor && (
            <Link className="absolute top-20 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                  to={`/users/edit/${userId}`}
            >
              <img src={editImg} alt="edit" className="w-5 h-5" />
            </Link>
            )}
        </div>


        <h2 className="text-xl font-kanit mb-4">{userData.username}</h2>

        {userData.linktree && (
          <button
            className="bg-white px-6 py-2 rounded-full shadow-sm mb-6"
            onClick={() => window.open(userData.linktree, "_blank")}
          >
            <img src={linktreeImg} alt="linktree" className="w-12 h-5" />
          </button>
        )}

        <div className="flex gap-4 mb-8">
          <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100" onClick={fetchUserPosts}>
            Posts
          </button>
          <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100" onClick={fetchUserLikedPosts}>
            Likes
          </button>
        </div>
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

export default ProfilePage;
