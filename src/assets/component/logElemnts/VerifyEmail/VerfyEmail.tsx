import reçu from '../../../photo/verify/3084948.jpg';
import { MdEmail, MdOutlineKeyboardBackspace } from "react-icons/md";
import logo from '../../../photo/logo/Capture_d_écran_2025-07-06_003104-removebg-preview.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const VerifyEmail = () => {
  const [data, setData] = useState({ otp_code: "" });
  const { otp_code } = data;
  const navigate = useNavigate();
  const { username } = useParams();
  const [mes, setMes] = useState('');

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }

  const getCSRFToken = async () => {
    try {
      await axios.get("https://whopayingg.onrender.com/csrf/", { withCredentials: true });
      console.log("✅ CSRF cookie fetched");
    } catch (error) {
      console.error("❌ CSRF error: ", error);
    }
  };

  useEffect(() => {
    getCSRFToken();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp_code) {
      setMes("Verification code is required");
      return;
    }

    try {
      const csrfToken = getCookie("csrftoken") || "";

      const res = await axios.post(
        "https://whopayingg.onrender.com/verify-otp/",
        { otp_code, username },  // <-- username ajouté ici
        {
          withCredentials: true,
          headers: { "X-CSRFToken": csrfToken },
        }
      );

      if (res.status === 200) {
        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token);
          setMes("Email verified successfully! Redirecting...");
          setTimeout(() => navigate(`/profil/${username}`), 1500);
        } else {
          setMes("Token non reçu après vérification");
        }
      }
    } catch (error: any) {
      if (error.response) {
        setMes(error.response.data.error || "Verification failed");
      } else {
        setMes("Network error");
      }
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className='w-full rounded-tl-2xl rounded-tr-2xl h-[350px] bg-green-50'>
          <div className= 'items-center flex justify-center mx-[98px] md:mx-[500px]'>
            <img src={logo} className='w-[150px] h-[150px]' alt="Logo" />
          </div>
          <div className='items-center justify-center flex'>
            <div className='bg-white rounded-2xl w-9/10 h-[500px]'>
              <div className='justify-center flex items-center'>
                <img src={reçu} className='w-[150px] h-[150px]' alt="Verify" />
              </div>
              <div className='sm:flex sm:justify-center sm:items-center'>
              <h1 className='md:text-4xl text-3xl font-medium'>Confirm your Email</h1>
              </div>
              <p className='text-2xl text-red-400'>{mes}</p>
              <form className='justify-center  items-center' onSubmit={handleSubmit}>
                <div className=" flex justify-center items-center relative my-7">
                  <MdEmail className=" sm:mx-35 flex justify-center items-center absolute top-1/2 md:left-57 left-15 mx-5 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter the verification co.."
                    name="otp_code"
                    value={otp_code}
                    onChange={handleOnChange}
                    className="pl-10 md:w-[650px]  py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
                <div className='flex items-center justify-center mx-15'>
                <p className=' text-gray-400 p-1'>Enter the code received by email to confirm your identity</p>
                </div>
                <div className='flex items-center justify-center'>
                <button
                  type="submit"
                  disabled={!otp_code}
                  className={`w-[170px] py-3 font-semibold rounded-xl shadow-md transition duration-300 
                    ${otp_code ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Send
                </button>
                </div>
                <div className="md:block hidden">
                  <a href='/'><p className="text-green-600 cursor-pointer  -translate-y-2"><MdOutlineKeyboardBackspace className='sm:translate-x-165 translate-x-128 translate-y-5' /><p className='sm:translate-x-170'>Back</p></p></a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='  w-full rounded-bl-2xl rounded-br-2xl h-[350px] bg-green-600'></div>
        <div>
        <p className='flex items-center justify-center text-gray-400 my-7'>@Copyright, 2025. All right reserved</p>
      </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
