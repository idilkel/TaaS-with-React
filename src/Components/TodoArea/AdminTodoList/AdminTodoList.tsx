import "./AdminTodoList.css";
import { useEffect, useState } from "react";
import { TodoModel } from "../../../Models/Todo";
import notify, { SccMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../TodoItem/TodoItem";
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
import { Button } from "react-bootstrap";

function AdminTodoList(): JSX.Element {
  const [tasks, setTasks] = useState<TodoModel[]>(
    store.getState().tasksReducer.tasks
  );

  console.log("todoList" + store.getState().tasksReducer.tasks);
  // console.log("time: " + store.getState().tasksReducer.tasks[0].dueDate);

  useEffect(() => {
    if (store.getState().tasksReducer.tasks.length === 0 || store.subscribe) {
      web
        .getAllTasksAdmin()
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
  }, []);

  const navigate = useNavigate();
  const usersList = () => {
    navigate("/admin/users");
  };

  return (
    <div className="AdminTodoList flex-center-col">
      <div className="flex-col-top-center">
        <h2>Todo List - Admin Page</h2>
        <Button variant="secondary" onClick={usersList}>
          Users List
        </Button>{" "}
        <div className="flex-center"></div>
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

export default AdminTodoList;
