import mainImage from '../assets/home_page_main_image.png'
import postImage from '../assets/post.png'
import recipesImage from '../assets/recepies.png'
import comunityImage from '../assets/comunity.png'
import { useError } from './ErrorContext';

function HomePage() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-3xl">
            <section className="text-center mb-12">
                <h1 className="text-4xl mb-4 font-kanit">Welcome to FitFlavor!</h1>
                <p className="text-xl mb-8 font-kanit">The place where sports meet culinary arts.</p>

                <img
                    src={mainImage}
                    alt="Fitness and Food"
                    className="mx-auto w-96 h-44 object-cover rounded-3xl mt-8 mb-4" 
                    style={{ borderRadius: '10rem' }}
                />

                <h2 className="text-2xl font-kanit mb-8">What you can do here</h2>

                <div className="space-y-8">

                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-lg transition">
                        <img
                            src={postImage}
                            alt="Post"
                            className="w-24 h-24 bg-green-100 rounded-2xl flex-shrink-0" 
                        />
                        <p className="text-center sm:text-left font-kanit text-lg">Share your sports and culinary achievements</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-lg transition">
                        <img
                            src={recipesImage}
                            alt="Recepies"
                            className="w-24 h-24 bg-green-100 rounded-2xl flex-shrink-0" 
                        />
                        <p className="text-center sm:text-left font-kanit text-lg">Discover new dishes and share your favorite recipes</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-lg transition">
                        <img
                            src={comunityImage}
                            alt="Comunity"
                            className="w-24 h-24 bg-green-100 rounded-2xl flex-shrink-0" 
                        />
                        <p className="text-center sm:text-left font-kanit text-lg">Interact with other users, find friends, and get motivated</p>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default HomePage;