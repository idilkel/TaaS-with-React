import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import AddTodo from "../../TodoArea/AddTodo/AddTodo";
import EditTodo from "../../TodoArea/EditTodo/EditTodo";
import TodoList from "../../TodoArea/TodoList/TodoList";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      {/* <TodoList /> */}
      {/* <AddTodo /> */}
      <EditTodo />
    </div>
  );
}

export default Main;
