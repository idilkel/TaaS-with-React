import { useEffect, useState } from "react";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./TodoTotal.css";

function TodoTotal(): JSX.Element {
  const [num, setNum] = useState(0);

  useEffect(() => {
    web
      .countTasks()
      .then((res) => {
        setNum(res.data);
      })
      .catch((err) => {
        notify.error(err.message);
      });
  }, []);
  return (
    <div className="TodoTotal">
      <Circle num={num} />
    </div>
  );
}

// function Circle(): JSX.Element {
//   const [tasks, setTasks] = useState<TodoModel[]>([]);

//   useEffect(() => {
//     axios
//       .get<TodoModel[]>(globals.urls.tasks)
//       .then((res) => {
//         setTasks(res.data);
//       })
//       .catch((err) => {
//         notify.error(err.message);
//       });
//   }, [tasks.length]);
//   return <div className="Circle">{tasks.length}</div>;
// }

export default TodoTotal;
