import { useNavigate, useParams } from 'react-router-dom';
import linktreeImg from '../assets/linktree.svg';
import profileDefaultImg from '../assets/profile.png';
import { useEffect, useState } from 'react';
import { useError } from './ErrorContext';
import { findUserById, updateUser } from '../api/userApi';
import Loading from './Loading';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [linktree, setLinktree] = useState('');
  const { showError } = useError();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await findUserById(userId);

        setUserData({
          username: data.name,
          profileImg: data.picture || profileDefaultImg,
          linktree: data.linktree,
        });
        setUsername(data.name);
        setLinktree(data.linktree);
      } catch (err) {
        showError(err.response?.data.message || "Failed to fetch user data.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
    
  const handleChange = (e, setFunc) => {
    setFunc(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      await updateUser(userId, username, linktree || null);
      navigate(`/users/${userId}`);
    } catch (err) {
      const errorMessage = Array.isArray(err.response?.data.message)
        ? err.response.data.message[0] 
        : err.response?.data.message || "Failed to edit profile.";
    
      showError(errorMessage);
    }
  }

  if (loading) {
    return <Loading></Loading>; 
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-center text-2xl font-kanit mb-8">Profile edit</h1>

      <div className="flex flex-col items-center">
        <label className="w-32 h-32 rounded-full bg-white shadow-md mb-8 overflow-hidden">
          <img
            src={userData.profileImg}
            alt="profile img"
            className="w-full h-full"
          />
        </label>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-kanit text-black">
              username
            </label>
            <input
              value={username}
              type="text"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white"
              onChange={(e) => {handleChange(e, setUsername)}}
            />
          </div>

          <div className="space-y-2">
            <img
              src={linktreeImg}
              alt="linktree"
              className="w-12 h-5"
            />
            <input
              value={linktree}
              type="text"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white"
              onChange={(e) => {handleChange(e, setLinktree)}}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
