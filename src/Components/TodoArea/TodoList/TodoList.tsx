import { useEffect, useState } from "react";
import { TodoModel } from "../../../Models/Todo";
import notify from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import web from "../../../Services/WebApi";

function TodoList(): JSX.Element {
  const [tasks, setTasks] = useState<TodoModel[]>([]);

  useEffect(() => {
    web
      .getAllTasks()
      .then((res) => {
        notify.success("Successfully loaded tasks");
        setTasks(res.data);
      })
      .catch((err) => {
        notify.error(err.message);
      });
  }, []);
  return (
    <div className="TodoList flex-center-col">
      <h2>Todo List</h2>
      <Link className="link" to="add">
        <BsPlusSquare size={35} />
      </Link>
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
