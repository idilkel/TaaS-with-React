import "./AddTodo.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TodoModel, TodoPayLoadModel } from "../../../Models/Todo";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";

function AddTodo(): JSX.Element {
  //Step 6: Validation Schema
  const schema = yup.object().shape({
    caption: yup.string().required("Caption is required"),
    info: yup.string().required("Info is required"),
    classification: yup.string().required("Classification is required"),
    dueDate: yup
      .date()
      .min(new Date(), "Can't assign a past date")
      .default(new Date())
      .typeError("You must specify a due date")
      .required("Due date is required")
      .nullable()
      .default(() => new Date()),
  });

  //Step 7: React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TodoPayLoadModel>({ mode: "all", resolver: yupResolver(schema) });

  //Step 8: On-submit:  Send o remote as post request
  const addTask = async (todo: TodoPayLoadModel) => {
    axios
      .post<any>(globals.urls.tasks, todo)
      .then((res) => {
        notify.success("Task submitted");
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

  return (
    <div className="AddTodo flex-center-col">
      <h1>Add Task</h1>
      {/* Step 9: Step 9 - OnSubmit - handle onSubmit method usign your method */}
      <form onSubmit={handleSubmit(addTask)} className="flex-center-col">
        {/* Step 10: {...register("caption")}     &    {errors.caption?.message} */}
        <label htmlFor="caption">Caption</label>
        <input
          {...register("caption")}
          type="text"
          placeholder="caption"
          id="caption"
        />
        <span>{errors.caption?.message}</span>
        <label htmlFor="info">Info</label>
        <input {...register("info")} type="text" placeholder="info" id="info" />
        <span>{errors.info?.message}</span>
        <label htmlFor="classification">Classification</label>
        <input
          {...register("classification")}
          type="text"
          placeholder="classification"
          id="classification"
        />
        <span>{errors.classification?.message}</span>
        <label htmlFor="dueDate">Due date</label>
        <input
          {...register("dueDate")}
          type="datetime-local"
          placeholder="dueDate"
          id="dueDate"
        />
        <span>{errors.dueDate?.message}</span>
        <button disabled={!isValid}>Add</button>
      </form>
    </div>
  );
}

export default AddTodo;
