import profileDefaultImg from '../assets/profile_img.svg';
import likeImg from '../assets/like.svg';
import commentImg from '../assets/comment.svg';
import deleteImg from '../assets/delete.svg';
import editImg from '../assets/edit.svg'; 

const PostCard = ({ title, username, likes, comments, isAuthor }) => {
    return (
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="w-3/4 cursor-pointer text-black text-lg font-kanit truncate overflow-hidden whitespace-nowrap">
              {title}
            </p>
            {isAuthor && (
              <div className="flex space-x-2">
                <button className="cursor-pointer">
                  <img
                    src={editImg}
                    alt='edit'
                    className='w-4 h-4'
                  />
                </button>
                <button className="cursor-pointer">
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
        </div>
      </div>
    );
  };
  
export default PostCard;
