import moment from "moment";
import { TodoModel } from "../../../Models/Todo";
import "./TodoItem.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";

interface TodoItemProps {
  task: TodoModel;
}

let email: string = null;
if (localStorage.getItem("user") !== null) {
  email = JSON.parse(localStorage.getItem("user")).email;
}

function TodoItem(props: TodoItemProps): JSX.Element {
  return (
    <div className="TodoItem">
      <h2 className="single-line-only">{props.task.caption}</h2>

      <div className="card">
        <img
          src="https://loremflickr.com/150/150/homework"
          alt={props.task.caption}
        />
        <span>{props.task.classification}</span>
        <span className="single-line-only">{props.task.info}</span>
        <span className="date">
          {moment(props.task.dueDate).format("DD/MM/YYYY hh:mm")}
          {/* {props.task.dueDate.toString()} */}
        </span>

        <div className="flex-around">
          {/* <button>
            <RiFileAddLine />
          </button>
          <button>
            <RiEdit2Line />
          </button>
          <button>
            <RiDeleteBinLine />
          </button> */}
          {/* <Link to="/tasks/add">
            <RiFileAddLine />
          </Link> */}
          {/* <Link className="link" to={`/tasks/update/${props.task.id}`}>
            <RiEdit2Line size={30} />
          </Link>
          <Link className="link" to={`/tasks/delete/${props.task.id}`}>
            <RiDeleteBinLine size={30} />
          </Link> */}
          {email === "admin@admin.com" ? (
            <></>
          ) : (
            <>
              <CustomLink to={`/tasks/update/${props.task.id}`}>
                <RiEdit2Line size={30} />
              </CustomLink>
              <CustomLink to={`/tasks/delete/${props.task.id}`}>
                <RiDeleteBinLine size={30} />
              </CustomLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
