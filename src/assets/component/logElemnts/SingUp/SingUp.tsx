import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router";
import img from '../../../photo/logElements/loginPage/5839.jpg'
import axios from "axios";

import logo from '../../../photo/logo/Capture_d_écran_2025-07-06_003104-removebg-preview.png'
import { MdOutlineArrowBack } from "react-icons/md";

const SignUpPage =() => {
  const [formdata,setFormdata] = useState({
    email:"",
    username:"",
    first_name:"",
    last_name:"",
    password:"",
    password2:"",
  });
  const navigate =useNavigate()
  const {email,username,first_name,last_name,password,password2}=formdata;
  const [error,setError]=useState("")
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!email || !first_name || !last_name || !password || !password2) {
    setError("All fields are required");
  } else {
    try {
      const res = await axios.post("https://whopayingg.onrender.com/users/", formdata);

      if (res.status === 201) {
        alert("Sign up successfully! Please check your email for the verification code.");
        navigate(`/verify/${formdata.username}`);
      }
    } catch (err: any) {
      setError("Identifiants invalides !");
      console.log(err);
      console.log("🔴 Erreur:", err.response?.data);
    }
  }
};


  return (
    <div className="bg-white">
      <div className=" max-w-[1250px]  mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div data-aos="fade-up" className="bg-white my-[20px]  p-8 rounded-2xl  w-full  ">
          <div className="w-[110px] h-[110px] sm:my-[-50px] sm:mx-[-20px]">
            <img src={logo}/>
          </div>
          
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <p className="text-2xl text-red-500">{error ? error : ""}</p>

        <form onSubmit={handleSubmit}  className="space-y-5">
          <div className="relative">
            <MdEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>


        <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={handleOnChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>


          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="first_name"
              name="first_name"
              value={first_name}
              onChange={handleOnChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="last_name"
              placeholder="last_name"
              value={last_name}
              onChange={handleOnChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={handleOnChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
          <a href="/"><p className="text-green-600"><MdOutlineArrowBack className="translate-x-55 translate-y-5"/>Back</p></a>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <a href="/" className="text-green-600 hover:underline">Log in</a>
          </p>
        </form>
        </div>
        
        <div data-aos="fade-down" className="">
            <img className="rounded-2xl  w-full hidden md:flex sm:h-[600px] sm:my-4" src={img}/>
        </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage
