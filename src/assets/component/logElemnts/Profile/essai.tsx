import { useState, useRef, useEffect } from "react";
import { FiSend, FiImage, FiSmile } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { BsCheck2All } from "react-icons/bs";
import { useParams } from "react-router";
import axios from "axios";

interface Message {
  conversation: {
    in_group: {
      name: string;
      members: number[];
      avatar: string;
    };
    objectif: string;
    created_at: string;
  };
  sender: {
    id: number;
    username: string;
    profil_picture:string;
  };
  content: string;
  timestramp: string;
  status?: "sent" | "delivered" | "read";
}

const ChatApp = () => {
  
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
   const { conversation} = useParams();
    const {username}=useParams()

  useEffect(() => {
   
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://whopayingg.onrender.com/conversation_details/${conversation}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setMessages(res.data);
          console.log(res.data)
        } else {
          console.error("Réponse inattendue:", res.data);
        }
      } catch (error: any) {
        console.error("Erreur lors du chargement des messages:", error.message);
      }
    };

    fetchMessages();
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (newMessage.trim() === "" || !messages) return;

    const newMsg: Message = {
      conversation: messages[0].conversation,
      sender: {
        id: 49,
        username: "Moi",
      },
      content: newMessage,
      timestramp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => (prev ? [...prev, newMsg] : [newMsg]));
    setNewMessage("");

    updateMessageStatus(newMsg, "delivered", 1000);
    updateMessageStatus(newMsg, "read", 2000);

    if (Math.random() > 0.5) {
      simulateReply();
    }
  };
  

  const updateMessageStatus = (
    message: Message,
    status: "sent" | "delivered" | "read",
    delay: number
  ) => {
    setTimeout(() => {
      setMessages((prev) =>
        prev
          ? prev.map((msg) =>
              msg.timestramp === message.timestramp ? { ...msg, status } : msg
            )
          : null
      );
    }, delay);
  };
  const [utidonne,setutidonne]=useState({})
  
    useEffect( ()=>{
      const  Datafetch = async ()=>{
            const token = localStorage.getItem("token"); // ← ici on le récupère

    if (!token) {
      console.error("Aucun token trouvé");
      return;
    }
          
    try {
      const res = await axios.get(`https://whopayingg.onrender.com/profil/${username}/infos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setutidonne(res.data);
      console.log(utidonne)
    }catch (err) {
      console.error("Erreur API :", err);
    }
  };
    Datafetch()
  },[username])

  useEffect(() => {
  if (utidonne?.id) {
    setDonne((prev) => ({
      ...prev,
      sender: utidonne.id,
    }));
  }
}, [utidonne]);


  const [Donnee,setDonne]=useState({
    conversation: conversation,
    sender:utidonne.id,
    content:"",
})


const handleOnchange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setDonne({...Donnee,[e.target.name]:e.target.value})
}
const handlesubbmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // ← garde-le !

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `https://whopayingg.onrender.com/conversation_details/${conversation}/`,
      Donnee,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      const newMessageFromAPI: Message = res.data;

      // 🔥 Ajoute le message reçu à la liste
      setMessages((prev) => (prev ? [...prev, newMessageFromAPI] : [newMessageFromAPI]));

      // Réinitialise le champ
      setNewMessage("");
      setDonne((prev) => ({ ...prev, content: "" }));

      scrollToBottom();
    }
  } catch (err: any) {
    console.log(err);
    console.log("🔴 Erreur:", err.response?.data);
  }
};


console.log(Donnee)


  const simulateReply = () => {
    setIsTyping(true);
    setTimeout(() => {
      const replies = [
        "Oui, bien sûr !",
        "Je ne suis pas disponible désolé",
        "On peut en discuter",
        "Je te redis ça plus tard",
        "👍",
      ];

      if (!messages) return;

      const replyMsg: Message = {
        conversation: messages[0].conversation,
        sender: {
          id: Math.random() > 0.5 ? 11 : 12,
          username: Math.random() > 0.5 ? "Alice" : "Bob",
        },
        content: replies[Math.floor(Math.random() * replies.length)],
        timestramp: new Date().toISOString(),
        status: "read",
      };

      setMessages((prev) => (prev ? [...prev, replyMsg] : [replyMsg]));
      setIsTyping(false);
    }, 2000 + Math.random() * 3000);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isMe = (senderId: number) => {
    return senderId === messages[0].sender.id;
  };

  if (!messages) {
    return <div className="p-4 text-gray-500">Chargement des messages...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={`https://whopayingg.onrender.com/${messages[0].conversation.in_group.avatar}`}
              alt="Group avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="font-semibold">{messages[0].conversation.in_group.name}</h1>
            <p className="text-xs text-emerald-100">
              {isTyping
                ? "typing..."
                : `${messages[0].conversation.in_group.members.length} membres`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {Array.isArray(messages) &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender.id==utidonne.id? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex ${
                  msg.sender.id==utidonne.id ? "flex-row-reverse" : ""
                } max-w-[80%]`}
              >
                {msg.sender.id!=utidonne.id && (
                  <div className="w-8 h-8 rounded-full bg-emerald-300 flex items-center justify-center text-white text-sm font-bold mr-2 mt-1">
                    {/*msg.sender.username[0]*/} <img className="rounded-full" src={`https://whopayingg.onrender.com/${msg.sender.profile_picture}`} alt="photo envoyeur"/>
                  </div>
                )}

                <div
                  className={`relative px-4 py-2 rounded-lg shadow-sm ${
                    msg.sender.id==utidonne.id
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {msg.sender.id!=utidonne.id && (
                    <div className="font-semibold text-emerald-600 text-xs mb-1">
                      {msg.sender.username}
                    </div>
                  )}

                  <div className="text-sm ">{msg.content}</div>

                  <div
                    className={`flex items-center justify-end space-x-1 mt-1 ${
                      msg.sender.id==utidonne.id ? "text-emerald-100" : "text-gray-400"
                    }`}
                  >
                    <span className="text-xs">{formatTime(msg.timestramp)}</span>
                    {msg.sender.id && msg.status && (
                      <BsCheck2All
                        className={`text-xs ${
                          msg.status === "read" ? "text-white" : "text-emerald-200"
                        }`}
                      />
                    )}
                  </div>

                  <div
                    className={`absolute top-0 ${
                      msg.sender.id==utidonne.id
                        ? "-right-2 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 clip-path-message-tail-right"
                        : "-left-2 w-3 h-3 bg-white clip-path-message-tail-left border-l border-t border-gray-200"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-sm border border-gray-200">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    <form onSubmit={handlesubbmit}>
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-full hover:bg-gray-100">
            <FiSmile className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-full hover:bg-gray-100">
            <IoMdAttach className="w-5 h-5" />
          </button>

<input
  type="text"
  value={Donnee.content}
  onChange={handleOnchange}
  name="content" // ✅ correspond bien à Donnee.content
  placeholder="Écrire un message..."
  className="flex-1 p-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
/>                                               

          <button
            
            disabled={!Donnee.content.trim()}
            type="submit"
            className={`p-2 rounded-full ${
              Donnee.content.trim()
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                : "text-gray-400 bg-gray-100"
            }`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
      </form>

      <style jsx>{`
        .clip-path-message-tail-right {
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        .clip-path-message-tail-left {
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default ChatApp;
