import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/Authprovider";
import toast from "react-hot-toast";





const Navbar = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSocialLogIn = (socialProvider) => {
        socialProvider().then((result) => {
            toast.success("Log in succesfull !");
            if (result.user) {
                navigate(location?.state ? location.state : '/')
            }
        })
    }
    const [showPassword, setShowPassword] = useState([])
    const modalRef = useRef(null);
    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    const navlinks = <>
        <li><Link>Home</Link></li>
    </>
    return (
        <div >
            <div className="navbar bg-base-100 ">
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
                    <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Login</button>
                </div>

                <div>
                    {/* login modal */}

                    {/* You can open the modal using document.getElementById('ID').showModal() method */}

                    <dialog id="my_modal_3" className="modal" ref={modalRef}>
                        <div className="modal-box">
                            {/* login form */}
                            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Email Address</label>
                                    <input type="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...register("email", { required: true })} />
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Password</label>
                                        <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                                    </div>
                                    <div className='flex items-center'>

                                        <input name='password' className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type={showPassword ? 'password' : 'text'} {...register("password", { required: true })} />
                                        {
                                            showPassword ?
                                                <IoEyeOffSharp onClick={() => { setShowPassword(!showPassword) }} className="-ml-7"></IoEyeOffSharp> :
                                                <FaEye onClick={() => { setShowPassword(!showPassword) }} className="-ml-7"></FaEye>
                                        }
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value="Login" />
                                </div>
                                <div className="divider">OR</div>
                                {/* google login */}
                                <button onClick={() => handleSocialLogIn(googleLogin)} className="w-full">
                                    <div className="flex items-center gap-5 justify-center border border-dashed border-gray-500 rounded-xl py-2">
                                        <FcGoogle className="h-8 w-8"></FcGoogle>
                                        <h2 className="font-semibold">Continue with Google</h2>
                                    </div>
                                </button>
                                <div className="mt-5">
                                    <p>Need to Sing Up? <span className="text-blue-800"><Link>Register Now</Link></span></p>
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