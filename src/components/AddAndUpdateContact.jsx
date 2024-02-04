import Modal from "./Modal";
import { Form, Formik, Field } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const AddAndUpdateContact = ({ isOpen, onClose }) => {

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, 'contacts');
            await addDoc(contactRef, contact);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                }}
                    onSubmit={(values , {resetForm}) => {
                        console.log(values);
                        addContact(values);
                        resetForm();
                        onClose();
                }}
                >
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <Field name='name' className='border h-10 pl-3 rounded-lg' />
                        </div>
                          <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Field type='email' name='email' className='border h-10 pl-3 rounded-lg' />
                        </div>
                          <div className="flex flex-col gap-1">
                        <label type='phone' htmlFor="phone">Phone</label>
                        <Field name='phone' className='border h-10 pl-3 rounded-lg' />
                        </div>
                        <button type='submit' className="bg-orange px-3 py-1.5 border self-end rounded-lg">
                            add contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
};

export default AddAndUpdateContact;
