<template>
    <nav class="navbar" v-if="user">
        <div class="navbar_links">
           Home
        </div>
        <div class="navbar_logout"> 
            <i class="fa-solid fa-user"></i>
            <p>
                {{ user?.displayName }}
            </p>
            <button @click="handleLogout">
                <i class="fa-solid fa-right-from-bracket"></i>
                Logout
            </button>
        </div>
        
    </nav>
</template>


<script setup lang="ts">
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';

const {error, logout} = useLogout();

const { user } = getUser();


const handleLogout = async () => {
    await logout();

    if(!error.value){
        console.log('user logged out');
    }
}

</script>


<style lang="scss" scoped>
</style>