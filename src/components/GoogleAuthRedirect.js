import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('isLoged', true);
      navigate('/');
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default GoogleAuthRedirect;
