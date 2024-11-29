import googleIcon from '../assets/google_icon.svg';

const GOOGLE_AUTH_URL = 'http://localhost:3000/api/auth/google';

const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    };

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center w-max">
                <h1 className="mb-4 text-xl font-kanit">Login/Register using Google</h1>
                <button onClick={handleLogin} className="flex items-center justify-center w-full px-4 py-2 bg-white text-black rounded-lg border font-kanit border-gray-300 hover:bg-green-100">
                    <img src={googleIcon} alt="Google" className="h-5 w-5 mr-2" />
                    Login using Google
                </button>
            </div>
        </div>

    );
};

export default LoginPage;