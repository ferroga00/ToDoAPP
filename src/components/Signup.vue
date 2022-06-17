<template>
    <form @submit.prevent="handleSubmit" class="login-main_form-inputs">
        <div class="mb-2 form-group">
            <label for="username">Username</label>
            <input id="username" placeholder="Introduce your username" type="text" required v-model="usernameValue" />
        </div>
        <div class="mb-2 form-group">
            <label for="email">Email</label>
            <input type="text" id="email" placeholder="Introduce your email" required v-model="emailValue" />
        </div>
        <div class="mb-2 form-group">
            <label for="passw">Password</label>
            <input placeholder="Introduce your password" autocomplete="off" id="passw" type="password" required
                v-model="passwordValue" />
        </div>
        <div class="mb-2 form-group">
            <label for="fullName">Fullname</label>
            <input placeholder="Introduce your fullname" id="fullName" type="text" required v-model="fullNameValue" />
        </div>
        <div class="mb-2 form-group_role">
            <label for="role">Role</label>
            <select class="role" id="role" required v-model="roleValue">
                <option selected disabled hidden>Select your role</option>
                <option value="User">User</option>
                <option value="Administrator">Administrator</option>
            </select>
        </div>
        <p class="error">{{ error }}</p>
        <div class="form-group_signup">
            <button class='signup-main_form-custom-btn' icon="pi pi-check">Signup</button>
            <div class="login">
                Already have an account?
                <strong @click="emit('onClickLogin')" className='signup-main_form-login-text pointer'>Login</strong>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useSignup from '@/composables/useSignup';

const { error, signup } = useSignup();

const usernameValue = ref(null);
const emailValue = ref(null);
const passwordValue = ref(null);
const fullNameValue = ref(null);
const roleValue = ref('Select your role');

const emit = defineEmits(['onClickLogin', 'signup']);


const handleSubmit = async () => {
    const payload: any = {
        username: usernameValue.value,
        email: emailValue.value,
        password: passwordValue.value,
        fullName: fullNameValue.value,
        role: roleValue.value
    };

    await signup(payload);
    if (!error.value) {
        emit('signup');
    }   
}


</script>


<style lang="scss">
</style>