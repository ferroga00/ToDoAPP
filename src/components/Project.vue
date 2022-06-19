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
      </div>
       <div class="project_description">
        {{project.description}}
       </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import getCollection from '@/composables/getCollection'

const { errorGetCollection, documents } = getCollection('projects');
const router = useRouter();

const confirm = useConfirm();


const handleClickProject = (project: any) => {
  router.push({ name: 'Projects', params: { projectId: project.id }});
}
</script>

<style lang="scss" scoped>
</style>
