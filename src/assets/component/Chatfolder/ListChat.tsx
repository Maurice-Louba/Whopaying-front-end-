import { useEffect, useState } from "react";
import { FiSearch, FiMoreVertical, FiMessageSquare, FiMenu } from "react-icons/fi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BiArchiveIn } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

type Conversation = {
  id: number;
  
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  avatar: string;
};


const ConversationList = ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => {
  const [conversations,setconversations] = useState<Conversation[]>([
    {
      id: 1,
      
      lastMessage: "Alice: J'ai fini le composant principal",
      time: "10:30",
      unreadCount: 3,
      isOnline: true,
      avatar: "GP",
    },
    // ... autres conversations ...
  ]);
  const [listconv,setlistconv]=useState([])
  const {username}=useParams()


  




  
  useEffect(()=>{
    
    
    const token = localStorage.getItem("token");
    const res = axios.get(`https://whopaying-o9dg.onrender.com/mes-conversations/${username}/`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    
    
    .then((res)=>{
        setlistconv(res.data)
        console.log(res.data)

    })
    .catch((err)=>{
        console.log(err.message)
    })

  },[])
  const navigate= useNavigate()

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex mx-auto  flex-col h-screen bg-gray-50 border-r border-gray-200 w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 sm:p-4">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex items-center">
            {/* Bouton menu pour mobile */}
            <button 
              onClick={onToggleSidebar}
              className="mr-2 sm:hidden text-white hover:text-emerald-200"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold">Conversations</h1>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button className="text-white hover:text-emerald-200 hidden sm:block">
              <HiOutlineStatusOnline className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-emerald-200 hidden sm:block">
              <FiMessageSquare className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-emerald-200">
              <BiArchiveIn className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-emerald-200">
              <FiMoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-8 py-2 text-sm sm:text-base rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <BsFilter className="text-white" />
          </div>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {listconv.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex items-center p-2 sm:p-3 border-b border-gray-100 hover:bg-gray-100 cursor-pointer transition-colors ${
              conversation.unreadCount > 0 ? "bg-emerald-50" : ""
            }`} onClick={()=>navigate(`/profil/${username}/conversation/${conversation.id}`)}
          >
            {/* Avatar */}
            <div className="relative mr-2 sm:mr-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
                <img  className="w-[35px] h-[35px] sm:w-[42px] sm:h-[42px] -translate-x-0.7 rounded-full" src={`http://127.0.0.1:8001${conversation.in_group.avatar}`}/>
              </div>
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Conversation details */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex justify-between items-baseline">
                <h2 className="text-sm font-semibold text-gray-800 truncate">
                  {conversation.in_group.name}
                </h2>
                <span
                  className={`text-xs ml-2 ${
                    conversation.unreadCount > 0
                      ? "text-emerald-600 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {conversation.time}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2 flex-shrink-0">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Conversation Button - Mobile only */}
      <div className="p-2 sm:hidden border-t border-gray-200 bg-white">
        <button className="w-full bg-emerald-500 text-white py-2 px-3 rounded-lg shadow-sm hover:bg-emerald-600 transition-all flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      {/* New Conversation Button - Desktop */}
      <div className="hidden sm:block p-3 border-t border-gray-200 bg-white">
        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Nouvelle conversation
        </button>
      </div>
    </div>
  );
};

export default ConversationList;