<template>
  <div class="projectBoard-main">
    <Toast position="bottom-right"/>
    <div 
      v-for="col in EColumn"
      class="drop-zone"
      @drop="onDrop($event, col)"
      @dragenter.prevent
      @dragover.prevent
     >
     <div class="column-title_area">
      <p class="column-title">{{col}}</p>
        <div class="column-options">
          <i class="fa-solid fa-plus" @click="handleTaskProject(col, props.projectId)"></i>
        </div>
      </div>

    <div 
      v-for="item in getList(col).value" 
      :key="item" 
      class="drag-el column-body_area"
      draggable="true"
      @dragstart="startDrag($event, item)"
    >
      {{ item.title }}
      <i class="fa-solid fa-trash" @click="handleRemoveTasks(item)"></i>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import { ref, watch } from 'vue';
import { EColumn } from '@/common/enums/columns.enum';
import useCollection from '@/composables/useCollection'
import getCollection from '@/composables/getCollection'

const { addDoc, removeDoc, editDoc, error } = useCollection('projects');


const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
});

const { errorGetCollection, documents } = getCollection('projects');
const projects = ref([] as any[]);

const taskList: any[] = [];

watch(documents, (doc) => {
    doc.forEach((d: any) => {
        projects.value.push(d);
    });
})

const docs = getCollection('tasks').documents;
watch(docs, (doc) => {
  doc.forEach((d: any) => {
    taskList.push(d);
  });
});

const confirm = useConfirm();

const tasks = ref([] as any[]);

const getList = (col: any) => {
  tasks.value = [];
  projects.value.forEach((proj) => {
    proj = JSON.parse(JSON.stringify(proj))
      if(proj.id === props.projectId)
        proj.tasks.forEach((projectTask: any) => {
          if(projectTask.column === col){
              taskList.forEach((task) => {
              if(task.id === projectTask.task){
                tasks.value.push(task);
              }
            })
        }
      })
    })
  return tasks;
}

const startDrag = (event: any, item: any) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowd = 'move';
  event.dataTransfer.setData('itemID', item.id);
}

const onDrop = (event: any, col: any) => {
  const itemID = event.dataTransfer.getData('itemID');
  const item = taskList.find((item: any) => item.id == itemID);
  projects.value.forEach((proj) => {
    proj = JSON.parse(JSON.stringify(proj))
    proj.tasks.forEach((task:any) => {
      if(task.task === item.id){
        task.column = col;
        completeEditDoc(proj);
      }
    })
  });
  item.column = col;
}

const completeEditDoc = async (doc: any) => {
    await editDoc(doc);
}

const handleRemoveTasks = (task:any) => {
  projects.value.forEach((proj) => {
    proj = JSON.parse(JSON.stringify(proj))
      if(proj.id === props.projectId)
        emit('removeTaskProject', task, proj);
  });
};


const handleTaskProject = (col: any, proj:any) => {
  emit('addTaskProject', col, proj);
};

const emit = defineEmits([
  'addTaskProject', 'removeTaskProject'
])

</script>