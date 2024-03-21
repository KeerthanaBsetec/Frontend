import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function errortoaster(message) {
    toast.error(`${message}`, {
        position: "top-center",
        hideProgressBar: true,
        closeButton: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export function successtoaster(message) {
    toast.success(`${message}`, {
        position: "top-center",
        hideProgressBar: true,
        closeButton: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export function infotoaster(message) {
    toast.info(`${message}`, {
        position: "top-center",
        hideProgressBar: true,
        closeButton: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}