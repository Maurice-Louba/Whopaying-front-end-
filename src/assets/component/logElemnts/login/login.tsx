
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";
import img from '../../../photo/logo/Capture_d_écran_2025-07-06_003104-removebg-preview.png'
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function LoginPage() {
  const [login, setlogin]=useState(
    {
        username:"",
        password:""
    }
  )
  const navigate= useNavigate()
  const [erro,seterro]=useState("")
  const {username,password}=login
  const handleOnchange= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setlogin({...login,[e.target.name]:e.target.value})
  }



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!username || !password) {
    seterro("All fields are required");
  } else {
    try {
      
      const res = await axios.post('https://whopayingg.onrender.com/jwt/create/', login);
      const { access } = res.data;

      
      localStorage.setItem("token", access);

      
      const userRes = await axios.get("https://whopayingg.onrender.com/users/me/", {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });
      console.log(userRes)

      const usernom = userRes.data.username;
      console.log(usernom)

      
      navigate(`/profil/${username}`);
    } catch (err) {
      seterro("Identifiants invalides !");
      console.log(err);
    }
  }
};





  return (
    <div className="min-h-screen mx-4  px-10  sm:-translate-x-20 my-10 flex  items-center justify-center bg-gradient-to-br ">
      

              <div className="absolute hidden sm:flex w-70 h-70 bg-green-300 opacity-20 rounded-full -translate-y-100 -translate-x-100 "></div>
              <div className="absolute hidden sm:flex w-70 h-40 bg-green-400 opacity-20 z-1  rounded-tl-full rounded-tr-full -translate-x-50 translate-y-86  "></div>
              <div className="absolute hidden sm:flex w-60 h-100 bg-green-200 opacity-30 rounded-tl-full rounded-bl-full  translate-x-179 "></div>
         

          
          <div data-aos="fade-up" className="bg-white hidden  sm:flex items-center justify-center sm:translate-x-90 sm:-translate-y-75  shadow-2xl sm:w-[250px] sm:h-[100px] sm:my-[-400px] rounded-bl-full rounded-tl-full rounded-tr-full rounded-br-full mx-[15px]">
            <div className="items-center flex justify-center">
              <img className="w-[100px] h-[100px]" src={img}/>
              <p></p>
            </div>
        </div>

      <div data-aos="fade-up" className="bg-white  p-8 rounded-2xl shadow-2xl w-full max-w-md">


        <div  data-aos= "fade-up" className="bg-white sm:hidden mx-2  flex  items-center justify-center sm:translate-x-90 -translate-y-40  shadow-2xl w-[200px] h-[100px] sm:my-[-400px] rounded-bl-full rounded-tl-full rounded-tr-full rounded-br-full mx-[15px]">
            <div className="items-center flex justify-center">
              <img className="w-[100px] h-[100px]" src={img}/>
              <p></p>
            </div>
        </div>

      
        <div className="">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <p className="text-center text-gray-800 mb-6">Acceder à votre espace <span className="text-green-600">Whopaying</span></p>
        <p className="text-2xl text-red-600">{erro ? erro:""}</p>

        <form  onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleOnchange}
              
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"              placeholder="Password"
              value={password}
              onChange={handleOnchange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account? <a href="/sign-up" className="text-green-600 hover:underline">Sign up</a>
          </p>
        </form>

        </div>

      </div>
        <div >
          <div className="   w-[150px]  sm:mx-[-25px] mx-[-80px] cursor-pointer" >
            <p className="sm:translate-y-70 sm:-translate-x-70 w:full sl:-translate-x-50 translate-y-90 hover:text-green-700 -translate-x-37  text-green-600"><MdOutlineKeyboardBackspace className="my-[-22px] mx-[-20px] " /> Back to home page<br/><p className="text-gray-500">@2025. All rights reserved.<br/><p></p></p></p>
             
            
          </div>
         
        </div>
      
      
    </div>
  );

};
