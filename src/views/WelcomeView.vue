<template>
    <div v-if="showLogin" class="login-main ">
        <div class="col-xs-8 login-main_logo-area">
            <img class="login-main_logo" src='../assets/images/logo.png' alt="Logo" />
            <h1 class='font-weight-bold login-main_logo-area_title'>Welcome to Task Up</h1>
            <h3 class='login-main_logo-area_subtitle'>No. 1 application in tasks and projects</h3>
            <img class="login-main_image" src='../assets/images/img.png' alt="People Image" />
            <h4 class='font-italic login-main_logo-area_slogan'>Made for everyone</h4>
        </div>
        <div class="col-xs-4 login-main_form-area">
            <div class="card login-main_form">
                <div class="card-title">
                    <h4 class="card-title_text">Login</h4>
                </div>
                <div class="card-body">
                    <Login @on-click-signup="onClickSignup" @login="onEnteringHome" />
                </div>
            </div>

        </div>
    </div>

    <div v-else class="signup-main ">
        <div class="col">
            <img class="signup-main_logo" src='./../assets/images/logo.png' alt="Logo" />
            <img class="signup-main_image " src='./../assets/images/task-man.jpg' alt="Working" />
        </div>
        <div class="col ">
            <div class="card signup-main_form">
                <div class="card-title ">
                    <h4 class="card-title_text signup-main_form-header">Register a new user</h4>
                </div>
                <div class="card-body">
                    <Signup @on-click-login="onClickLogin" @signup="onEnteringHome" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const showLogin = ref(true);

const onClickLogin = () => {
    showLogin.value = true;
}

const onClickSignup = () => {
    showLogin.value = false;
}

const onEnteringHome = () => {
    router.push({ name: 'Home' });
}


</script>
