import axios from "axios";
import { TodoModel, TodoPayLoadModel } from "../Models/Todo";
import { CredentialsModel, UserModel } from "../Models/Welcome";
import store from "../Redux/Store";
import globals from "./Globals";

class WebApi {
  private taskApi = globals.urls.tasks;
  private welcomeApi = globals.urls.welcome;

  public async addTask(task: TodoPayLoadModel): Promise<any> {
    const headers = { authorization: store.getState().authReducer.user?.token };
    return await axios.post<TodoModel>(this.taskApi, task);
  }

  public async updateTask(id: number, task: TodoPayLoadModel): Promise<any> {
    const headers = { authorization: store.getState().authReducer.user?.token };
    return await axios.put<TodoModel>(this.taskApi + id, task);
  }

  public async deleteTask(id: number): Promise<any> {
    return await axios.delete<any>(this.taskApi + id);
  }

  public async getAllTasks(): Promise<any> {
    return await axios.get<TodoModel[]>(this.taskApi);
  }

  public async getSingleTask(id: number): Promise<any> {
    return await axios.get<TodoModel>(this.taskApi + id);
  }

  public async countTasks(): Promise<any> {
    return await axios.get<number>(this.taskApi + "count");
  }

  public async register(credentials: CredentialsModel): Promise<any> {
    return await axios.post<any>(this.welcomeApi + "register", credentials);
  }

  public async login(credentials: CredentialsModel): Promise<any> {
    return await axios.post<UserModel>(this.welcomeApi + "login", credentials);
  }
}

const web = new WebApi();
export default web;
