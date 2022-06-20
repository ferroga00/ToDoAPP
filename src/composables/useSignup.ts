import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref(null);

const signup = async (payload: any) => {
    error.value = null;

    try {

        const res = await (await projectAuth.createUserWithEmailAndPassword(payload.email, payload.password));

        if (!res) {
            throw new Error("Firebase: Something went wrong. ()");
        }

        await res.user?.updateProfile({ displayName: payload.username });
        error.value = null;

        return res;
    } catch (err: any) {
        console.log(err.message);
        error.value = err.message.split(":")[1].split("(")[0] || err.message;
    }
}


const useSignup = () => {
    return { error, signup }
}


export default useSignup;