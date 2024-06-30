import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="w-full bg-default flex-1 pt-20 ">
        <div className="min-h-screen mt-10 mb-10"> {children}</div>
      
      </div>
      <Footer/>
    </div>
  
    );
}

