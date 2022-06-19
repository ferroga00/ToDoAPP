<template>
    <div class="main-home projects-main">
        <Navbar />
        <h1 class="projects-main_title">My Projects</h1>
        <div class="addNewProject" @click="handleAddProject" v-tooltip.bottom="'Add a new project'">
            <i class="fa-solid fa-plus"></i>
            <p>Add new project</p>
        </div>
        <Dialog class="dialog" header="Add a new project" v-model:visible="display" @hide="resetForm" >
            <div class="form-group">
                <label for="title">Project's title</label>
                <InputText v-model="titleValue" id="title" required/>
            </div>
            <div class="form-group">
                <label for="description">Description (optional)</label>
                <Textarea v-model="descriptionValue" id="description" :autoResize="true" required />
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click="saveProject">Save</button>
            </div>
        </Dialog>
        <Project />
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import useCollection from '@/composables/useCollection'
import Navbar from '@/components/Navbar.vue';
import Project from '@/components/Project.vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import { useToast } from "primevue/usetoast";
import ITask from '@/common/interfaces/task.interface'
import { EColumn } from '@/common/enums/columns.enum'
import { timestamp } from '@/firebase/config';


const toast = useToast();

const {user} = getUser();
const { addDoc, removeDoc, editDoc, error } = useCollection('projects');

const router = useRouter();
const display = ref(false);

const titleValue = ref('');
const descriptionValue = ref('');


const defaultProject = ref({
    title : '',
    description : '',
    user: '',
    shared: false,
    tasks: []
});

const resetForm = () => {
    titleValue.value = '';
    descriptionValue.value = '';
}

watch(user, () => {
    if(!user.value){
        router.push({ name: 'Welcome'});
    }
});

const handleAddProject = () => {
    display.value = true;
}

const saveProject = async () => {
    if((titleValue.value !== '' && titleValue.value !== null)){
        const project = {
            title: titleValue.value,
            description: descriptionValue.value,
            createdAt: new Date(),
            user: user.value?.uid,
            shared: false,
            tasks: []
        };
        display.value = false;
        await addDoc(project);
        if(!error.value){
            project.title = defaultProject.value.title;
            project.description = defaultProject.value.description;
            project.user = defaultProject.value.user;

            toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Project added successfully',
                    life: 2000
                });
        }
    }
    else{
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please fill all the fields',
            life: 2000
        });
    }
}

</script>

<style lang="scss">
    .buttons {
        display: flex;
        justify-content: right;
    
        button {
            margin: 1rem 0.6rem 0 0.6rem ;
        }

        &_addTask {
            border: 1px solid #74F768;
            background: #74F768;
            border-radius: 5px;
            color: white;
            padding: 0 1rem;

            &:hover{
            border: 1px solid #30d322;

                background: #30d322;
                color: white;
            }
        }
    }


</style>