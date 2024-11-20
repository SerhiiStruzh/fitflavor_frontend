import logo from '../assets/logo.png';

function Footer() {
    return (
        <footer className="bg-0C4F1E p-4">
            <div className="flex items-center pl-6">
                <img src={logo} alt="FitFlavor Logo" className="w-10 h-10 mr-2" />
                <span className="text-white text-xl font-junge">FitFlavor</span>
            </div>
        </footer>
    );
}

export default Footer;