import "./EditTodo.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TodoModel, TodoPayLoadModel } from "../../../Models/Todo";
import { useEffect, useState } from "react";
import notify from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import web from "../../../Services/WebApi";

function EditTodo(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const taskId = +(params.id || 0);

  //State with preliminary start point
  const [id, setId] = useState<number>(taskId);
  const [origin, setOrigin] = useState<TodoPayLoadModel>({
    caption: "",
    info: "",
    classification: "",
    dueDate: new Date(),
  });

  useEffect(() => {
    web
      .getSingleTask(id)
      .then((res) => {
        setOrigin(res.data);
      })
      .catch((err) => {
        notify.error(err.message);
      });
  }, []);

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
      <form onSubmit={handleSubmit(updateTask)} className="flex-center-col">
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
