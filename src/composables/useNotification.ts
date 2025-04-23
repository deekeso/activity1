import { ElNotification } from 'element-plus'
import { h } from 'vue'

type ElNotificationProps = {
  messageContent: string
  duration?: number
}

export const SuccessNotification = ({ messageContent }: ElNotificationProps) => {
  ElNotification({
    message: h('p', { style: 'color: oklch(0.723 0.219 149.579)' }, messageContent),
    type: 'success',
  })
}

export const ErrorNotification = ({ messageContent }: ElNotificationProps) => {
  ElNotification({
    message: h('p', { style: 'color: oklch(0.637 0.237 25.331)' }, messageContent),
    type: 'error',
  })
}
