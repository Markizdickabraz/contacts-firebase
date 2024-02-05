import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDiscouse from "./hooks/useDiscouse";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";


const App = () => {

  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDiscouse(false);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          });
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    }
    getContacts();
  }, []);


  const chengeFilter = e => {
    setFilter(e.target.value);
  };

  const normalizedFilter = filter.toLowerCase();
  let filtredComponents = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));


  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <IoIosSearch className="text-white text-3xl absolute ml-1" />
            <input onChange={chengeFilter} type="text" className=" h-10 flex-grow bg-transparent border border-white rounded-md text-white pl-9" />
          </div>
          <FaCirclePlus onClick={onOpen} className="text-5xl cursor-pointer text-white" />
        </div>
        {contacts.length <= 0 ?
          <NotFoundContact /> :
          filtredComponents.length > 0 &&
          <div className="mt-4 flex gap-1.5 flex-col">
            {filtredComponents.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div> 
        }
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
        </> 
  );
};

export default App;
