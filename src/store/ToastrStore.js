import { makeAutoObservable } from 'mobx';
import toastr from 'toastr';

export default class ToastrStore {
  rootStore = null;

  constructor(
    rootStore,
    optionsOverride = {
      closeButton: true,
      timeOut: 5000,
    },
  ) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    toastr.options = {
      ...optionsOverride,
    };
  }

  message = (message, title, type) => {
    toastr[type](message, title);
  };

  success = (message, title) => {
    toastr.success(message, title);
  };

  error = (message, title, err) => {
    console.log(message, title, err);
    toastr.error(message, title);
  };

  warning = (message, title, err) => {
    console.log(message, title, err);
    toastr.warning(message, title);
  };

  info = (message, title) => {
    toastr.info(message, title);
  };

  clear = () => {
    toastr.clear();
  };

  remove = () => {
    toastr.remove();
  };
}
