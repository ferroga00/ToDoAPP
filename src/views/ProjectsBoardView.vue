<template>
  <div class="project-main">
    <Toast position="bottom-right"/>
    <Navbar />
    <Dialog class="dialog" header="Add tasks to the project" v-model:visible="display">
        <div v-for="(task, index) in documents" :key="index" class="title">
            <Checkbox v-model="added" :name="task.title" :value="task.id" @change="onChangeChexbox(task)"/>
            {{task.title}}
        </div>
        <button @click="onClickAdd">Add</button>

    </Dialog>
    <ProjectBoard 
        :projectId="projectId"
        @add-task-project="onAddTask"
        @remove-task-project="onRemoveTask"
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
const added = ref([] as any[]);
const column = ref(null);
const project = ref(null);
const projectId = route.params.projectId as string;

const onAddTask = (col: any, proj: any) => {
    column.value = col;
    project.value = proj
    display.value = true;
}

const onRemoveTask = (task: any, project: any) => {
    project.tasks.find((t: any) => {
        if(t.task === task.id){
            project.tasks.splice(project.tasks.indexOf(t), 1);
            completeEditDoc(project);
            error.value = '';
            if(error.value === ''){
                toast.add({
                    severity: 'success',
                    summary: 'Task removed successfully',
                    life: 2000,
                });
            }
        }
    });
}


const onChangeChexbox = (task: any) => {
    if(!added.value.find((a:any) => a.id === task.id))
        added.value.push(task);
    console.log(added.value);
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
                        completeEditDoc(proj).then(() => {
                            added.value = [];
                            display.value = false;
                        });
                    }
                })
            }
        });
    });
    
    

};

const completeEditDoc = async (doc: any) => {
    await editDoc(doc);
}

</script>
