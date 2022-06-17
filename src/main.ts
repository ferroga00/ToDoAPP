import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"                           //icons
import './assets/sass/_index.scss'

import { projectAuth } from '@/firebase/config'

let app: any;

projectAuth.onAuthStateChanged(() => {
    if (!app)
        app = createApp(App)
            .use(router)
            .use(PrimeVue)
            .mount('#app')

})


