import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

const App = () => {

  // const [contancts, setContacts] = useState([]);

  useEffect(() => {

    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        const contactsSnapshot = await getDocs(contactsRef);
        const contactsList = contactsSnapshot.docs.map((doc) => doc.data());
        console.log(contactsList);
      } catch (error) {
        console.log(error)
      }
    }
    getContacts()

  }, []);


  return (
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar />
      <div className="flex gap-2">
         <div className="flex relative items-center flex-grow">
        <IoIosSearch  className="text-white text-3xl absolute ml-1"/>
        <input type="text" className=" h-10 flex-grow bg-transparent border border-white rounded-md text-white pl-9" />
      </div>
      <FaPlusCircle className="text-5xl cursor-pointer text-white"/>
     </div>
    </div>
  )
}

export default App;
