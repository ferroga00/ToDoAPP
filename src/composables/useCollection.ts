import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useCollection = (collection: any) => {
    const error = ref('');

    const addDoc = async (doc: any) => {
        error.value = '';
        try {
            if (doc.deadline === undefined) {
                doc.deadline = null;
            }
            await projectFirestore.collection(collection).add(doc);
        } catch (err: any) {
            console.log(err.message);
            error.value = 'Could not add to the database';
        }
    }

    const removeDoc = async (doc: any) => {
        error.value = '';
        try {
            await projectFirestore.collection(collection).doc(doc.id).delete();
        } catch (err: any) {
            console.log(err.message);
            error.value = 'Could not remove from the database';
        }
    }

    const editDoc = async (doc: any) => {
        error.value = '';
        try {
            await projectFirestore.collection(collection).doc(doc.id).update(doc);
        } catch (err: any) {
            console.log(err.message);
            error.value = 'Could not edit in the database';
        }
    }

    return { error, addDoc, removeDoc, editDoc };
}


export default useCollection;