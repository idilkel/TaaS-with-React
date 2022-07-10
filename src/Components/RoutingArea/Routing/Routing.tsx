import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import Main from "../../LayoutArea/Main/Main";
import About from "../../PagesArea/About/About";
import Donate from "../../PagesArea/Donate/Donate";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../Page404/Page404";
import AddTodo from "../../TodoArea/AddTodo/AddTodo";
import DeleteTodo from "../../TodoArea/DeleteTodo/DeleteTodo";
import EditTodo from "../../TodoArea/EditTodo/EditTodo";
import TodoList from "../../TodoArea/TodoList/TodoList";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/tasks" element={<TodoList />} />
        <Route path="/tasks/add" element={<AddTodo />} />
        <Route path="/tasks/delete/:id" element={<DeleteTodo />} />
        <Route path="/tasks/update/:id" element={<EditTodo />} />
        <Route path="/about" element={<About />} />
        <Route
          path="donate"
          element={
            <Donate to={"Idil"} bank={12} branch={1234} account={1234567} />
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
