// import "./EditTodo.css";
// import { useForm, useFormState } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { TodoModel, TodoPayLoadModel } from "../../../Models/Todo";
// import { useEffect, useState } from "react";
// import globals from "../../../Services/Globals";
// import axios from "axios";
// import notify from "../../../Services/Notification";
// import { useNavigate, useParams } from "react-router-dom";
// import web from "../../../Services/WebApi";
// import store from "../../../Redux/Store";
// import { taskUpdatedAction } from "../../../Redux/TasksAppState";

// interface EditTodoProps {}
// function EditTodo(): JSX.Element {
//   const navigate = useNavigate();
//   const params = useParams();
//   const taskId = +(params.id || 0);

//   const [id, setId] = useState<number>(taskId);
//   // Read from App State (Global State)
//   const [task, setTaks] = useState<TodoModel>(
//     store.getState().tasksReducer.tasks.filter((t) => t.id === id)[0]
//   );
//   // const [origin, setOrigin] = useState<TodoPayloadModel>({ 'caption': '', 'info': '', 'classification': '', 'dueDate': new Date() })
//   const [origin, setOrigin] = useState<TodoPayLoadModel>({
//     caption: task.caption,
//     info: task.info,
//     classification: task.classification,
//     dueDate: task.dueDate,
//   });

//   // Step 6 - Manage Your schema
//   const schema = yup.object().shape({
//     caption: yup.string().required("Caption is required"),
//     info: yup.string().required("Info is required"),
//     classification: yup.string().required("Classification is required"),
//     dueDate: yup
//       .date()
//       .min(new Date(), "Umm... past due date? come on!")
//       .default(new Date())
//       .typeError("You must specify a due date")
//       .required("due date is required")
//       .nullable()
//       .default(() => new Date()),
//   });

//   // Step 7 - Prepare the Hook
//   let defaultValuesObj = { ...origin };

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isDirty, isValid },
//   } = useForm<TodoPayLoadModel>({
//     defaultValues: defaultValuesObj,
//     mode: "all",
//     resolver: yupResolver(schema),
//   });

//   const { dirtyFields } = useFormState({ control });

//   //  Step 8 - Send to Remote as put request
//   const yalla = async (todo: TodoPayLoadModel) => {
//     web
//       .updateTask(id, todo)
//       .then((res) => {
//         notify.success("Haha new task updated!!!!!!");
//         navigate("/tasks");
//         // Update App State (Global State)
//         store.dispatch(taskUpdatedAction(res.data));
//       })
//       .catch((err) => {
//         notify.error("Oppsy : " + err.message);
//       });
//   };

//   return (
//     <div className="EditTodo flex-center-col">
//       <h1>Edit Task</h1>
//       {/* Step 9 - handleSubmit your form  */}
//       <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
//         <label htmlFor="caption">Caption</label>
//         <input
//           {...register("caption")}
//           type="text"
//           placeholder="caption"
//           id="caption"
//         />
//         <span>{errors.caption?.message}</span>
//         <label htmlFor="info">Info</label>
//         <input {...register("info")} type="text" placeholder="info" id="info" />
//         <span>{errors.info?.message}</span>
//         <label htmlFor="classification">Subject</label>
//         <input
//           {...register("classification")}
//           type="text"
//           placeholder="classification"
//           id="classification"
//         />
//         <span>{errors.classification?.message}</span>
//         <label htmlFor="dueDate">Due date</label>
//         <input
//           {...register("dueDate")}
//           type="datetime-local"
//           placeholder="dueDate"
//           id="dueDate"
//         />
//         <span>{errors.dueDate?.message}</span>
//         <button className="button-success" disabled={!isDirty}>
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditTodo;

import "./EditTodo.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TodoModel, TodoPayLoadModel } from "../../../Models/Todo";
import { useEffect, useState } from "react";
import notify from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { TasksAppState, taskUpdatedAction } from "../../../Redux/TasksAppState";

function EditTodo(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const taskId = +(params.id || 0);

  console.log("Edit - before: " + store.getState().tasksReducer.tasks); //[]

  //State with preliminary start point
  const [id, setId] = useState<number>(taskId);
  // Read from App State (Global State)
  const [task, setTask] = useState<TodoModel>(
    store.getState().tasksReducer.tasks.filter((t) => t.id === id)[0]
  );

  console.log("Hey: " + task); //undefined
  // console.log("Edit - before: " + store.getState().tasksReducer.tasks);
  // console.log("Edit - id: " + store.getState().tasksReducer.tasks[0].id);
  // console.log("Edit - id: " + store.getState().tasksReducer.tasks[0].caption);
  // console.log(store.getState().tasksReducer.tasks); //wrong task on first index of 0

  // const [origin, setOrigin] = useState<TodoPayLoadModel>({
  //   caption: "",
  //   info: "",
  //   classification: "",
  //   dueDate: new Date(),
  // });
  const [origin, setOrigin] = useState<TodoPayLoadModel>({
    caption: task.caption,
    info: task.info,
    classification: task.classification,
    dueDate: task.dueDate,
  });

  // useEffect(() => {
  //   web
  //     .getSingleTask(id)
  //     .then((res) => {
  //       setOrigin(res.data);
  //     })
  //     .catch((err) => {
  //       notify.error(err.message);
  //     });
  // }, []);

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    caption: yup
      .string()
      .default(origin.caption)
      .required("Caption is required"),
    info: yup.string().default(origin.info).required("Info is required"),
    classification: yup
      .string()
      .default(origin.classification)
      .required("Classification is required"),
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
  // let defaultValuesObj = { id: 0, title: "", description: "", group: "", when: new Date() };
  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<TodoPayLoadModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Where there any changes?
  const { dirtyFields } = useFormState({
    control,
  });

  //Step 8: On-submit:  Send to remote as put request
  const updateTask = async (todo: TodoPayLoadModel) => {
    web
      .updateTask(id, todo)
      .then((res) => {
        notify.success("Task updated");
        navigate("/tasks");
        // Update App State (Global State)
        store.dispatch(taskUpdatedAction(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/tasks");
      });
  };

  return (
    <div className="EditTodo flex-center-col">
      <h1>Update Task</h1>
      {/* Step 9: Step 9 - OnSubmit - handle onSubmit method using your method */}
      <form onSubmit={handleSubmit(updateTask)} className="flex-center-col box">
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
        <button className="button-success" disabled={!isDirty}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
