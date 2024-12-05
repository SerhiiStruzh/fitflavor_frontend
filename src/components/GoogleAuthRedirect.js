import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      saveToken(token)
      navigate('/');
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default GoogleAuthRedirect;
