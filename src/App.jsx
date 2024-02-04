import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";


const App = () => {

  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        const contactsSnapshot = await getDocs(contactsRef);
        const contactsList = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        setContacts(contactsList);
      } catch (error) {
        console.log(error)
      }
    }
    getContacts()

  }, []);


  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <IoIosSearch className="text-white text-3xl absolute ml-1" />
            <input type="text" className=" h-10 flex-grow bg-transparent border border-white rounded-md text-white pl-9" />
          </div>
          <FaCirclePlus onClick={onOpen} className="text-5xl cursor-pointer text-white" />
        </div>
      
        <div className="mt-4 flex gap-3 flex-col">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
     <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default App;
