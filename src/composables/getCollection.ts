import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";
import getUser from '@/composables/getUser';

const getCollection = (collection: any) => {
    const errorGetCollection = ref('');
    const documents = ref();

    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt');
    collectionRef.onSnapshot((snap) => {
        let results: any[] = [];
        snap.docs.forEach((doc) => {
            if (!(getUser().user.value?.email?.split('@')[1] === 'todoapp.com')) {
                if (doc.data().user[0] === getUser().user.value?.uid) {
                    doc.data().createdAt && results.push({
                        ...doc.data(),
                        deadline: doc.data().deadline ? doc.data().deadline.toDate() : null,
                        id: doc.id
                    });
                };
            }
            else {
                doc.data().createdAt && results.push({
                    ...doc.data(),
                    deadline: doc.data().deadline ? doc.data().deadline.toDate() : null,
                    id: doc.id
                })
            }
        }

        )
        documents.value = results;
        errorGetCollection.value = '';
    }, (err) => {
        console.log(err.message);
        documents.value = null;
        errorGetCollection.value = 'Could not get from the database';
    })

    return { documents, errorGetCollection };
}

export default getCollection