import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({ autoClose: 2000, position: toast.POSITION.TOP_RIGHT });

// add more config via the options object
const informationToast = (message, options = {}) =>
  toast.info(message, {
    ...options,
  });

const successToast = (message, options = {}) =>
  toast.success(message, {
    ...options,
  });

const warningToast = (message, options = {}) =>
  toast.warning(message, {
    ...options,
  });

const errorToast = (message, options = {}) =>
  toast.error(message, {
    ...options,
  });

const defaultToast = (message, options = {}) =>
  toast(message, {
    ...options,
  });

export {
  informationToast,
  successToast,
  warningToast,
  errorToast,
  defaultToast,
};
