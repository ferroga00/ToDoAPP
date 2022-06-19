<template>
    <nav class="navbar" v-if="user">
        <div class="navbar_logo">
            <img src="../assets/images/isotipo.png"/>
        </div>
        <div class="navbar_links">
           <ul>
            <li><a class="pointer link" @click="onClickHome">Home</a></li>
            <li><a class="pointer link" @click="onClickTasks">Tasks</a></li>
            <li><a class="pointer link" @click="onClickProjects">Project</a></li>
            <li><a class="pointer link" @click="onClickAbout">About</a></li>
           </ul>
        </div>
        <div class="navbar_user"> 
            <i class="fa-solid fa-circle-user icon"></i>
            <p class="navbar_user-username">
                {{ user?.displayName }}
            </p>
            <button class="navbar_user-logout" @click="handleLogout" v-tooltip.bottom="'Logout'" >
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        </div>
        
    </nav>
</template>


<script setup lang="ts">
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';
const router = useRouter();

const {error, logout} = useLogout();

const { user } = getUser();

const onClickHome = () => {
    router.push({ name: 'Home'});
}

const onClickTasks = () => {
    router.push({ name: 'Tasks'});
}

const onClickProjects = () => {
    router.push({ name: 'Project'});
}

const onClickAbout = () => {
    router.push({ name: 'About'});
}


const handleLogout = async () => {
    await logout();

    if(!error.value){
        console.log('user logged out');
    }
}

</script>


<style lang="scss" scoped>
</style>