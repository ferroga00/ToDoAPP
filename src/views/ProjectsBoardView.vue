<template>
  <div class="project-main">
    <Toast position="bottom-right"/>
    <Navbar />
    <Dialog class="dialog" header="Add tasks to the project" v-model:visible="display">
        <div v-for="(task, index) in documents" :key="index" class="title">
            <Checkbox v-model="added" :name="task.title" :value="task.id" @click="onChangeCheckbox(task)"/>
            {{task.title}}
        </div>
        <button @click="onClickAdd">Add</button>

    </Dialog>
    <ProjectBoard 
        :projectId="projectId"
        @add-task-project="handleAddTask"
    />
  </div>  
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection'
import getCollection from '@/composables/getCollection'
import ProjectBoard from '@/components/ProjectBoard.vue';
import Navbar from '@/components/Navbar.vue';
import ITask from '@/common/interfaces/task.interface'
import Dialog from 'primevue/dialog';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import Checkbox from 'primevue/checkbox';

const {user} = getUser();

watch(user, () => {
    if(!user.value){
        router.push({ name: 'Welcome'});
    }
});

const { addDoc, removeDoc, editDoc, error } = useCollection('projects');
const { errorGetCollection, documents } = getCollection('tasks');

const docs: any[] = [];
const projects: any[] = [];

watch(documents, (doc) => {
    doc.forEach((d: any) => {
        docs.push(d);
    });
})

const router = useRouter();
const route = useRoute();
const toast = useToast();

const display = ref(false);
const added = ref([] as string[]);
const column = ref(null);
const project = ref(null);

const handleAddTask = (col: any, proj: any) => {
    column.value = col;
    project.value = proj
    display.value = true;
}

const onChangeCheckbox = (task: any) => {
    if(!added.value.find((a:any) => a.id === task.id))
        added.value.push(task);
}

const onClickAdd = () => {
    added.value.forEach((addedId: any) => {
        docs.forEach((doc: any) => {
            if(doc.id === addedId){
                const { errorGetCollection, documents } = getCollection('projects');

                watch(documents, (doc) => {
                    doc.forEach((d: any) => {
                        projects.push(d);
                    });
                });

                projects.forEach((proj) => {
                    if(proj.id === project.value){
                        proj.tasks.push({task: doc.id, column: column.value});
                        completeEditDoc(proj);
                    }
                })
            }
        });
    });
    display.value = false;
};

const completeEditDoc = async (doc: any) => {
    await editDoc(doc);
    if(!error){
        return;
    }
}

const projectId = route.params.projectId as string;
</script>
