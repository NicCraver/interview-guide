// composables/notificationManager.ts
import { createApp, h, nextTick, ref } from 'vue'
import NotificationComponent from '~/components/ui/TNotifications.vue'

interface NotificationOptions {
  title: string
  message: string
  duration?: number
}

const notifications = ref<Array<{ id: number, height: number, app: any }>>([])
let notificationId = 0

function getMarginTop(id: number): number {
  let margin = 0
  for (const notification of notifications.value) {
    if (notification.id === id)
      break
    margin += notification.height + 16
  }
  return margin
}

function updatePositions() {
  notifications.value.forEach((notification) => {
    const marginTop = getMarginTop(notification.id)
    notification.app.marginTop = marginTop
  })
}

export function TNotification(options: NotificationOptions): void {
  const { title, message, duration = 3000 } = options
  const id = notificationId++

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
          const notificationElement = document.querySelector('.notification-content') as HTMLElement
          if (notificationElement) {
            const height = notificationElement.offsetHeight
            notifications.value.push({ id, height, app: this })
            this.marginTop = getMarginTop(id)
          }

          const component = this.$refs.notificationComponent as any
          if (component) {
            component.visible = true
          }
        }, 0)
      })
    },
    unmounted() {
      const index = notifications.value.findIndex(n => n.id === id)
      if (index > -1) {
        notifications.value.splice(index, 1)
      }
      updatePositions()
    },
    render() {
      return h(NotificationComponent, {
        ref: 'notificationComponent',
        title,
        message,
        duration,
        marginTop: this.marginTop,
        // position: 'top-left',
        onClose: () => {
          app.unmount()
          document.body.removeChild(container)
        },
      })
    },
  })

  app.mount(container)
  container.setAttribute('data-notification-id', id.toString())
}
