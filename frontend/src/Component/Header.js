// src/components/Header.js
import React, { useState, useEffect } from 'react';
import logo from '../assest/logo.png';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { logoutRedux } from '../redux/userSlice'; 
import toast from 'react-hot-toast';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    const cartItemNumber = useSelector((state) => state.product.cartItem); // Ensure product slice is defined if used
    const dispatch = useDispatch();

    const handleShowMenu = () => {
        setShowMenu(prev => !prev);
    }

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast.success('Logout Successful');
        setShowMenu(false); // Close menu after logout
    }

    const isAdmin = userData.email === 'kalindusudaraka24@gmail.com'; // Adjust if needed

    useEffect(() => {
        console.log('User Data in Header:', userData); // Debugging
    }, [userData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && !event.target.closest('.menu-container')) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
            <div className='flex items-center h-full justify-between'>
                <Link to={'/'}>
                    <div className='h-12'>
                        <img src={logo} className='h-full' alt="Logo" />
                    </div>
                </Link>

                <div className='flex items-center gap-4 md:gap-8'>
                    <nav className='flex gap-4 md:gap-6 text-base md:text-lg'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/about'}>About</Link>
                        <Link to={'/contact'}>Contact</Link>
                    </nav>

                    <div className="text-2xl text-slate-600 relative">
                        <Link to={'/cart'}>
                            <BsCartFill />
                            {cartItemNumber.length > 0 && (
                                <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full text-sm text-center">
                                    {cartItemNumber.length}
                                </div>
                            )}
                        </Link>
                    </div>

                    <div className='text-xl text-slate-600'>
                        <div
                            className='border-2 border-solid border-slate-600 p-1 rounded-full cursor-pointer menu-container'
                            onClick={handleShowMenu}
                        >
                            {userData.image ? (
                                <img src={userData.image} className='w-8 h-8 rounded-full' alt="User" />
                            ) : (
                                <FaUser />
                            )}
                        </div>
                    </div>

                    {showMenu && (
                        <div className='absolute right-2 top-16 bg-white py-2 px-2 shadow dropshadow-md flex flex-col menu-container'>
                           
                                <Link to={"/newproduct"} className='whitespace-nowrap cursor-pointer'>New Product</Link>
                           
                            {userData._id ? (
                                <p
                                    className='whitespace-nowrap cursor-pointer bg-red-500 text-white px-2 py-1'
                                    onClick={handleLogout}
                                >
                                    Logout ({userData.firstName})
                                </p>
                            ) : (
                                <Link to={"/login"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
