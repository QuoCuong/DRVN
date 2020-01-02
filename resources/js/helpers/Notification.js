import { toast } from 'react-toastify'

const Notification = {
    success: message => {
        return toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    },
    error: message => {
        return toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}

export default Notification
