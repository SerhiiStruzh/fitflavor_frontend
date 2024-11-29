// import { ReactComponent as HamburgerBtn } from '../assets/hamburger_button.svg';
// import { useState } from 'react';
// import logo from '../assets/logo.png';
// import { Link } from 'react-router-dom';

// function Header() {
//     const [menuOpen, setMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(prev => !prev);
//     };

//     return (
//         <div>
//             <header className="bg-0C4F1E p-4">
//                 <nav className="flex justify-between items-center px-6">
//                     <div className="text-white text-xl flex items-center font-junge">
//                         <img src={logo} alt="FitFlavor Logo" className="w-10 h-10 mr-2" />
//                         FitFlavor
//                     </div>
//                     <ul className="md:flex hidden items-center space-x-4">
//                         <li>
//                             <a href="#" className="text-white font-kanit hover:text-green-100">Posts</a>
//                         </li>
//                         <li>
//                             <Link to={'/login'}>
//                                 <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
//                                     Login/Register
//                                 </button>
//                             </Link>
//                         </li>
//                     </ul>
//                     <button className="md:hidden text-white" onClick={toggleMenu}>
//                         <HamburgerBtn className="h-6 w-6"/>
//                     </button>
//                 </nav>
//                 {menuOpen && (
//                     <div className="md:hidden bg-0C4F1E text-white">
//                         <div className="flex flex-col items-end px-6"> 
//                             <a href="#" className="block py-2 hover:bg-green-700">Posts</a>
//                             <Link to={'/login'}>
//                                 <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
//                                     Login/Register
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//             </header>
//         </div>
//     );
// }

// export default Header;




import { ReactComponent as HamburgerBtn } from '../assets/hamburger_button.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { logout } from '../api/authApi';
import { getUserProfile } from '../api/userApi';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const loggedStatus = localStorage.getItem('isLoged') === 'true';
        setIsLogged(loggedStatus);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        localStorage.setItem('isLoged', 'false');
        localStorage.removeItem("accessToken")
        setIsLogged(false);
    };

    const fetchUserProfile = async () => {
        try {
          const profileData = await getUserProfile();
          console.log("User profile:", profileData);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
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
                            <div className="text-white font-kanit hover:text-green-100 hover:cursor-pointer">Posts</div>
                        </li>
                        {isLogged ? (
                            <>
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
                        <div className="flex flex-col items-end px-6"> 
                            <a href="#" className="block py-2 hover:bg-green-700">Posts</a>
                            {isLogged ? (
                                <>
                                    <a className="block py-2 hover:bg-green-700" onClick={fetchUserProfile}>Profile</a>
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
