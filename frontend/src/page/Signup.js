import React from 'react';
import loginsignupimg from "../assest/login-animation.gif"; 
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from '../utility/imagetoBase64';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });
  console.log(data);

  const handleshowpassword = () => {
    setshowpassword(prev => !prev);
  };

  const handleshowconfirmpassword = () => {
    setshowconfirmpassword(prev => !prev);
  };

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleuplpadprofileimage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);

    setData(prev => ({
      ...prev,
      image: data
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const fetchData = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          const dataRes = await fetchData.json();
          toast.success(dataRes.message); // Show success message
  
          if (dataRes.alert) {
            // Use setTimeout to delay the navigation
            setTimeout(() => {
              navigate("/login");
            }, 2000); // 2000 milliseconds = 2 seconds
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('An error occurred. Please try again.');
        }
      } else {
        toast.error("Password and confirm password do not match.");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };
  

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        <div className='w-20 h-20 overflow-hidden rounded-full shadow-md m-auto relative'>
          <img src={data.image ? data.image : loginsignupimg} className='w-full h-full' alt="Profile" />

          <label htmlFor='profileImage'>
            <div className='absolute bottom-0 h-1/2 w-full bg-slate-500 bg-opacity-50 text-center cursor-pointer'>
              <p className='text-sm p-1 text-white'>Upload</p>
            </div>
            <input type="file" id="profileImage" className='hidden' accept='image/*' onChange={handleuplpadprofileimage} />
          </label>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handlesubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input type="text" id="firstName" name='firstName' className='w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-2 focus-within:outline-blue-500' value={data.firstName} onChange={handleonChange} />

          <label htmlFor='lastName'>Last Name</label>
          <input type="text" id="lastName" name='lastName' className='w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-2 focus-within:outline-blue-500' value={data.lastName} onChange={handleonChange} />

          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' className='w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-2 focus-within:outline-blue-500' value={data.email} onChange={handleonChange} />

          <label htmlFor='Password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500'>
            <input
              type={showpassword ? "text" : "password"}
              id="Password"
              name='password'
              className='w-full bg-slate-200 border-none outline-none'
              value={data.password}
              onChange={handleonChange}
            />
            <span onClick={handleshowpassword} className='flex text-xl'>
              {showpassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500'>
            <input
              type={showconfirmpassword ? "text" : "password"}
              id="confirmPassword"
              name='confirmPassword'
              className='w-full bg-slate-200 border-none outline-none'
              value={data.confirmPassword}
              onChange={handleonChange}
            />
            <span onClick={handleshowconfirmpassword} className='flex text-xl'>
              {showconfirmpassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button type='submit' className='max-w-[120px] w-full bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full cursor-pointer m-auto mt-4 font-medium'>Sign Up</button>
        </form>

        <p className='text-left mt-3'>Already have an account? <Link to={'/login'} className='text-red-500 underline'>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
