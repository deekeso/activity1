import { ElMessageBox } from 'element-plus'

type ConfirmBoxProps = {
  title: string
  messageContent: string
  callback: () => void
}

// Confirm box when deleting or updating new user.

export const ConfirmBox = ({ callback, title, messageContent }: ConfirmBoxProps) => {
  return ElMessageBox({
    title: title,
    message: messageContent,
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        setTimeout(() => {
          done()
          callback()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      } else {
        done()
      }
    },
  })
}
