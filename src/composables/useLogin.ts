import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref('');

const login = async (payload: any) => {
    error.value = '';

    try {
        const res = await projectAuth.signInWithEmailAndPassword(payload.email, payload.password);
        error.value = '';
        return res;

    } catch (err: any) {
        console.log(err.value);
        error.value = 'Incorrect login credentials';

    }

}

const useLogin = () => {
    return { error, login }
}

export default useLogin;