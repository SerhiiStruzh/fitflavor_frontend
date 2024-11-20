import PostCard from "./PostCard";
import linktreeImg from '../assets/linktree.svg';
import profileDefaultImg from '../assets/profile.png';

const ProfilePage = () => {
  const userPosts = [
    { id: 1, title: 'Post title...', username: 'username', likes: 100, comments: 100, isAuthor:true },
    { id: 2, title: 'Post title...', username: 'username', likes: 100, comments: 100 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-center text-2xl font-kanit mb-8">Profile</h1>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-white shadow-md mb-4 overflow-hidden">
            <img
                src={profileDefaultImg}
                alt='profile img'
                className="w-full h-full"
            />
          </div>

          <h2 className="text-xl font-kanit mb-4">username</h2>

          <button className="bg-white px-6 py-2 rounded-full shadow-sm mb-6">
            <img   
                src={linktreeImg}
                alt='linktree'
                className="w-12 h-5"
            />
          </button>

          <div className="flex gap-4 mb-8">
            <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
              Posts
            </button>
            <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
              Likes
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {userPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              username={post.username}
              likes={post.likes}
              comments={post.comments}
              isAuthor={post.isAuthor || false}
            />
          ))}
        </div>
      </div>
  );
};

export default ProfilePage;