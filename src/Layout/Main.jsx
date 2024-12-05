import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Pages/Homepage/Home";

const Main = () => {
    return (
        <div >
            <div className="max-w-[1440px] mx-auto">

                <Navbar></Navbar>
                <Home></Home>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;