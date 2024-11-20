import React from 'react';
import ReactMarkdown from 'react-markdown';
import likeImg from '../assets/like.svg';
import commentImg from '../assets/comment.svg';
import profileDefaultImg from '../assets/profile_img.svg';

const PostView = ({ content, username, likes, comments, title }) => {
  return (
    <div>
      <div className="max-w-2xl mx-auto my-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6 space-x-4">
            <div className="cursor-pointer flex items-center space-x-2">
              <img
                src={profileDefaultImg}
                alt='profile'
                className='w-4 h-4'
              />
              <span className="text-black text-sm font-kanit">{username}</span>
            </div>

            <div className="cursor-pointer flex items-center space-x-1">
              <img
                src={likeImg}
                alt='like'
                className='w-4 h-4'
              />
              <span className="text-black text-sm font-kanit">{likes}</span>
            </div>

            <div className="cursor-pointer flex items-center space-x-1">
              <img
                src={commentImg}
                alt='comments'
                className='w-6 h-6'
              />
              <span className="text-black text-sm font-kanit">{comments}</span>
            </div>
          </div>

          <h1 className="text-2xl text-center font-bold mb-4">{title}</h1>

          <div className="prose max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
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