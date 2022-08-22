import moment from "moment";
import { TodoModel } from "../../../Models/Todo";
import "./TodoItem.css";
import { RiDeleteBinLine, RiEdit2Line, RiFileAddLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { ClientTypes } from "../../../Models/Enums";
import { useEffect, useState } from "react";
import { UserTypeModel } from "../../../Models/UserTypeModel";
import store from "../../../Redux/Store";
import web from "../../../Services/WebApi";
import notify from "../../../Services/Notification";
import { usersDownloadedAction } from "../../../Redux/UsersAppState";

interface TodoItemProps {
  task: TodoModel;
}

// let email: string = null;
// if (localStorage.getItem("user") !== null) {
//   email = JSON.parse(localStorage.getItem("user")).email;
// }

const findUserType = () => {
  // let userType: string;
  if (localStorage.getItem("user") !== null) {
    return JSON.parse(localStorage.getItem("user")).type;
  } else {
    return null;
  }
};

function TodoItem(props: TodoItemProps): JSX.Element {
  const [users, setUsers] = useState<UserTypeModel[]>(
    store.getState().usersReducer.users
  );

  useEffect(() => {
    if (
      // userType === ClientTypes.ADMIN &&
      store.getState().usersReducer.users.length <= 1
    ) {
      console.log("user type is " + findUserType());
      console.log("type of  " + typeof findUserType());
      web
        .getAllUsers()
        .then((res) => {
          setUsers(res.data);
          // Update App State (Global State)
          store.dispatch(usersDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }
  }, []);

  const findUser = (task: TodoModel) => {
    let theUser = users[1];
    users.forEach((user) => {
      if (user.tasks?.filter((t) => t.id === task.id).length !== 0) {
        theUser = user;
        console.log(theUser);
        console.log(typeof theUser);
      }
    });
    return theUser;
  };

  return (
    <div className="TodoItem">
      {findUserType() === "ADMIN" ? (
        <>
          <h2 className="single-line-only">{findUser(props.task)?.email} </h2>
        </>
      ) : (
        <> </>
      )}
      <span className="flex-center">{props.task.caption}</span>

      <div className="card">
        {/* <img
          src="https://loremflickr.com/150/150/homework"
          alt={props.task.caption}
        /> */}
        <img src="https://i.imgur.com/H1X7kPy.jpg" alt={props.task.caption} />

        <span>{props.task.classification}</span>
        <span className="single-line-only">{props.task.info}</span>
        <span className="date">
          {moment(props.task.dueDate).format("DD/MM/YYYY hh:mm")}
          {/* {props.task.dueDate.toString()} */}
        </span>

        <div className="flex-around">
          {findUserType() === "ADMIN" ? (
            <> </>
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
