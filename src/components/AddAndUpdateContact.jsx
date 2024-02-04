import Modal from "./Modal";
import { Form, Formik, Field } from "formik";


const AddAndUpdateContact = ({ isOpen, onClose }) => {
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik>
                    <Form>
                      <Field name='name' />
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
};

export default AddAndUpdateContact
