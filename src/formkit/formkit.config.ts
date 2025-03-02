import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import UserSelect from '@/components/Users/UserSelect.vue'

export default defaultConfig({
  config: {
    rootClasses,
  },
  inputs: {
        userSelect: {
            type: 'input',
            component: UserSelect,
            props: ['label'],
        },
    },
})
