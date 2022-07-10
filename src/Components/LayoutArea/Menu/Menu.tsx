import { Link } from "react-router-dom";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./Menu.css";
import { AiOutlineHome } from "react-icons/ai";

function Menu(): JSX.Element {
  return (
    <div className="Menu flex-col-top-center">
      <span className="icon">
        <CustomLink to="/home">
          <AiOutlineHome size={50} />
        </CustomLink>
      </span>
      <CustomLink to="/tasks">Tasks</CustomLink>
      <CustomLink to="/about">About</CustomLink>
      <CustomLink to="/donate">Donate</CustomLink>
      {/* <Link to="/home">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/about">About</Link>
      <Link to="/donate">Donate</Link> */}
      {/* <a href="/home">Home</a>
      <a href="/tasks">Tasks</a>
      <a href="/about">About</a>
      <a href="/donate">Donate</a> */}
    </div>
  );
}

export default Menu;
