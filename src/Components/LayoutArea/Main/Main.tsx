import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import TodoList from "../../TodoArea/TodoList/TodoList";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      <TodoList />
    </div>
  );
}

export default Main;
