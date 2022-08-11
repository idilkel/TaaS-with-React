import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import MenuLink from "../../RoutingArea/MenuLink/MenuLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(
    store.getState().authReducer.user?.token?.length > 0
  );
  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    return store.subscribe(() => {
      // setIsLoggedIn(false);
      setIsLoggedIn(store.getState().authReducer.user?.token?.length > 0);
      setEmail(store.getState().authReducer.user?.email);
    });
  }, []);
  return (
    <div className="AuthMenu flex-row-gap">
      {isLoggedIn ? (
        <>
          Hello {email}
          <MenuLink to="logout">Logout</MenuLink>
          <button className="button-success" onClick={goBack}>
            Back
          </button>
        </>
      ) : (
        <>
          Hello Guest
          <MenuLink to="register">Register</MenuLink>
          <MenuLink to="login">Login</MenuLink>
          <button className="button-success" onClick={goBack}>
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
