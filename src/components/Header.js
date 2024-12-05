import { ReactComponent as HamburgerBtn } from '../assets/hamburger_button.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { logout } from '../api/authApi';
import { getUserProfile } from '../api/userApi';
import { useError } from './ErrorContext';
import { useAuth } from './AuthContext';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { token, clearToken } = useAuth();
    const { showError } = useError();

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    const handleLogout = async () => {
        try{
            await logout();
            clearToken();
            window.location.reload();
        } catch (err) {
            showError('Error during logout')
        }
    };

    const fetchUserProfile = async () => {
        try {
          const profileData = await getUserProfile();
        } catch (err) {
            showError('Failed to fetch user profile')
        }
      };

    return (
        <div>
            <header className="bg-0C4F1E p-4">
                <nav className="flex justify-between items-center px-6">
                    <Link to={'/'}>
                        <div className="text-white text-xl flex items-center font-junge">
                            <img src={logo} alt="FitFlavor Logo" className="w-10 h-10 mr-2" />
                            FitFlavor
                        </div>
                    </Link>
                    <ul className="md:flex hidden items-center space-x-4">
                        <li>
                            <Link to={'/posts'}>
                                <div className="text-white font-kanit hover:text-green-100 hover:cursor-pointer">Posts</div>
                            </Link>
                        </li>
                        {token ? (
                            <>
                                <li>
                                    <Link to={'/posts/create'}>
                                        <div className="text-white font-kanit hover:text-green-100 hover:cursor-pointer">Create post</div>
                                    </Link>
                                </li>
                                <li>
                                    <div className="text-white font-kanit hover:text-green-100 hover:cursor-pointer" onClick={fetchUserProfile}>Profile</div>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleLogout} 
                                        className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
                                        LogOut
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to={'/login'}>
                                    <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
                                        Login/Register
                                    </button>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        <HamburgerBtn className="h-6 w-6"/>
                    </button>
                </nav>
                {menuOpen && (
                    <div className="md:hidden bg-0C4F1E text-white">
                        <div className="flex flex-col items-end px-6 space-y-4"> 
                            <Link to={'/posts'}>
                                <div className="text-white font-kanit hover:text-green-100 hover:cursor-pointer">Posts</div>
                            </Link>
                            {token ? (
                                <>
                                    <Link to={'/posts/create'}>
                                        <div className="text-white font-kanit hover:text-green-100">Create post</div>
                                    </Link>
                                    <div className="text-white font-kanit hover:text-green-100" onClick={fetchUserProfile}>Profile</div>
                                    <button 
                                        onClick={handleLogout} 
                                        className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
                                        LogOut
                                    </button>
                                </>
                            ) : (
                                <Link to={'/login'}>
                                    <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
                                        Login/Register
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Header;
