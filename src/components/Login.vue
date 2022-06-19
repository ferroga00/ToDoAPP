<template>
    <form @submit.prevent="handleLogin" class="login-main_form-inputs">
        <div class="mb-3 form-group">
            <label class="form-label" for="email">Email</label>
            <input type="text" id="email" placeholder="Introduce your email" required v-model="emailValue" />
        </div>
        <div class="mb-3 form-group">
            <label class="form-label" for="passw">Password</label>
            <input id="passw" type="password" autocomplete="off" placeholder="Introduce your password" required
                v-model="passwordValue" />
        </div>
        <p class="error">{{ error }}</p>
        <button class="login-main_sign-in-btn mt-2" icon="pi pi-check">Login</button>
    </form>
    Non registered yet?
    <strong @click="emit('onClickSignup')" class="login-main_sign-up pointer">
        Sign up
    </strong>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useLogin from '@/composables/useLogin';

const { error, login } = useLogin();

const emailValue = ref(null);
const passwordValue = ref(null);

const handleLogin = async () => {
    await login({
        email: emailValue.value,
        password: passwordValue.value,
    });

    if (!error.value) {
        emit('login');
    }
}

const emit = defineEmits(['onClickSignup', 'login']);
</script>


<style lang="scss" scoped>
.mb-3 {
    display: flex;
    flex-direction: column;
}
</style>