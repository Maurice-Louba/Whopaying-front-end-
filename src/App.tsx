import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import './App.css'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import LoginPage from './assets/component/logElemnts/login/login'
import SignUpPage from './assets/component/logElemnts/SingUp/SingUp'
import VerfyEmail from './assets/component/logElemnts/VerifyEmail/VerfyEmail'


import InformationsPersonnel from './assets/component/ProfilElement/InformationsPersonnel/InformationsPersonnel'
import Toutprofil from './assets/component/logElemnts/Profile/Toutprofil';
import Autre from './assets/component/logElemnts/Profile/Autre';
import Test from './assets/component/logElemnts/login/test';
import CreationGroup from './assets/component/Creation/CreationGroup/CreationGroup';
import ChantDisplay from './assets/component/logElemnts/Profile/essai';
import ChatApp from './assets/component/logElemnts/Profile/essai';
import ConversationList from './assets/component/Chatfolder/ListChat';
import Navbar from './assets/component/logElemnts/Profile/navbar';
import Navbarmobile from './assets/component/logElemnts/Profile/Navbarmobile';
import CreationDebts from './assets/component/Creation/CreationDebts';


function App() {
      useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, 
    });

    
    AOS.refresh();
  }, []);

  
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/verify/:username" element={<VerfyEmail/>}/>
        <Route path='/profil/:username' element={<Toutprofil/>}/>
        <Route path='/profil/:username/information' element={<Autre/>}/>
        <Route path='/profil/:username/infos'element={<InformationsPersonnel/>}/>
        <Route path='/profil/' element={<Test/>}/>
        <Route path='/profil/:username/new-group' element={<CreationGroup/>}/>
        <Route path='/profil/:username/conversations' element={<ConversationList/>}/>
        <Route path='/profil/:username/conversation/:conversation' element={<ChatApp/>}/>
        <Route path='/profil/navbar/:username' element={<Navbarmobile/>}/>
        <Route path='/profil/:username/new-debts' element={<CreationDebts/>}/>

          
        
      </Routes>

            
            
            
            
  
    </Router>
  )
}

export default App
