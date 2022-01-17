import { createApp } from 'vue'
import App from './App.vue'
import VueStripeMenu from '../../src'
import './styles/index.scss'

const app = createApp(App)

app.use(VueStripeMenu)
app.mount('#app')
