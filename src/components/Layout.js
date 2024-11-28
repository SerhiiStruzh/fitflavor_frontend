// import Header from "./Header";
// import Footer from "./Footer";
// import ErrorAlert from "./ErrorAlert";

// function Layout({children}) {
//     return(
//         <div className="flex flex-col min-h-screen bg-gradient-to-b from-2E6F40 to-white">
//             <Header />
//                 <ErrorAlert message={'Сталася Сталася Сталася Сталася Сталася помилка'}></ErrorAlert>
//                 <main className="flex-grow">{children}</main>
//             <Footer />
//         </div>
//     );
// }

// export default Layout;


import Header from "./Header";
import Footer from "./Footer";
import { ErrorProvider } from "./ErrorContext";

function Layout({ children }) {
  return (
    <ErrorProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-2E6F40 to-white">
            <Header />
                <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    </ErrorProvider>
  );
}

export default Layout;
