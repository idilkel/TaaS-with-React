import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { tasksClear } from "../../../Redux/TasksAppState";
import { logoutAction } from "../../../Redux/AuthAppState";
import "./Logout.css";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const yes = () => {
    store.dispatch(logoutAction());
    store.dispatch(tasksClear());
    // store.dispatch(customerCouponsClear());
    navigate("/login");
  };

  // useEffect(() => {
  //   //do with notif
  //   const res = window.confirm("Are you sure you want to log out?");
  //   if (res) {
  //     store.dispatch(logoutAction());
  //     store.dispatch(tasksClear());
  //     navigate("/login");
  //   }
  // });
  return (
    <>
      <div className="flex-center-col">
        <div className="Logout flex-center-col-wrap">
          <h1>Logout</h1>
          <h3>Are you sure you want to logout?</h3>
          <div>
            <button className="button-danger" onClick={yes}>
              Yes
            </button>
            <button className="button-success" onClick={goBack}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
