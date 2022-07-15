import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(
    store.getState().authReducer.user?.token?.length > 0
  );
  const [email, setEmail] = useState(store.getState().authReducer.user?.email);

  useEffect(() => {
    return store.subscribe(() => {
      // setIsLoggedIn(false);
      setIsLoggedIn(store.getState().authReducer.user?.token?.length > 0);
      setEmail(store.getState().authReducer.user?.email);
    });
  }, []);
  return (
    <div className="AuthMenu">
      {isLoggedIn ? (
        <>
          Hello {email}{" "}
          <Link className="link" to="logout">
            Logout
          </Link>
        </>
      ) : (
        <>
          Hello Guest{" "}
          <Link className="link" to="register">
            Register
          </Link>{" "}
          <Link className="link" to="login">
            Login
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
