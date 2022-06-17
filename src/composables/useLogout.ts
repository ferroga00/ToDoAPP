import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref('');

const logout = async () => {
    error.value = '';

    try {
        await projectAuth.signOut();

    } catch (err: any) {
        console.log(err.value);
        error.value = err.message;

    }

}

const useLogout = () => {
    return { error, logout }
}

export default useLogout;