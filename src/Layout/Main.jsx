import { Outlet } from "react-router-dom";
import PopuleIntructor from "../pages/PopuleIntructor/PopuleIntructor";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <PopuleIntructor></PopuleIntructor>
            <Footer></Footer>
        </div>
    );
};

export default Main;