import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./TodoTotal.css";

function TodoTotal(): JSX.Element {
  const [num, setNum] = useState(store.getState().tasksReducer.tasks.length);

  useEffect(() => {
    // if (num === 0) {
    //   web
    //     .countTasks()
    //     .then((res) => {
    //       setNum(res.data);
    //       // notify.success("total : " + res.data);
    //       console.log("count : " + res.data);
    //     })
    //     .catch((err) => {
    //       notify.error(err);
    //     });
    // }
    return store.subscribe(() => {
      setNum(store.getState().tasksReducer.tasks.length);
    });
  }, [num]);

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
//         notify.error(err);
//       });
//   }, [tasks.length]);
//   return <div className="Circle">{tasks.length}</div>;
// }

export default TodoTotal;
