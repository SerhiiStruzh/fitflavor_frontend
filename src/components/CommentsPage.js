import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from './Comment';

const CommentPage = () => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(commentText);
    setCommentText('');
  };

  const comments = [
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium.',
      username: 'username',
      likes: 100,
      isAuthor: true
    },
    {
      id: 2,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium.',
      username: 'username',
      likes: 100,
      isAuthor: false
    }
  ];

  return (
      <main className="max-w-2xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h2 className="text-xl font-kanit mb-4">Write your comment</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-4 border-none resize-none focus:ring-0 focus:outline-none"
                rows="4"
                placeholder="Write here..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end p-4 bg-white">
                <button
                  type="submit"
                  className="bg-white font-kanit text-green-800 px-4 py-2 shadow-xl rounded-lg hover:bg-green-100"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-kanit mb-4 text-center">Comments</h2>
          <div className="space-y-4">
            {comments.map((comment) => (
              <Comment
                content={comment.content}
                username={comment.username}
                likes={comment.likes}
                isAuthor={comment.isAuthor}
              />
            ))}
          </div>
        </div>
      </main>
  );
};

export default CommentPage;