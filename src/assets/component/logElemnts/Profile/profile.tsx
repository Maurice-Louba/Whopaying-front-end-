import logo from "../../../photo/logo/Capture_d_écran_2025-07-06_003104-removebg-preview.png";
import { IoIosNotifications } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import profil from "../../../photo/profil/portrait-d-un-homme-blanc-isole.jpg";
import { BiSearch } from "react-icons/bi";
import { MdOutlineMessage } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { RiUserForbidLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineMoreVert } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import vide from '../../../photo/profil/Rien.jpg'
import group from '../../../photo/profil/11450268-removebg-preview.png'
import axios from "axios";
import DateDisplay from "./DateDisplay";
import CreationGroup from "../../Creation/CreationGroup/CreationGroup";

const Mon_Profile = () => {
  const { username } = useParams();
  const [utidonne, setutidonne] = useState({});
  const [parametregroupe, setparametregroupe] = useState(false);
  const [debtsdata, setdebtsdata] = useState([]);
  const [expensesdata, setexpensesdata] = useState([]);
  const [appearnewgroup, setappearnewgroup] = useState(false);
  const [nav, setNav] = useState(false);
  const [changeEtat, setchangeEtat] = useState('a');
  const [filtre, setfiltre] = useState(false);
  const [defil1, setdefil1] = useState(true);
  const [defil2, setdefil2] = useState(true);
  const [defil3, setdefil3] = useState(true);
  const [groupsdata, setgroupsdata] = useState([]);
  
  const navigate = useNavigate();

  const handleappearnewgroup = () => {
    setappearnewgroup(!appearnewgroup);
  };

  const handleparametregroupe = () => {
    setparametregroupe(!parametregroupe);
  };

  const handlechangeEtat = (e: string) => {
    setchangeEtat(e);
  };

  const handlefiltre = () => {
    setfiltre(!filtre);
  };

  const handledefil1 = () => {
    setdefil1(!defil1);
  };

  const handledefil2 = () => {
    setdefil2(!defil2);
  };

  const handledefil3 = () => {
    setdefil3(!defil3);
  };

  const handleNav = () => {
    setNav(!nav);
  };
  const [showMenu,setShowMenu]=useState(false)
  // Fetch user data
  useEffect(() => {
    const Datafetch = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé");
        return;
      }
      
      try {
        const res = await axios.get(`https://whopayingg.onrender.com/${username}/infos/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setutidonne(res.data);
      } catch (err) {
        console.error("Erreur API :", err);
      }
    };
    Datafetch();
  }, [username]);

  // Fetch debts data
  useEffect(() => {
    const Datafetch = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      try {
        const res = await axios.get(`https://whopayingg.onrender.com/debts/${username}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setdebtsdata(res.data);
      } catch (err) {
        console.error("Erreur API :", err);
      }
    };
    Datafetch();
  }, [username]);

  // Fetch groups data
  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem("token");
      axios.get(`https://whopayingg.onrender.com/groups/${username}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setgroupsdata(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    };
    fetchData();
  }, [username]);

  // Fetch expenses data
  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem("token");
      axios.get(`https://whopayingg.onrender.com/expenses/${username}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setexpensesdata(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    };
    fetchData();
  }, [username]);
  
  const listeDonne = [
    { id: 1, title: "Debts", onclick: () => handlechangeEtat('a'), couleur: "text-green-600" },
    { id: 2, title: "Groups", onclick: () => handlechangeEtat('b'), couleur: "" },
    { id: 3, title: "Expense", onclick: () => handlechangeEtat('c'), couleur: "" },
    { id: 4, title: "Discussion", onclick: () => handlechangeEtat('d'), couleur: "" },
  ];

  const DiscussionData = [
    { id: 1, img: profil, nom: 'Cotisation', more: <MdOutlineMoreVert className="text-gray-500" /> },
    { id: 2, img: profil, nom: 'Cotisation', more: <MdOutlineMoreVert className="text-gray-500" /> },
    { id: 3, img: profil, nom: 'Cotisation', more: <MdOutlineMoreVert className="text-gray-500" /> }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Desktop Version */}
      <div className="hidden sm:block max-w-[1250px] mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl h-auto py-4 px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <img 
              className="w-[60px] h-[60px] hover:scale-105 transition-transform duration-300" 
              src={logo} 
              alt="Logo" 
            />
          </div>

          {/* Title */}
          <div className="flex items-center justify-center lg:justify-start">
            <MdKeyboardBackspace 
              onClick={() => navigate(-1)}
              className="text-xl mr-2 text-white cursor-pointer" 
            />
            <p className="text-lg font-semibold text-white">Détail utilisateur</p>
          </div>

          {/* Search bar */}
          <div className="relative flex justify-center">
            <BiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Recherche..."
              className="pl-10 w-full sm:w-[300px] md:w-[350px] py-2 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white bg-white/90 backdrop-blur-sm"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center justify-center gap-4">
            <div onClick={() => navigate(`/profil/${username}/conversations`)} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 cursor-pointer">
              <MdOutlineMessage className="text-white text-xl" />
            </div>
            <div className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 cursor-pointer">
              <IoIosNotifications className="text-white text-xl" />
            </div>
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-white hover:border-emerald-300 transition-colors duration-300">
              <img src={profil} alt="Profil" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-4 h-fit sticky top-4">
            <button 
              onClick={handleappearnewgroup}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 mb-4"
            >
              <IoCreateOutline className="text-lg" />
              <span>New Group</span>
            </button>

            {[
              { label: "Groups", handler: handledefil1, open: defil1 },
              { label: "Expenses", handler: handledefil2, open: defil2 },
              { label: "Debts", handler: handledefil3, open: defil3 },
              { label: "Eligibility", icon: <RiUserForbidLine className="text-gray-500" /> },
              { label: "Settings" },
              { label: "Contact us" },
              { label: "Give a feedback" },
              { label: "Report" },
            ].map((item, index) => (
              <div key={index} className="mb-2">
                <div 
                  onClick={item.handler}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <span className="text-gray-700">{item.label}</span>
                  {item.icon || (item.open !== undefined ? 
                    (item.open ? 
                      <IoMdArrowDropdown className="text-gray-500" /> : 
                      <IoMdArrowDropup className="text-gray-500" />
                    ) : 
                    <IoMdArrowDropdown className="text-gray-500" />
                  )}
                </div>

                {/* Dropdown content */}
                {item.handler && !item.open && (
                  <div className="ml-4 mt-1 bg-gray-50 rounded-lg p-2 animate-fadeIn">
                    <ul className="space-y-1">
                      {item.label === "Groups" && groupsdata.map((data) => (
                        <li key={data.id} className="p-2 hover:text-emerald-600 hover:bg-gray-100 rounded transition-colors">
                          {data.name}
                        </li>
                      ))}
                      {item.label === "Expenses" && ["All", "You", "Others"].map((opt) => (
                        <li key={opt} className="p-2 hover:text-emerald-600 hover:bg-gray-100 rounded transition-colors">
                          {opt}
                        </li>
                      ))}
                      {item.label === "Debts" && ["All", "Creditor", "Debitor"].map((opt) => (
                        <li key={opt} className="p-2 hover:text-emerald-600 hover:bg-gray-100 rounded transition-colors">
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Profile Card */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-b from-emerald-500 to-green-600 rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 text-center">
                <div className="flex justify-end mb-2">
                  <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
                    <IoCreateOutline />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="mx-auto w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden mb-4">
                  <img src={profil} alt="Profile" className="w-full h-full object-cover" />
                </div>

                <h2 className="text-xl font-bold text-white">{utidonne.username}</h2>
                <p className="text-white/80 mb-4">04/04/2005</p>

                <div className="border-t border-white/20 my-4"></div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <MdLocationOn className="text-white" />
                    </div>
                    <p className="text-white/90">Rabat Agdal, avenue de france</p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <MdOutlineMail className="text-white" />
                    </div>
                    <p className="text-white/90">{utidonne.email}</p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <LuPhone className="text-white" />
                    </div>
                    <p className="text-white/90">Call: 0691615054</p>
                  </div>

                  <div className="flex items-center pl-11">
                    <p className="text-white/90">Work: 0691615054</p>
                  </div>

                  <div className="flex items-center pl-11">
                    <p className="text-white/90">Home: 0691615054</p>
                  </div>

                  <div className="flex items-center pl-11">
                    <p className="text-white/90">Other: 0691615054</p>
                  </div>
                </div>

                <div className="border-t border-white/20 my-4"></div>

                <div className="space-y-2 text-left">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <MdOutlineDriveFileRenameOutline className="text-white" />
                    </div>
                    <p className="text-white/90">{utidonne.first_name}</p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <MdOutlineDriveFileRenameOutline className="text-white" />
                    </div>
                    <p className="text-white/90">{utidonne.last_name}</p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <MdOutlineDriveFileRenameOutline className="text-white" />
                    </div>
                    <p className="text-white/90">{utidonne.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              {appearnewgroup ? (
                <CreationGroup />
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                    {listeDonne.map((data) => (
                      <button
                        key={data.id}
                        onClick={data.onclick}
                        className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
                          changeEtat === data.id 
                            ? 'bg-emerald-500 text-white shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {data.title}
                      </button>
                    ))}
                  </div>

                  {/* Filter */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">All</h3>
                    <button 
                      onClick={handlefiltre}
                      className="flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {!filtre ? 'Show filters' : 'Hide filters'}
                      {!filtre ? (
                        <IoMdArrowDropdown />
                      ) : (
                        <IoMdArrowDropup />
                      )}
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-4">
                    {/* Debts */}
                    {changeEtat === 'a' && (
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        {debtsdata.length > 0 ? (
                          <>
                            <div className="bg-emerald-500 grid grid-cols-5 p-3 text-white font-medium">
                              <span>Date</span>
                              <span>From</span>
                              <span>To</span>
                              <span>Amount</span>
                              <span>Group</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {debtsdata.map((data) => (
                                <div key={data.id} className="grid grid-cols-5 p-3 hover:bg-gray-50 transition-colors">
                                  <span className="text-gray-600">
                                    <DateDisplay isoDate={data.created_at} />
                                  </span>
                                  <span className="text-emerald-600 font-medium">{data.debtor.username}</span>
                                  <span className="text-gray-600">{data.creditor.username}</span>
                                  <span className="text-gray-600">{data.amount}</span>
                                  <span className="text-gray-600">{data.group.name}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 text-center">
                            <img src={vide} alt="No debts" className="w-20 h-20 mb-4 opacity-70" />
                            <h4 className="text-xl text-gray-400 font-medium">You have not any debts yet!</h4>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Groups */}
                    {changeEtat === 'b' && (
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        {groupsdata.length > 0 ? (
                          <>
                            <div className="bg-emerald-500 grid grid-cols-4 p-3 text-white font-medium">
                              <span>Avatar</span>
                              <span>Name</span>
                              <span>Created at</span>
                              <span>Actions</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {groupsdata.map((data) => (
                                <div key={data.id} className="grid grid-cols-4 p-3 items-center hover:bg-gray-50 transition-colors">
                                  <img 
                                    src={`https://whopayingg.onrender.com${data.avatar}`} 
                                    alt={data.name} 
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <span className="text-emerald-600 font-medium">{data.name}</span>
                                  <span className="text-gray-600">
                                    <DateDisplay isoDate={data.created_date} />
                                  </span>
                                  <div className="relative">
                                    <button 
                                      onClick={handleparametregroupe}
                                      className="text-gray-500 hover:text-emerald-600 transition-colors"
                                    >
                                      <IoMdMore />
                                    </button>
                                    {parametregroupe && (
                                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                        <ul>
                                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My favorite</li>
                                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Block</li>
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 text-center">
                            <img src={group} alt="No groups" className="w-20 h-20 mb-4 opacity-70" />
                            <h4 className="text-xl text-gray-400 font-medium">You are not in any group yet!</h4>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expenses */}
                    {changeEtat === 'c' && (
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <div className="bg-emerald-500 grid grid-cols-6 p-3 text-white font-medium">
                          <span>User</span>
                          <span>Group</span>
                          <span>Amount</span>
                          <span>Description</span>
                          <span>Date</span>
                          <span>Actions</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {expensesdata.map((data) => (
                            <div key={data.id} className="grid grid-cols-6 p-3 items-center hover:bg-gray-50 transition-colors">
                              <span className="text-gray-600">{data.user_depenced.username}</span>
                              <span className="text-emerald-600 font-medium">{data.group.name}</span>
                              <span className="text-gray-600">{data.amount}</span>
                              <span className="text-gray-600 truncate">{data.description}</span>
                              <span className="text-gray-600">
                                <DateDisplay isoDate={data.date} />
                              </span>
                              <button className="text-gray-500 hover:text-emerald-600 transition-colors">
                                <IoMdMore />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block sm:hidden bg-white min-h-screen">
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
            <MdOutlineMessage onClick={() => navigate(`/profil/${username}/conversations`)} className="text-xl text-gray-500" />
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

        {/* Main Content */}
        <div className="p-4">
          {/* Title */}
          <div className="text-center my-4">
            <h1 className="text-xl font-semibold text-gray-800">Détail utilisateur</h1>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <BiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Recherche..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Profile Card */}
          <div className="bg-gradient-to-b from-green-500 to-emerald-600 rounded-xl shadow-md overflow-hidden mb-4">
            <div className="p-4 text-center">
              <div className="mx-auto w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden mb-3">
                <img src={profil} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              <h2 className="text-lg font-bold text-white">{utidonne.username}</h2>
              <p className="text-white/80 mb-3">04/04/2005</p>
              
              <div className="border-t border-white/20 my-3"></div>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center">
                  <MdLocationOn className="text-white mr-2" />
                  <p className="text-white/90">Rabat Agdal, avenue de france</p>
                </div>
                
                <div className="flex items-center">
                  <MdOutlineMail className="text-white mr-2" />
                  <p className="text-white/90">{utidonne.email}</p>
                </div>
                
                <div className="flex items-center">
                  <LuPhone className="text-white mr-2" />
                  <p className="text-white/90">0691615054</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide mb-4">
            {listeDonne.map((data) => (
              <button
                key={data.id}
                onClick={data.onclick}
                className={`flex-shrink-0 px-4 py-2 mx-1 rounded-lg ${
                  changeEtat === data.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {data.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            {changeEtat === 'a' && (
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Dettes récentes</h3>
                {debtsdata.length > 0 ? (
                  <div className="space-y-3">
                    {debtsdata.slice(0, 3).map((data) => (
                      <div key={data.id} className="p-3 border border-gray-100 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">{data.debtor.username}</span>
                          <span className="text-green-600">{data.amount} DH</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          <DateDisplay isoDate={data.created_at} /> • {data.group.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <img src={vide} alt="No data" className="w-16 h-16 mx-auto opacity-50 mb-2" />
                    <p className="text-gray-500">Aucune dette trouvée</p>
                  </div>
                )}
              </div>
            )}

            {changeEtat === 'b' && (
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Vos groupes</h3>
                {groupsdata.length > 0 ? (
                  <div className="space-y-3">
                    {groupsdata.slice(0, 3).map((data) => (
                      <div key={data.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
                        <img 
                          src={`https://whopayingg.onrender.com${data.avatar}`} 
                          alt={data.name} 
                          className="w-10 h-10 rounded-full mr-3" 
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{data.name}</h4>
                          <p className="text-xs text-gray-500">
                            Créé le <DateDisplay isoDate={data.created_date} />
                          </p>
                        </div>
                       <MdOutlineMoreVert className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <img src={group} alt="No groups" className="w-16 h-16 mx-auto opacity-50 mb-2" />
                    <p className="text-gray-500">Aucun groupe trouvé</p>
                  </div>
                )}
              </div>
            )}

            {changeEtat === 'c' && (
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Dépenses récentes</h3>
                {expensesdata.length > 0 ? (
                  <div className="space-y-3">
                    {expensesdata.slice(0, 3).map((data) => (
                      <div key={data.id} className="p-3 border border-gray-100 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">{data.group.name}</span>
                          <span className="text-green-600">{data.amount} DH</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {data.description || "Aucune description"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          <DateDisplay isoDate={data.date} /> • Par {data.user_depenced.username}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <img src={vide} alt="No data" className="w-16 h-16 mx-auto opacity-50 mb-2" />
                    <p className="text-gray-500">Aucune dépense trouvée</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* New Group Button */}
<div className="fixed bottom-6 right-6 flex flex-col items-end">
  {/* Menu options that appear around the button */}
  {showMenu && (
    <div className="mb-3 bg-white rounded-lg shadow-lg p-3 w-48">
      <ul className="space-y-2 text-sm">
        <li 
          className="p-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
          onClick={()=>navigate(`/profil/${username}/new-group`)}
        >
          Create a Group
        </li>
        <li 
          className="p-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
          onClick={()=>navigate(`/profil/${username}/new-debts`)}
        >
          Create a Debt
        </li>
        <li 
          className="p-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
          
        >
          Create an Expense
        </li>
      </ul>
    </div>
  )}
  
  {/* Main floating button */}
  <button 
    onClick={() => setShowMenu(!showMenu)}
    className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
  >
    <IoCreateOutline size={24} />
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default Mon_Profile;