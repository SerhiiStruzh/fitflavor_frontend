import Header from "./Header";
import Footer from "./Footer";

function Layout({children}) {
    return(
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-2E6F40 to-white">
            <Header />
                <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;