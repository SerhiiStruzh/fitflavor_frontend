import profileDefaultImg from '../assets/profile_img.svg';
import likeImg from '../assets/like.svg';
import likedLikeImg from '../assets/like-liked.svg';
import commentImg from '../assets/comment.svg';
import deleteImg from '../assets/delete.svg';
import editImg from '../assets/edit.svg'; 
import { Link, useNavigate } from 'react-router-dom';
import { createLike, deleteLike } from '../api/likeApi';
import { useError } from './ErrorContext';
import { useState } from 'react';

const PostCard = ({ postId, title, username, authorUserId, likes, comments, isAuthor, isLiked: initialIsLiked, authorPicture, onDelete}) => {
    const navigate = useNavigate();
    const {showError} = useError();
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(likes);

    const handleDelete = (e) => {
      e.stopPropagation();
      if (window.confirm("Are you sure you want to delete this post?")) {
        onDelete(postId);
      }
    };

    const handleLike = async (e) => {
      e.stopPropagation();
      try {
          if (isLiked) {
              await deleteLike(postId);
              setLikeCount(likeCount - 1);
          } else {
              await createLike(postId);
              setLikeCount(likeCount + 1);
          }
          setIsLiked(!isLiked);
      } catch (err) {
          showError(err.response?.data.message || "Failed to update like.");
      }
    };

    const handleEditPost = (e) => {
      e.stopPropagation();
      navigate(`/posts/edit/${postId}`);
    }

    const handleOpenPost = () => {
      navigate(`/posts/${postId}`);
    }

    const handleOpenСomments = (e) => {
      e.stopPropagation();
      navigate(`/comments/${postId}`);
    }

    const handleAuthorRedirect = (e) => {
      e.stopPropagation();
      navigate(`/users/${authorUserId}`)
    }

    return (
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-4 border border-gray-100" onClick={handleOpenPost}>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="w-3/4 cursor-pointer text-black text-lg font-kanit truncate overflow-hidden whitespace-nowrap">
              {title}
            </p>
            {isAuthor && (
              <div className="flex space-x-2">
                <button className="cursor-pointer" onClick={handleEditPost}>
                  <img
                    src={editImg}
                    alt='edit'
                    className='w-4 h-4'
                  />
                </button>
                <button className="cursor-pointer" onClick={handleDelete}>
                  <img
                    src={deleteImg}
                    alt='delete'
                    className='w-4 h-4'
                  />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="cursor-pointer flex items-center space-x-2" onClick={handleAuthorRedirect}>
              <img
                src={authorPicture || profileDefaultImg}
                alt='profile'
                className='w-4 h-4 rounded-full'
              />
              <span className="text-black text-sm font-kanit">{username}</span>
            </div>
            <div className="cursor-pointer flex items-center space-x-1" onClick={handleLike}>
              <img
                  src={isLiked ? likedLikeImg : likeImg}
                  alt='like'
                  className='w-4 h-4'
              />
              <span className="text-black text-sm font-kanit">{likeCount}</span>
            </div>
  
            <div className="cursor-pointer flex items-center space-x-1" onClick={handleOpenСomments}>
              <img
                  src={commentImg}
                  alt='comments'
                  className='w-6 h-6'
              />
              <span className="text-black text-sm font-kanit">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default PostCard;
