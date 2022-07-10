import axios from "axios";
import { TodoModel, TodoPayLoadModel } from "../Models/Todo";
import globals from "./Globals";

class WebApi {
  private url = globals.urls.tasks;

  public async addTask(task: TodoPayLoadModel): Promise<any> {
    return await axios.post<TodoPayLoadModel>(this.url, task);
  }

  public async updateTask(id: number, task: TodoPayLoadModel): Promise<any> {
    return await axios.put<any>(this.url + id, task);
  }

  public async deleteTask(id: number): Promise<any> {
    return await axios.delete<any>(this.url + id);
  }

  public async getAllTasks(): Promise<any> {
    return await axios.get<TodoModel[]>(this.url);
  }

  public async getSingleTask(id: number): Promise<any> {
    return await axios.get<TodoModel>(this.url + id);
  }

  public async countTasks(): Promise<any> {
    return await axios.get<number>(this.url + "count");
  }
}
const web = new WebApi();
export default web;
