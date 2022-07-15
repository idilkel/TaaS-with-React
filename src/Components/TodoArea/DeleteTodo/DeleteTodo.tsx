import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../Redux/Store";
import { taskDeletedAction } from "../../../Redux/TasksAppState";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteTodo.css";

function DeleteTodo(): JSX.Element {
  const params = useParams();
  const taskId = +(params.id || 0);
  const [id, setId] = useState<number>(taskId);
  const navigate = useNavigate();

  const no = () => {
    navigate("/tasks");
  };
  const yes = () => {
    web
      .deleteTask(id)
      .then((res) => {
        notify.success("Deleted successfully");
        navigate("/tasks");
        // Update App State (Global State)
        store.dispatch(taskDeletedAction(id));
      })
      .catch((err) => {
        notify.error(err.message);
        navigate("/tasks");
      });
  };

  return (
    <div className="DeleteTodo flex-center-col">
      <h1>Delete Task</h1>
      <h3>Are you sure you want to delete task#{id}?</h3>
      <div className="flex-row-gap">
        <button className="button-danger" onClick={yes}>
          Yes
        </button>
        <button className="button" onClick={no}>
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteTodo;
