// composables/notificationManager.ts
import { createApp, h, nextTick, ref } from 'vue'
import TMessageComponent from '~/components/ui/TMessage.vue'

interface TMessageOptions {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const messageList = ref<Array<{ id: number, height: number, app: any }>>([])
let messageId = 0

function getMarginTop(id: number): number {
  let margin = 0
  for (const massage of messageList.value) {
    if (massage.id === id)
      break
    margin += massage.height + 16
  }
  return margin
}

function updatePositions() {
  for (const massageTemp of messageList.value) {
    const marginTop = getMarginTop(massageTemp.id)
    massageTemp.app.marginTop = marginTop
  }
}

export function TMessage(options: TMessageOptions): void {
  const { message, duration = 3000 } = options
  const id = messageId++

  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    setup() {
      const marginTop = ref(0)
      return { marginTop }
    },
    mounted() {
      nextTick(() => {
        setTimeout(() => {
          const massageElement = document.querySelector('.massage-content') as HTMLElement
          if (massageElement) {
            const height = massageElement.offsetHeight
            messageList.value.push({ id, height, app: this })
            this.marginTop = getMarginTop(id)
          }

          const component = this.$refs.TMessageComponent as any
          if (component) {
            component.visible = true
          }
        }, 0)
      })
    },
    unmounted() {
      const index = messageList.value.findIndex(item => item.id === id)
      if (index > -1) {
        messageList.value.splice(index, 1)
      }
      updatePositions()
    },
    render() {
      return h(TMessageComponent, {
        ref: 'TMessageComponent',
        message,
        duration,
        marginTop: this.marginTop,
        // visible: false,
        onClose: () => {
          app.unmount()
          document.body.removeChild(container)
        },
      })
    },
  })

  app.mount(container)
  container.setAttribute('data-message-id', id.toString())
}
