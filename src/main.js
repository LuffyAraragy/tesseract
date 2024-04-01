import { createApp } from 'vue'
import App from './App.vue'

import tesseractPlugin from '@/assets/utils/tesseractPlugin.js'

createApp(App).use(tesseractPlugin).mount('#app')
