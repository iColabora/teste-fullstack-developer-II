import {toast} from 'react-toastify';

export default function alert (message) {
    switch(message.type){
        case "info":
            toast.info(message.content);
        break;
        case "success":
            toast.success(message.content);
        break;
        case "warning":
            toast.warning(message.content);
        break;
        case "error":
        case "danger":
            toast.error(message.content);
        break;
        case "error_log":
        case "log":
            console.log(message.content);
        break;
    }
}