<template>
    <div class="main-home">
        <Navbar />
    </div>
    
    <div class="tasks">
        <p>
            <i class="fa-solid fa-check-to-slot" v-tooltip.bottom="'Show completed tasks'" @click="handleShowCompleteClick"></i>
        </p>
        <Task 
        :showComplete = showComplete
        @remove-task="removeTask"
        @complete-edit-task="completeEditTask"
        @on-complete-task="completeTask"/>
    </div>
    <div class="projects">
        <Project 
        @remove-project="onRemoveProject"/>
    </div>
</template>

<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import useCollection from '@/composables/useCollection';
import Navbar from '@/components/Navbar.vue';
import Project from '@/components/Project.vue';
import Task from '@/components/Task.vue';
import { useToast } from "primevue/usetoast";
import ITask from '@/common/interfaces/task.interface';
import { ref, watch } from 'vue';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';
const toast = useToast();

const { addDoc, removeDoc, editDoc, error } = useCollection('tasks');

const showComplete = ref(false);
const tasks = getCollection('tasks').documents;
const projects = getCollection('projects').documents;

const {user} = getUser();
const router = useRouter();


watch(user, () => {
    if(!user.value){
        router.push({ name: 'Welcome'});
    }
});


const errorProj = useCollection('projects').error;
const removeProj = useCollection('projects').removeDoc;




const onRemoveProject = async (project: any) => {
    
    await removeProj(project);
    if(!errorProj.value){
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project removed successfully',
            life: 2000
        });
    }
}

const removeTask = async (task: any) => {
    await removeDoc(task);
    if(!error.value){
        toast.add({
                severity: 'info',
                summary: 'Task removed successfully',
                detail: 'Task removed successfully',
                life: 2000
            });
    }
}

const completeEditTask = async (task: ITask) => {
    await editDoc(task);
    if(!error.value){
        toast.add({
                severity: 'info',
                summary: 'Task edited successfully',
                detail: 'Task edited successfully',
                life: 2000
            });
    }
}

const completeTask = async (task: ITask) => {
    task.completed = true;
    await editDoc(task);
    if(!error.value){
        toast.add({
                severity: 'info',
                summary: 'Task complete!',
                life: 2000
            });
    }
    return;
}

const handleShowCompleteClick = () => {
    showComplete.value = !showComplete.value;
}

</script>

<style lang="scss" scoped>
</style>