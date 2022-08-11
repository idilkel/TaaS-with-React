import { Link, useLocation } from "react-router-dom";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./Menu.css";
import { AiOutlineHome } from "react-icons/ai";
import MenuLink from "../../RoutingArea/MenuLink/MenuLink";

function Menu(): JSX.Element {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  let email: string = null;
  if (localStorage.getItem("user") !== null) {
    email = JSON.parse(localStorage.getItem("user")).email;
  }
  return (
    <div className="Menu flex-col-top-center">
      <span className="icon">
        <MenuLink to="home">
          <div className={isRoot ? "active" : ""}>
            <AiOutlineHome size={50} />
          </div>
        </MenuLink>
        {/* <MenuLink to="/home">
          <AiOutlineHome size={50} />
        </MenuLink> */}
      </span>
      {email === "admin@admin.com" ? (
        <>
          <MenuLink to="/admin">Tasks</MenuLink>
        </>
      ) : (
        <>
          <MenuLink to="/tasks">Tasks</MenuLink>
        </>
      )}

      <MenuLink to="/about">About</MenuLink>
      <MenuLink to="/donate">Donate</MenuLink>
      {/* <span className="icon">
        <CustomLink to="/home">
          <AiOutlineHome size={50} />
        </CustomLink>
      </span>
      <CustomLink to="/tasks">Tasks</CustomLink>
      <CustomLink to="/about">About</CustomLink>
      <CustomLink to="/donate">Donate</CustomLink> */}
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
