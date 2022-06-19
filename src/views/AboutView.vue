<template>
    <div class="main-home">
        <Navbar />
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1>About us</h1>
                    <p>
                        Hi! We are a team of developers who love to create awesome stuff.
                    </p>
                    <p>
                        This team is made up of:
                        <br>José Antonio Santacruz Gallego
                        <br>Fernando Rodriguez Gallego
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection'
import Navbar from '@/components/Navbar.vue';
import { useToast } from "primevue/usetoast";
import ITask from '@/common/interfaces/task.interface'
import {ETaskPriority} from '@/common/enums/taskPriority.enum'
import { timestamp } from '@/firebase/config';

const toast = useToast();

const {user} = getUser();
const { addDoc, removeDoc, editDoc, error } = useCollection('tasks');

const router = useRouter();
const display = ref(false);

const titleValue = ref('');
const descriptionValue = ref('');
const deadlineValue = ref();
const priorityValue = ref(ETaskPriority.LOW);


const defaultTask = ref({
    title : '',
    description : '',
    createdAt: timestamp(),
    deadline : new Date(),
    priority : ETaskPriority.LOW,
    user: '',
    completed: false
});

watch(user, () => {
    if(!user.value){
        router.push({ name: 'Welcome'});
    }
})

const handleAddTask = () => {
    display.value = true;
}

const resetForm = () => {
    titleValue.value = '';
    descriptionValue.value = '';
    deadlineValue.value = '';
    priorityValue.value = ETaskPriority.LOW;
}

const saveTask = async  () => {

    const task = {
        title : titleValue.value,
        description : descriptionValue.value,
        createdAt: new Date(),
        deadline : deadlineValue.value,
        priority : priorityValue.value,
        user: user.value?.uid,
        completed: false
    };

    display.value = false;
    await addDoc(task);
    if(!error.value){
        task.title = defaultTask.value.title;
        task.description = defaultTask.value.description;
        task.deadline = defaultTask.value.deadline;
        task.priority = defaultTask.value.priority;
        toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Task added successfully',
                life: 2000
            });
    }
}

const removeTask = async (task: ITask) => {
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