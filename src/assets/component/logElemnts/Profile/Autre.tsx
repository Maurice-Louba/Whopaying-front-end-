import profil from "../../../photo/profil/portrait-d-un-homme-blanc-isole.jpg";
import { IoCreateOutline } from "react-icons/io5";
import { MdLocationOn, MdOutlineMail, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import Navbarmobile from "./Navbarmobile";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

// Définir le type des données utilisateur
type UserInfos = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
};

const Autre = () => {
  const { username } = useParams();
  const [utidonne, setutidonne] = useState<UserInfos | null>(null);

  useEffect(() => {
    const Datafetch = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé");
        return;
      }

      try {
        const res = await axios.get(
          `https://whopayingg.onrender.comprofil/${username}/infos/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setutidonne(res.data);
      } catch (err) {
        console.error("Erreur API :", err);
      }
    };
    Datafetch();
  }, [username]);

  return (
    <div className="block sm:hidden">
      <Navbarmobile />

      {/* Si utidonne n’est pas encore chargé, affiche un loader */}
      {!utidonne ? (
        <div className="text-center text-gray-600 mt-10">Chargement...</div>
      ) : (
        <div className="mx-4 my-6 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-start p-4">
            <div className="w-10"></div>
            <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
              <IoCreateOutline className="text-lg" />
              <span className="text-sm">Edit</span>
            </button>
          </div>

          {/* Profile Content */}
          <div className="px-4 pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={profil}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/80 shadow-md"
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            <div className="text-center mb-4">
              <h2 className="text-white text-xl font-bold">Mrs. {utidonne.username}</h2>
              <p className="text-white/80 text-sm">Member since 04/04/2005</p>
            </div>

            <div className="border-t border-white/30 my-4"></div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="mt-1 w-6 h-6 flex justify-center items-center bg-white/20 rounded-full">
                  <MdLocationOn className="text-white text-sm" />
                </div>
                <p className="text-white/90 text-sm ml-3">Rabat Agdal, avenue de France</p>
              </div>

              <div className="flex items-start">
                <div className="mt-1 w-6 h-6 flex justify-center items-center bg-white/20 rounded-full">
                  <MdOutlineMail className="text-white text-sm" />
                </div>
                <p className="text-white/90 text-sm ml-3 break-all">{utidonne.email}</p>
              </div>

              {[
                { label: "Mobile", number: "0691615054" },
                { label: "Work", number: "0522547896" },
                { label: "Home", number: "0537721845" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="mt-1 w-6 h-6 flex justify-center items-center bg-white/20 rounded-full">
                    <LuPhone className="text-white text-sm" />
                  </div>
                  <p className="text-white/90 text-sm ml-3">
                    <span className="font-medium">{item.label}:</span> {item.number}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/30 my-4"></div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="mt-1 w-6 h-6 flex justify-center items-center bg-white/20 rounded-full">
                  <MdOutlineDriveFileRenameOutline className="text-white text-sm" />
                </div>
                <div className="ml-3">
                  <p className="text-white/70 text-xs">First Name</p>
                  <p className="text-white/90 text-sm">{utidonne.first_name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 w-6 h-6 flex justify-center items-center bg-white/20 rounded-full">
                  <MdOutlineDriveFileRenameOutline className="text-white text-sm" />
                </div>
                <div className="ml-3">
                  <p className="text-white/70 text-xs">Last Name</p>
                  <p className="text-white/90 text-sm">{utidonne.last_name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 w-6 h-6 flex justify-center items-center bg-white/20 rounded-full">
                  <MdOutlineDriveFileRenameOutline className="text-white text-sm" />
                </div>
                <div className="ml-3">
                  <p className="text-white/70 text-xs">Bio</p>
                  <p className="text-white/90 text-sm">{utidonne.bio}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 px-4 py-3 flex justify-center space-x-6">
            {["Facebook", "Twitter", "Instagram"].map((social) => (
              <button
                key={social}
                className="text-white/80 text-xs hover:text-white transition-colors"
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Autre;
