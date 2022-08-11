import { Notyf } from "notyf";

export enum SccMsg {
  ALL_TASKS = "got all tasks successfully",
  SINGLE_TASK = "got single task successfully",
  DELETE_TASK = "deleted task successfully",
  UPDATE_TASK = "updated task successfully",
  ADD_TASK = "added task successfully",
  REGISTER = "registered successfully",
  LOGIN = "login successfully",
}

class Notify {
  private notification = new Notyf({
    duration: 4000,
    position: { x: "left", y: "top" },
  });

  public success(message: SccMsg) {
    this.notification.success(message);
  }

  public error(message: string) {
    // this.notification.error(message);
    this.notification.error(this.extractMsg(message));
  }

  private extractMsg(err: any): string {
    if (typeof err === "string") {
      return err;
    }

    if (typeof err?.response?.data === "string") {
      //Backend exact error
      return err.response.data;
    }

    if (Array.isArray(err?.response?.data)) {
      // Backend exact error list
      return err?.response?.data[0];
    }

    // Must be last
    if (typeof err?.message === "string") {
      return err.message;
    }

    return "an error occurred, please try again.";
  }
}

const notify = new Notify();
export default notify;
