import axios from "axios";
import { useEffect, useState } from "react";
import { TodoModel } from "../../../Models/Todo";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./Circle.css";

function Circle(): JSX.Element {
  const [tasks, setTasks] = useState<TodoModel[]>([]);

  useEffect(() => {
    axios
      .get<TodoModel[]>(globals.urls.tasks)
      .then((res) => {
        notify.success("Successfully loaded tasks");
        setTasks(res.data);
      })
      .catch((err) => {
        notify.error(err.message);
      });
  }, []);
  return <div className="Circle">{tasks.length}</div>;
}

export default Circle;
