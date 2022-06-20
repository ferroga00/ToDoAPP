<template>
<div class="task">
    <Toast position="bottom-right"/>
    <div v-for="(task, index) in documents" :key="index">
        <Panel
            v-if="(!task.completed || props.showComplete)"
            class="task-panel" 
            :toggleable="true" 
            :class="task.priority === 'High' ? 'task-prio-high' : (task.priority === 'Low' ? 'task-prio-low' : 'task-prio-med') ">  
            <template #header>
                <Checkbox v-model="tasksComplete" :value="task" :name="task.title" @click="taskComplete(task)" />
                <InputText 
                    v-model="task.title"
                    class="task-body_title"
                    :disabled="disabledValue" 
                    :class="!disabledValue ? 'enabledInputText' : 'disabledInputText'"
                ></InputText>
            </template>
            <template #icons>
                <p v-if="getUser().user.value?.email?.split('@')[1] === 'todoapp.com'">
                    {{ task.user[1] }}
                </p>
                <button v-if="disabledValue" class="p-panel-header-icon p-link mr-2" v-tooltip.bottom="'Edit'" @click.prevent="editTask(task)">
                    <span class="pi pi-pencil"></span>
                </button>
                <button v-else class="p-panel-header-icon p-link mr-2" v-tooltip.bottom="'Accept'" @click.prevent="completeEditTask(task)">
                    <span class="pi pi-check"></span>
                </button>
                <button v-if="disabledValue" class="p-panel-header-icon p-link mr-2" v-tooltip.bottom="'Remove'" @click.prevent="onRemoveTask(task)">
                    <span class="pi pi-trash"></span>
                </button>
                <button v-else class="p-panel-header-icon p-link mr-2" v-tooltip.bottom="'Cancel'" @click.prevent="cancelEditTask(task)">
                    <span class="pi pi-times"></span>
                </button>
            </template>
            <div class="task-body">
                <Textarea 
                    v-model="task.description" 
                    :autoResize="true" 
                    rows="1" 
                    cols="140" 
                    :disabled="disabledValue" 
                    class="task-body_description" 
                    :class="!disabledValue ? '' : 'disabledTextArea'">
                </Textarea>
                <Calendar
                    v-model="task.deadline"
                    class="task-body_deadline"
                    date-format="dd-mm-yy"
                    :disabled="disabledValue" 
                    :min-date="new Date()"
                    autocomplete="off"
                    :showIcon="false"
                    :class="!disabledValue ? 'enabledCalendar' : 'disabledCalendar'" />

                </div>
                <ConfirmDialog />
        
            <div class="error">
                <p v-if="errorGetCollection" class="error">{{errorGetCollection}}</p>
            </div>
        </Panel>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
import Panel from 'primevue/panel';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Checkbox from 'primevue/checkbox';
import { useConfirm } from "primevue/useconfirm";
import {useToast}  from "primevue/usetoast";
import ITask from '@/common/interfaces/task.interface';

const props = defineProps({
    showComplete: 
        {
            type: Boolean,
            default: false
        },
})

const { errorGetCollection, documents } = getCollection('tasks');

let taskValue: any = {};
const disabledValue = ref(true);

const confirm = useConfirm();
const toast = useToast();

const tasksComplete: any[] = [];
const complete = ref(false);
const emit = defineEmits(['removeTask', 'completeEditTask', 'cancelEditTask', 'onCompleteTask']);

watch(documents, (doc:any) => {
    doc.forEach((task: any) => {
        if(task.completed){
            tasksComplete.push(task);
        }
    })
})

const onRemoveTask = (task: any) => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            emit('removeTask', task);
            confirm.close();
        },
        reject: () => {
           confirm.close();
        }
    });
}
const editTask = (task: any) => {
    disabledValue.value = false;
    taskValue = task;
    return;
}

const completeEditTask = (task: any) => {
    disabledValue.value = true;
    emit('completeEditTask', task)
}

const cancelEditTask = (task: any) => {
    disabledValue.value = true;
    task.description = taskValue.description;
    task.title = taskValue.title;
    task.deadline = new Date(taskValue.deadline);
}

const taskComplete = (task: ITask) => {
    tasksComplete.push(task);
    emit('onCompleteTask', task);
}

</script>

<style lang="scss"></style>
