import profileDefaultImg from '../assets/profile_img.svg';
import likeImg from '../assets/like.svg';
import deleteImg from '../assets/delete.svg';

export const Comment = ({ username, content, likes, isAuthor}) => {
    return (
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <p className="w-3/4 font-kanit">{content}</p>
          {isAuthor && (
              <div className="flex space-x-2">
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
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center cursor-pointer">
            <img
                src={profileDefaultImg}
                alt='profile'
                className='w-4 h-4'
              />
            <span className="ml-2 font-kanit">{username}</span>
          </div>
          <div className="flex items-center">
              <img
                  src={likeImg}
                  alt='like'
                  className='w-4 h-4 cursor-pointer'
              />
            <span className="ml-1 font-kanit">{likes}</span>
          </div>
        </div>
      </div>
    );
  };
