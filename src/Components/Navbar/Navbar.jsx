import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/Authprovider";
import toast from "react-hot-toast";

const Navbar = () => {
    const { register, handleSubmit } = useForm();
    const { user, googleLogin, logIn, createUser, logOut } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const modalRef = useRef(null);
    const registerModalRef = useRef(null);

    // login with social media
    const handleSocialLogIn = (socialProvider) => {
        socialProvider().then((result) => {
            handleCloseModal();
            toast.success("Log in successful!");
            if (result.user) {
                navigate(location?.state ? location.state : '/');
            }
        });
    };

    // closing login modal
    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    // closing registration modal
    const handleCloseRegisterModal = () => {
        if (registerModalRef.current) {
            registerModalRef.current.close();
        }
    };

    // login with email and password
    const onSubmitLogin = data => {
        console.log(data);
        logIn(data.email, data.password)
            .then(result => {
                handleCloseModal();
                toast.success("Log in successful!");
            })
            .catch(error => {
                toast.error("Login failed! Please check your email and password.");
            });
    };

    // register with email and password
    const onSubmitRegister = data => {
        createUser(data.email, data.password)
            .then(result => {
                handleCloseRegisterModal()
                toast.success("Registration successful!");
                console.log(data.email, data.password);
            })
            .catch(error => {
                toast.error("Registration failed! Please try again.");
            });
    };

// logout 
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Log Out successful!");
            })
            .catch();
    }

console.log(user);

    const navlinks = <>
        <li><Link>Home</Link></li>
    </>;

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navlinks}
                        </ul>
                    </div>

                    <a className="btn btn-ghost text-xl"><img className="h-10 lg:h-16" src="https://i.ibb.co/MDnpjgg/Needs-Cart.png"></img></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <button className="btn" onClick={handleLogOut}  >LogOut</button> :
                            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Login</button>
                    }
                </div>

                <div>
                    {/* login modal */}
                    <dialog id="my_modal_3" className="modal" ref={modalRef}>
                        <div className="modal-box">
                            <form onSubmit={handleSubmit(onSubmitLogin)} method="dialog">
                                <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input type="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...register("email", { required: true })} />
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                                        <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                                    </div>
                                    <div className="flex items-center">
                                        <input name="password" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type={showPassword ? 'password' : 'text'} {...register("password", { required: true })} />
                                        {showPassword ? (
                                            <IoEyeOffSharp onClick={() => { setShowPassword(!showPassword); }} className="-ml-7 cursor-pointer" />
                                        ) : (
                                            <FaEye onClick={() => { setShowPassword(!showPassword); }} className="-ml-7 cursor-pointer" />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value="Login" />
                                </div>
                                <div className="divider">OR</div>

                                {/* google login */}
                                <button onClick={() => handleSocialLogIn(googleLogin)} className="w-full">
                                    <div className="flex items-center gap-5 justify-center border border-dashed border-gray-500 rounded-xl py-2">
                                        <FcGoogle className="h-8 w-8" />
                                        <h2 className="font-semibold">Continue with Google</h2>
                                    </div>
                                </button>
                                <div className="mt-5">
                                    <p>Need to Sign Up? <span className="text-blue-800 cursor-pointer" onClick={() => { handleCloseModal(); document.getElementById('register_modal').showModal(); }}>Register Now</span></p>
                                </div>
                            </form>
                        </div>
                    </dialog>

                    {/* registration modal */}
                    <dialog id="register_modal" className="modal" ref={registerModalRef}>
                        <div className="modal-box">
                            <div className=" mx-auto">
                                <h1 className="text-3xl font-bold">Be a Memeber of NeedsCart</h1>
                                <hr />
                            </div>
                            <form onSubmit={handleSubmit(onSubmitRegister)} method="dialog">
                                <button onClick={handleCloseRegisterModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input type="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...register("email", { required: true })} />
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                                    <div className="flex items-center">
                                        <input name="password" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type={showPassword ? 'password' : 'text'} {...register("password", { required: true })} />
                                        {showPassword ? (
                                            <IoEyeOffSharp onClick={() => { setShowPassword(!showPassword); }} className="-ml-7 cursor-pointer" />
                                        ) : (
                                            <FaEye onClick={() => { setShowPassword(!showPassword); }} className="-ml-7 cursor-pointer" />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value="Register" />
                                </div>

                                <div className="mt-5">
                                    <p>Already have an account? <span className="text-blue-800 cursor-pointer" onClick={() => { handleCloseRegisterModal(); document.getElementById('my_modal_3').showModal(); }}>Login Now</span></p>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
