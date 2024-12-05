import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import likeImg from '../assets/like.svg';
import likedLikeImg from '../assets/like-liked.svg';
import commentImg from '../assets/comment.svg';
import profileDefaultImg from '../assets/profile_img.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useError } from './ErrorContext';
import { getPostById } from '../api/postApi';
import Loading from './Loading';
import { createLike, deleteLike } from '../api/likeApi';

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { showError } = useError();
  const [post, setPost] = useState(null); 
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId);
        setPost(data); 
        setLoading(false); 
      } catch (err) {
        showError(err.response?.data.message || "Failed to fetch post."); 
        setLoading(false);
        navigate(`/`)
      }
    };

    fetchPost(); 
  }, [postId]);  

  const handleAuthorRedirect = () => {
    navigate(`/users/${post.userId}`)
  }

  const handleLike = async (e) => {
    try {
        let likeCount;
        if (post.isLiked) {
            await deleteLike(+postId);
            likeCount = post.likesAmount - 1;
        } else {
            await createLike(+postId);
            likeCount = post.likesAmount + 1;
        }
        setPost((prev) => ({
          ...prev,
          isLiked: !prev.isLiked,
          likesAmount: likeCount
        }))
    } catch (err) {
        showError(err.response?.data.message || "Failed to update like.");
    }
  };

  if(loading){
    return(
      <Loading></Loading>
    )
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto my-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6 space-x-4">
            <div className="cursor-pointer flex items-center space-x-2" onClick={handleAuthorRedirect}>
              <img
                src={post.authorPicture || profileDefaultImg}
                alt='profile'
                className='w-4 h-4 rounded-full'
              />
              <span className="text-black text-sm font-kanit">{post.username}</span>
            </div>

            <div className="cursor-pointer flex items-center space-x-1" onClick={handleLike}>
              <img
                src={post.isLiked ? likedLikeImg : likeImg}
                alt='like'
                className='w-4 h-4'
              />
              <span className="text-black text-sm font-kanit">{post.likesAmount}</span>
            </div>

            <Link to={`/comments/${postId}`}>
              <div className="cursor-pointer flex items-center space-x-1">
                <img
                  src={commentImg}
                  alt='comments'
                  className='w-6 h-6'
                />
                <span className="text-black text-sm font-kanit">{post.commentsAmount}</span>
              </div>
              </Link>
          </div>

          <h1 className="text-2xl text-center font-bold mb-4">{post.title}</h1>

          <div className="prose max-w-none">
            <ReactMarkdown urlTransform={(uri) => {return uri}}>{post.body}</ReactMarkdown>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .prose {
          font-size: 1.1rem;
          line-height: 1.7;
        }
        .prose p {
          margin-bottom: 1em;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1em 0;
        }
        .prose h1 {
          font-size: 2em;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .prose h2 {
          font-size: 1.5em;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .prose h3 {
          font-size: 1.25em;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .prose ul, .prose ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .prose li {
          margin-bottom: 0.5em;
        }
        .prose blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1em;
          margin: 1em 0;
          color: #4a5568;
        }
        .prose code {
          background-color: #f7fafc;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
        }
        .prose pre {
          background-color: #2d3748;
          color: #fff;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default PostView;