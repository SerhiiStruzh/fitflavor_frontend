import Header from "./Header";
import Footer from "./Footer";
import { ErrorProvider } from "./ErrorContext";
import { AuthProvider } from "./AuthContext";

function Layout({ children }) {
  return (
    <ErrorProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-2E6F40 to-white">
            <Header />
                <main className="flex-grow">{children}</main>
            <Footer />
        </div>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default Layout;
