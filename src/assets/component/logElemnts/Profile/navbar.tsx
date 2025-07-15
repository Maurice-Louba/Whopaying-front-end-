import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import {  useNavigate } from "react-router-dom";
import { useState } from 'react'
const Navbar = ()=>{
   
    const [nav,setNav]=useState(false)
    const handleNav = ()=>{
        setNav(!nav)
    }
    return(
    <div className='flex items-center h-24 max-w-[1240px] bg-black mx-auto text-white px-4  justify-between'>

        <div onClick={handleNav} className='block md:hidden'>
            {!nav? <AiOutlineMenu size={20}/>:<AiOutlineClose size={20}/>}
            
        </div>
        <div className={nav!?'fixed left-0 top-0 bg-[#000300] border-r border-r-gray-800 w-[60%] h-full  p-4 ease-in-out duration-500':'fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#0ac0f3]'>React.</h1>
            <ul className=' uppercase p-4'>
                <li className="p-4 border-b border-gray-600 hover:bg-gray-900 hover:w-[100%] hover:h-[80%] hover:rounded-md hover:text-[#0ac0f3]">Home</li>
                <li className="p-4 border-b border-gray-600 hover:bg-gray-900 hover:w-[100%] hover:h-[80%] hover:rounded-md hover:text-[#0ac0f3]">Company</li>
                <li className="p-4 border-b border-gray-600 hover:bg-gray-900 hover:w-[100%] hover:h-[80%] hover:rounded-md hover:text-[#0ac0f3]">Ressources</li>
                <li className="p-4 border-b border-gray-600 hover:bg-gray-900 hover:w-[100%] hover:h-[80%] hover:rounded-md hover:text-[#0ac0f3]">About</li>
                <li className="p-4 border-b border-gray-600 hover:bg-gray-900 hover:w-[100%] hover:h-[80%] hover:rounded-md hover:text-[#0ac0f3]">Contact</li>
            </ul>

        </div>
    </div>
    )
}
export default Navbar 
