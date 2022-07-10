import { Outlet } from "react-router-dom";
import About from "../../PagesArea/About/About";
import Donate from "../../PagesArea/Donate/Donate";
import Routing from "../../RoutingArea/Routing/Routing";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import Page404 from "../../RoutingArea/Page404/Page404";
import AddTodo from "../../TodoArea/AddTodo/AddTodo";
import DeleteTodo from "../../TodoArea/DeleteTodo/DeleteTodo";
import EditTodo from "../../TodoArea/EditTodo/EditTodo";
import TodoList from "../../TodoArea/TodoList/TodoList";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      {/* <TodoList /> */}
      {/* <AddTodo /> */}
      {/* <EditTodo /> */}
      {/* <DeleteTodo /> */}
      {/* <About /> */}
      {/* <Donate to={"Idil"} bank={1234} branch={12} account={123456} /> */}
      {/* <EmptyView msg={"No tasks found"} /> */}
      {/* <Page404 /> */}
      <Routing />
      <Outlet />
    </div>
  );
}

export default Main;
