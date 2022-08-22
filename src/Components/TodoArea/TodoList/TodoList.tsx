import { useEffect, useState } from "react";
import { TodoModel } from "../../../Models/Todo";
import notify, { SccMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import { BsPlusSquare } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { tasksDownloadedAction } from "../../../Redux/TasksAppState";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatesBetweenModel } from "../../../Models/DatesBetween";

function TodoList(): JSX.Element {
  const [tasks, setTasks] = useState<TodoModel[]>(
    store.getState().tasksReducer.tasks
  );

  let userType: string;
  if (localStorage.getItem("user") !== null) {
    userType = JSON.parse(localStorage.getItem("user")).type;
  } else {
    userType = null;
  }

  console.log("todoList" + store.getState().tasksReducer.tasks);
  // console.log("time: " + store.getState().tasksReducer.tasks[0].dueDate);

  useEffect(() => {
    if (store.getState().tasksReducer.tasks.length === 0 || store.subscribe) {
      web
        .getAllTasks()
        .then((res) => {
          notify.success(SccMsg.ALL_TASKS);
          // Update Component State (Local state)
          setTasks(res.data);
          // Update App State (Global State)
          store.dispatch(tasksDownloadedAction(res.data));
          console.log("list after dispatch: " + tasks); //why empty after refresh
          console.log("todoList" + store.getState().tasksReducer.tasks);
          console.log(store.getState().tasksReducer.tasks);
        })
        .catch((err) => {
          notify.error(err);
        });
    }
    //Didn't help
    // return store.subscribe(() => {
    //   setTasks(store.getState().tasksReducer.tasks); // Will let us notify
    // });
  }, []);

  const navigate = useNavigate();

  const ascending = () => {
    web
      .getTasksAscending()
      .then((res) => {
        notify.success(SccMsg.ALL_TASKS);
        // Update Component State (Local state)
        setTasks(res.data);
        // Update App State (Global State)
        store.dispatch(tasksDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  const descending = () => {
    web
      .getTasksDescending()
      .then((res) => {
        notify.success(SccMsg.ALL_TASKS);
        // Update Component State (Local state)
        setTasks(res.data);
        // Update App State (Global State)
        store.dispatch(tasksDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  const [datesBetween, setDatesBetween] = useState<DatesBetweenModel>();

  //Step 6: Validation Schema
  const schema = yup.object().shape({
    start: yup
      .date()
      .default(new Date())
      .typeError("You must specify a due date")
      .required("Due date is required")
      .nullable()
      .default(() => new Date()),
    end: yup
      .date()
      .min(yup.ref("start"), "Can't assign end date before start date")
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
  } = useForm<DatesBetweenModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  //Step 8: On-submit:  Send to remote as post request
  const getTasksBetween = async (datesBetween: DatesBetweenModel) => {
    const date1 = datesBetween.start;
    const date2 = datesBetween.end;
    console.log("start date: " + date1 + "end date: " + date2);
    web
      .getTasksBetween(date1, date2)
      .then((res) => {
        notify.success(SccMsg.ALL_TASKS);
        // Update Component State (Local state)
        setTasks(res.data);
        // Update App State (Global State)
        store.dispatch(tasksDownloadedAction(res.data));
        console.log("tasks between: " + res.data);
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  return (
    <div className="TodoList flex-center-col">
      <div className="flex-col-top-center">
        <h2>Todo List</h2>
        {/* <Link className="link" to="add">
        <BsPlusSquare size={35} />
      </Link> */}
        <div className="flex-center">
          <div className="flex-row-gap">
            <span>
              <CustomLink to="add">
                <BsPlusSquare size={35} />
              </CustomLink>
            </span>
            <button className="button-success" onClick={ascending}>
              Asc. time
            </button>

            <button className="button-success" onClick={descending}>
              Desc. time
            </button>
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit(getTasksBetween)}
              className="flex-center-col"
            >
              <label htmlFor="start">Start date</label>
              <input
                {...register("start")}
                type="datetime-local"
                placeholder="Start Date"
                id="startDate"
              />
              <span>{errors.start?.message}</span>
              <label htmlFor="end">End date</label>
              <input
                {...register("end")}
                type="datetime-local"
                placeholder="End Date"
                id="end"
              />
              <span>{errors.end?.message}</span>
              <button
                className="button-success form-button"
                type="submit"
                disabled={!isValid}
              >
                Filter
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        {/* {tasks.map((t) => (<p key={t.id}>{t.title}</p>))} */}
        <div className="flex-row-none-wrap-list">
          {/* {tasks.map((t) => (<TodoItem key={t.id} task={t} />))} */}
          {tasks.length > 0 ? (
            tasks.map((t) => <TodoItem key={t.id} task={t} />)
          ) : (
            <EmptyView msg={"No tasks on the list"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
