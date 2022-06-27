import moment from "moment";
import { TodoModel } from "../../../Models/Todo";
import "./TodoItem.css";

interface TodoItemProps {
  task: TodoModel;
}

function TodoItem(props: TodoItemProps): JSX.Element {
  return (
    <div className="TodoItem">
      <h2>{props.task.title}</h2>

      <div className="card">
        <img src="https://cataas.com/cat/gif" alt={props.task.title} />
        <h1>{props.task.group}</h1>
        <p className="price">{moment(props.task.when).format("DD/MM/YYYY")}</p>
        <p className="single-line-only">{props.task.description}</p>
        <p>
          <button>TBD</button>
        </p>
      </div>
    </div>
  );
}

export default TodoItem;
