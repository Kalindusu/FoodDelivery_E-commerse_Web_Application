// src/components/Login.js
import React, { useState } from 'react';
import loginsignupimg from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        if (!email || !password) {
            return toast.error("Please fill in all required fields.");
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address.");
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const dataRes = await response.json();

            if (response.ok) {
                if (dataRes.alert) {
                    dispatch(loginRedux(dataRes.user)); // Dispatch user data to Redux store
                    toast.success(dataRes.message);
                    navigate('/');
                } else {
                    toast.error(dataRes.message);
                }
            } else {
                toast.error(dataRes.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                <div className='w-20 overflow-hidden rounded-full dropshadow-md shadow m-auto'>
                    <img src={loginsignupimg} className='w-full' alt="Login animation" />
                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter your email'
                        value={data.email}
                        onChange={handleOnChange}
                        required
                        className='border-2 border-gray-300 p-2 rounded mb-3'
                    />

                    <label htmlFor='password'>Password</label>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                            className='border-2 border-gray-300 p-2 rounded w-full'
                        />
                        <span
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <BiHide /> : <BiShow />}
                        </span>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-red-500 text-white p-2 rounded mt-3'
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <p className='mt-3 text-center'>
                    Don't have an account? <Link to='/signup' className='text-blue-500'>Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
