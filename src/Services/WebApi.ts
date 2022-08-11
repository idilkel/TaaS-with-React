import axios from "axios";
import { date } from "yup";
import { TodoModel, TodoPayLoadModel } from "../Models/Todo";
import { CredentialsModel, UserModel } from "../Models/Welcome";
import store from "../Redux/Store";
import globals from "./Globals";
import tokenAxios from "./InterceptorAxios";

const ISODateString = (date: Date) => {
  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    " " +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds())
  );
};

class WebApi {
  private taskApi = globals.urls.tasks;
  private welcomeApi = globals.urls.welcome;
  private adminApi = globals.urls.admin;

  // public async addTask(task: TodoPayLoadModel): Promise<any> {
  //   const headers = { authorization: store.getState().authReducer.user?.token };
  //   console.log("task: " + JSON.stringify(task));
  //   console.log("headers: " + JSON.stringify(headers));
  //   console.log("url : " + JSON.stringify(this.taskApi));
  //   // console.log("Got into addTask function!!!");
  //   return await axios.post<TodoModel>(this.taskApi, task, { headers });
  // }

  // public async updateTask(id: number, task: TodoPayLoadModel): Promise<any> {
  //   const headers = { authorization: store.getState().authReducer.user?.token };
  //   return await axios.put<TodoModel>(this.taskApi + id, task, { headers });
  // }

  // public async deleteTask(id: number): Promise<any> {
  //   const headers = { authorization: store.getState().authReducer.user?.token };
  //   return await axios.delete<any>(this.taskApi + id, { headers });
  // }

  // public async getAllTasks(): Promise<any> {
  //   const headers = { authorization: store.getState().authReducer.user?.token };
  //   return await axios.get<TodoModel[]>(this.taskApi, { headers });
  // }

  // public async getSingleTask(id: number): Promise<any> {
  //   const headers = { authorization: store.getState().authReducer.user?.token };
  //   return await axios.get<TodoModel>(this.taskApi + id, { headers });
  // }

  // public async countTasks(): Promise<any> {
  //   const headers = { authorization: store.getState().authReducer.user?.token };
  //   return await axios.get<number>(this.taskApi + "count", { headers });
  // }

  public async addTask(task: TodoPayLoadModel): Promise<any> {
    console.log("Got into addTask function!!!");
    return await tokenAxios.post<TodoModel>(this.taskApi, task);
  }

  public async updateTask(id: number, task: TodoPayLoadModel): Promise<any> {
    return await tokenAxios.put<TodoModel>(this.taskApi + id, task);
  }

  public async deleteTask(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.taskApi + id);
  }

  public async getAllTasks(): Promise<any> {
    return await tokenAxios.get<TodoModel[]>(this.taskApi);
  }

  public async getSingleTask(id: number): Promise<any> {
    return await tokenAxios.get<TodoModel>(this.taskApi + id);
  }

  public async getTasksAscending(): Promise<any> {
    return await tokenAxios.get<TodoModel>(this.taskApi + "asc");
  }

  public async getTasksDescending(): Promise<any> {
    return await tokenAxios.get<TodoModel>(this.taskApi + "desc");
  }

  public async getTasksBetween(start: Date, end: Date): Promise<any> {
    const startString = ISODateString(start);
    const endString = ISODateString(end);
    return await tokenAxios.get<TodoModel>(
      this.taskApi +
        "between?startDate=" +
        startString +
        "&endDate=" +
        endString
    );
  }

  public async getAllTasksAdmin(): Promise<any> {
    return await tokenAxios.get<TodoModel[]>(this.adminApi + "tasks");
  }

  // public async countTasks(): Promise<any> {
  //   console.log(this.taskApi + "count");
  //   return await tokenAxios.get<number>(this.taskApi + "count");
  // }

  public async register(credentials: CredentialsModel): Promise<any> {
    return await axios.post<any>(this.welcomeApi + "register", credentials);
  }

  public async login(credentials: CredentialsModel): Promise<any> {
    return await axios.post<UserModel>(this.welcomeApi + "login", credentials);
  }
}

const web = new WebApi();
export default web;
