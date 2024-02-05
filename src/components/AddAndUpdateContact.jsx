import Modal from "./Modal";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required('name is required'),
    email: Yup.string().email('invalid email').required('email is required'),
    phone: Yup.string().required('phone is required'),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, 'contacts');
            await addDoc(contactRef, contact);
            toast.success('add contact');
        } catch (error) {
                toast.error(error.message);
        }
    };

    const updateContact = async (contact ,id) => {
        try {
            const contactRef = doc(db, 'contacts' ,id);
            await updateDoc(contactRef, contact);
            toast.success('update contact');
        } catch (error) {
                toast.error(error.message);
        }
    };  


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik
                validationSchema={contactSchemaValidation}
                    initialValues={isUpdate ? {
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                } :{
                    name: '',
                    email: '',
                    phone: '',
                }}
                    onSubmit={(values , {resetForm}) => {
                        console.log(values);
                        isUpdate ? updateContact(values, contact.id) : addContact(values);
                        resetForm();
                        onClose();
                }}
                >
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                            <Field name='name' className='border h-10 pl-3 rounded-lg' />
                            <div className="text-red-500">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                          <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                            <Field type='email' name='email' className='border h-10 pl-3 rounded-lg' />
                              <div className="text-red-500">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                          <div className="flex flex-col gap-1">
                        <label type='phone' htmlFor="phone">Phone</label>
                            <Field name='phone' className='border h-10 pl-3 rounded-lg' />
                              <div className="text-red-500">
                                <ErrorMessage name="phone" />
                            </div>
                        </div>
                        <button type='submit' className="bg-orange px-3 py-1.5 border self-end rounded-lg">
                            {isUpdate ? 'update' : 'add'} contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
};

export default AddAndUpdateContact;
