import logo from "../../../photo/logo/Capture_d_écran_2025-07-06_003104-removebg-preview.png";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BiSearch } from "react-icons/bi";
import { MdOutlineMessage } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import profil from "../../../photo/profil/portrait-d-un-homme-blanc-isole.jpg";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";

const Navbarmobile = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const {username}=useParams()
  {/*useEffect(() => {
    const Datafetch = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé");
        return;
      }
      
      try {
        const res = await axios.get(`https://whopayingg.onrender.comprofil/${username}/infos/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setutidonne(res.data);
      } catch (err) {
        console.error("Erreur API :", err);
      }
    };
    Datafetch();
  }, [username]);*/}
    
    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className="block sm:hidden bg-white">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <MdKeyboardBackspace 
                    onClick={() => navigate(-1)}
                    className="text-2xl text-gray-700" 
                />
                
                <div onClick={handleNav} className="block sm:hidden">
                    {!nav ? (
                        <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
                    ) : (
                        <AiOutlineClose size={24} className="text-gray-700" />
                    )}
                </div>
                
                <div className="flex items-center gap-3">
                    <MdOutlineMessage 
                        onClick={() => navigate(`/profil/${username}/conversations`)}
                        className="text-xl text-gray-500" 
                    />
                    <IoIosNotifications className="text-xl text-gray-500" />
                    <img src={profil} alt="Profil" className="w-8 h-8 rounded-full" />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-xl transform ${
                nav ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out`}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                        <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
                        <AiOutlineClose 
                            onClick={handleNav}
                            size={24} 
                            className="text-gray-700 cursor-pointer" 
                        />
                    </div>
                    
                    <ul className="space-y-4">
                        <li className="p-3 border-b border-gray-100 hover:bg-green-50 rounded-md">
                            <a href={`/profil/${username}`} className="text-green-600 font-medium">Home</a>
                        </li>
                        <li className="p-3 border-b border-gray-100 hover:bg-green-50 rounded-md">
                            <a href={`/profil/${username}/information`} className="text-green-600 font-medium">UserInfo</a>
                        </li>
                        <li className="p-3 border-b border-gray-100 hover:bg-green-50 rounded-md">
                            <a href="#" className="text-green-600 font-medium">Dashboard</a>
                        </li>
                        <li className="p-3 border-b border-gray-100 hover:bg-green-50 rounded-md">
                            <a href="#" className="text-green-600 font-medium">Settings</a>
                        </li>
                        <li className="p-3 border-b border-gray-100 hover:bg-green-50 rounded-md">
                            <a href="#" className="text-green-600 font-medium">Contact us</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Search bar - Same as in profile */}
            <div className="relative px-4 py-3">
                <BiSearch className="absolute left-7 top-6 text-gray-400" />
                <input
                    type="text"
                    placeholder="Recherche..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
        </div>
    );
};

export default Navbarmobile;