import { useEffect, useState } from "react";
import { TodoModel } from "../../../Models/Todo";
import notify from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { tasksDownloadedAction } from "../../../Redux/TasksAppState";

function TodoList(): JSX.Element {
  const [tasks, setTasks] = useState<TodoModel[]>(
    store.getState().tasksReducer.tasks
  );
  // Didn't help
  // useEffect(() => {
  //   return store.subscribe(() => {
  //     setTasks(store.getState().tasksReducer.tasks);
  //   });
  // }, [tasks]);

  console.log("todoList" + store.getState().tasksReducer.tasks);
  // console.log("time: " + store.getState().tasksReducer.tasks[0].dueDate);

  useEffect(() => {
    if (store.getState().tasksReducer.tasks.length === 0 || store.subscribe) {
      web
        .getAllTasks()
        .then((res) => {
          notify.success("Successfully loaded tasks");
          // Update Component State (Local state)
          setTasks(res.data);
          // Update App State (Global State)
          store.dispatch(tasksDownloadedAction(res.data));
          console.log("list after dispatch: " + tasks); //why empty after refresh
          console.log("todoList" + store.getState().tasksReducer.tasks);
          console.log(store.getState().tasksReducer.tasks);
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
    //Didn't help
    // return store.subscribe(() => {
    //   setTasks(store.getState().tasksReducer.tasks); // Will let us notify
    // });
  }, []);

  // Didn't help
  // useEffect(() => {
  //   return store.subscribe(() => {
  //     web
  //       .getAllTasks()
  //       .then((res) => {
  //         notify.success("Successfully loaded tasks");
  //         // Update Component State (Local state)
  //         setTasks(res.data);
  //         // Update App State (Global State)
  //         store.dispatch(tasksDownloadedAction(tasks));
  //       })
  //       .catch((err) => {
  //         notify.error(err.message);
  //       });
  //   });
  // }, [tasks]);

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
