import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDiscouse from "../hooks/useDiscouse";
import { toast } from "react-toastify";


const ContactCard = ({ contact }) => {

  const {isOpen, onClose, onOpen} = useDiscouse(false);
  
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      toast.success('contact deleted')
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
     <div className="bg-yellow flex justify-between items-center p-2 rounded-lg" key={contact.id}>
            <div className="flex gap-1 items-center">
              <HiOutlineUserCircle className="text-orange text-4xl" />
            <div className="">
              <h2 className="font-medium">{contact.name}</h2>
              <a href={`mailto:${contact.email}`} className="text-sm block">{contact.email}</a>
              <a href={`tel:${contact.phone}`} className="text-sm block">{contact.phone}</a>
              </div>
            </div>
            <div className="flex text-3xl">
              <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
              <IoMdTrash onClick={() => {deleteContact(contact.id)}} className="text-orange cursor-pointer" />
            </div>
      </div>
      <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ContactCard;
