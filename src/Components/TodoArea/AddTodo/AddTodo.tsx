import "./AddTodo.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TodoModel, TodoPayLoadModel } from "../../../Models/Todo";
import notify from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { taskAddedAction } from "../../../Redux/TasksAppState";

function AddTodo(): JSX.Element {
  const navigate = useNavigate();

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

  //Step 8: On-submit:  Send to remote as post request
  const addTask = async (todo: TodoPayLoadModel) => {
    web
      .addTask(todo)
      .then((res) => {
        notify.success("Task added successfully");
        navigate("/tasks");
        // Update App State (Global State)
        store.dispatch(taskAddedAction(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/tasks");
      });
  };

  return (
    <div className="AddTodo flex-center-col">
      <h1>Add Task</h1>
      {/* Step 9: Step 9 - OnSubmit - handle onSubmit method usign your method */}
      <form onSubmit={handleSubmit(addTask)} className="flex-center-col box">
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
        <button className="button-success" disabled={!isValid}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
