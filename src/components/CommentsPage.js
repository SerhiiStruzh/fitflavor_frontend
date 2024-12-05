import React, { useEffect, useState } from 'react';
import { Comment } from './Comment';
import { useParams } from 'react-router-dom';
import { createComment, deleteComment, getCommentsByPost } from '../api/commentApi';
import { useError } from './ErrorContext';

const CommentPage = () => {
  const { postId } = useParams();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const { showError } = useError();

  useEffect(() => {

    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsByPost(postId);
        setComments(fetchedComments);
      } catch (err) {
        showError(err.response?.data.message || "Failed to fetch comments.");
        const errorMessage = Array.isArray(err.response?.data.message)
        ? err.response.data.message[0] 
        : err.response?.data.message || "Failed to fetch comments.";
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentText((val) => val.trim())

    try {
      const newComment = await createComment(+postId, commentText);
      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentText('');
    } catch (err) {

      const errorMessage = Array.isArray(err.response?.data.message)
        ? err.response.data.message[0] 
        : err.response?.data.message || "Failed to create comment.";

      showError(errorMessage);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      const errorMessage = Array.isArray(err.response?.data.message)
        ? err.response.data.message[0] 
        : err.response?.data.message || "Failed to delete comment.";
      showError(errorMessage);
    }
  };

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
                key={comment.id}
                id={comment.id}
                commentText={comment.commentText}
                username={comment.userName}
                isAuthor={comment.isAuthor}
                authorUserId={comment.userId}
                authorPicture={comment.authorPicture}
                onDelete={handleDeleteComment}
            />
            ))}
          </div>
        </div>
      </main>
  );
};

export default CommentPage;