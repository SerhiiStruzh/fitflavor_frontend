import profileDefaultImg from '../assets/profile_img.svg';
import likeImg from '../assets/like.svg';
import deleteImg from '../assets/delete.svg';
import { Link } from 'react-router-dom';

export const Comment = ({ id, username, authorUserId, commentText, isAuthor, authorPicture, onDelete}) => {

  const handleDelete = () => {
    onDelete(id);
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <p className="w-3/4 font-kanit">{commentText}</p>
        {isAuthor && (
            <div className="flex space-x-2">
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
      <div className="flex justify-between items-center mt-4">
      <Link to={`/users/${authorUserId}`}>
        <div className="flex items-center cursor-pointer">
          <img
              src={authorPicture || profileDefaultImg}
              alt='profile'
              className='w-4 h-4 rounded-full'
            />
          <span className="ml-2 font-kanit">{username}</span>
        </div>
      </Link>
      </div>
    </div>
  );
};
