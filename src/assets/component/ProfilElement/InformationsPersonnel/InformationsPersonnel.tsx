import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"



const InformationsPersonnel = () => {
    const {username} =useParams()
    const token = localStorage.getItem("token");
    const [info,setInfo]=useState({})
    useEffect(()=>{
    if (!token) {
      console.log("Pas de token trouvé");
      return;

        }
       const res = axios.get(`https://whopaying-o9dg.onrender.comprofil/${username}/infos/`,
        {
    headers: {
    Authorization: `Bearer ${token}`,
        },
        }
       )
       .then(res=>{
        setInfo(res.data)
        console.log(res.data)
       })
       .catch(err=>{
        console.log(err.message)
       })
    },[username, token])
    


  return (
    <div className="bg-gray-400">
        <div className="max-w-[1050px] mx-auto">
            <div className="">
                <div className="bg-amber-100">
                   <p>{info.username}</p>
                </div>
                <div className="text-red">
                    <p>{info.first_name}</p>
                </div>
                <div className="w-[150px] h-[150px] ">
                    <img className="rounded-full" src={`http://127.0.0.1:8001${info.profile_picture}`}/>
                </div>
                <div className="bg-amber-100">
                    <p className="text-red">{info.last_name}</p>
                </div>
                <div className="bg-amber-100">
                    <p>{info.email}</p>
                </div>

            </div>
        </div>
      
    </div>
  )
}

export default InformationsPersonnel
