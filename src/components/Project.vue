<template>
  <div class="project-main">
    <Toast position="bottom-right"/>
    <div 
      v-if="documents"
      v-for="(project, index) in documents" 
      class="project"
    >
      <div class="project_title">
        <p @click="handleClickProject(project)">{{project.title}}</p>
        <button class="p-panel-header-icon p-link mr-2" v-tooltip.bottom="'Remove'" @click.prevent="handleRemoveProject(project)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
       <div class="project_description">
        {{project.description}}
       </div>
    </div>
    <ConfirmDialog />
  </div>  
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import getCollection from '@/composables/getCollection'
import ConfirmDialog from 'primevue/confirmdialog';


const emit = defineEmits(['removeProject'])

const { errorGetCollection, documents } = getCollection('projects');
const router = useRouter();

const confirm = useConfirm();


const handleClickProject = (project: any) => {
  router.push({ name: 'Projects', params: { projectId: project.id }});
}

const handleRemoveProject = (project: any) => {
  confirm.require({
    message: 'Are you sure you want to remove this project?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      emit('removeProject', project);
      confirm.close();
    },
    reject: () => {
      confirm.close();
    }
  })
}
</script>

<style lang="scss" scoped>
</style>
