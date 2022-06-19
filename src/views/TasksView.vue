<template>
    <div class="main-home">
        <Navbar />
        <h1 class="task-main_title">My Tasks</h1>
        <Dialog class="dialog" header="Add a new task" v-model:visible="display" @hide="resetForm" >
            <div class="form-group">
                <label for="title">Title</label>
                <InputText v-model="titleValue" id="title" required/>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <Textarea v-model="descriptionValue" id="description" :autoResize="true" required />
            </div>
            <div class="form-group">
                <label for="deadline">Deadline (optional)</label>
                <Calendar 
                    v-model="deadlineValue"
                    id="deadline" 
                    selection-mode="single" 
                    date-format="dd/mm/yy" 
                    :min-date="new Date()"
                    autocomplete="off"
                    :showIcon="true"
                    />
            </div>
            <div class="form-group">
                <label for="priority">Priority</label>
                <select v-model="priorityValue" id="priority">
                    <option :value="ETaskPriority.HIGH">High</option>
                    <option :value="ETaskPriority.MEDIUM">Medium</option>
                    <option :value="ETaskPriority.LOW">Low</option>
                </select>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click="saveTask">Save</button>
            </div>
        </Dialog>
        <div class="buttons">
            <button class="buttons_addTask" @click="handleAddTask" v-tooltip.bottom="'Add a new task'">
                <i class="fa-solid fa-plus"></i>
                Add Task
            </button>
           </div>
        <Task 
            @remove-task="removeTask"
            @complete-edit-task="completeEditTask"
        />
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection'
import Navbar from '@/components/Navbar.vue';
import Task from '@/components/Task.vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import { useToast } from "primevue/usetoast";
import ITask from '@/common/interfaces/task.interface'
import { ETaskPriority } from '@/common/enums/taskPriority.enum'
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
    completed: false,
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
    if((titleValue.value !== '' && titleValue.value !== null) && 
       (descriptionValue.value !== '' && descriptionValue.value !== null)){
        const task = {
            title : titleValue.value,
            description : descriptionValue.value,
            createdAt: new Date(),
            deadline : deadlineValue.value,
            priority : priorityValue.value,
            user: user.value?.uid,
            completed: false,
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
    else{
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please fill all the fields',
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