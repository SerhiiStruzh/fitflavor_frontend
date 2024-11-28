import { ReactComponent as HamburgerBtn } from '../assets/hamburger_button.svg';
import { useState } from 'react';
import logo from '../assets/logo.png';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <div>
            <header className="bg-0C4F1E p-4">
                <nav className="flex justify-between items-center px-6">
                    <div className="text-white text-xl flex items-center font-junge">
                        <img src={logo} alt="FitFlavor Logo" className="w-10 h-10 mr-2" />
                        FitFlavor
                    </div>
                    <ul className="md:flex hidden items-center space-x-4">
                        <li>
                            <a href="#" className="text-white font-kanit hover:text-green-100">Posts</a>
                        </li>
                        <li>
                            <button className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100">
                                Login/Register
                            </button>
                        </li>
                    </ul>
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        <HamburgerBtn className="h-6 w-6"/>
                    </button>
                </nav>
                {menuOpen && (
                    <div className="md:hidden bg-0C4F1E text-white">
                        <div className="flex flex-col items-end px-6"> 
                            <a href="#" className="block py-2 hover:bg-green-700">Posts</a>
                            <button className="bg-white text-green-800 px-4 py-2 rounded-lg hover:bg-green-100 mt-2">
                                Login/Register
                            </button>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Header;