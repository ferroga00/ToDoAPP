<template>
    <div class="container">
        <Navbar />
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import getUser from '@/composables/getUser';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const {user} = getUser();
const router = useRouter();


watch(user, () => {
    if(!user.value){
        router.push({ name: 'Welcome'});
    }
})


</script>

<style lang="scss"></style>