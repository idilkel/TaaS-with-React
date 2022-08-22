import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CredentialsModel, LoginModel } from "../../../Models/Welcome";
import { useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/AuthAppState";
import { ClientTypes } from "../../../Models/Enums";
// import Button from "react-bootstrap/Button";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email pattern")
      .required("Email is required"),
    password: yup
      .string()
      .min(3, "at least 3 characters required")
      .max(8, "at most 8 characters required")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

  const loginUser = async (model: LoginModel) => {
    const credentials = new CredentialsModel();
    credentials.email = model.email;
    credentials.password = model.password;
    credentials.type = ClientTypes.USER;
    console.log("going to send to remote server..." + credentials);

    web
      .login(credentials)
      .then((res) => {
        notify.success(SccMsg.LOGIN);
        store.dispatch(loginAction(res.data));
        if (credentials.type === ClientTypes.ADMIN) {
          navigate("/admin");
        } else {
          navigate("/tasks");
        }
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  return (
    <div className="Login flex-center-col">
      <h1>User Login</h1>
      {/* Step 9 - handleSubmit your form  */}
      <form onSubmit={handleSubmit(loginUser)} className="flex-center-col">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          id="email"
        />
        <span>{errors.email?.message}</span>
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          id="password"
        />
        <span>{errors.password?.message}</span>

        <button className="button-success" disabled={!isValid}>
          Login
        </button>
        {/* <Button disabled={!isValid} variant="success">
          Login
        </Button>{" "} */}
      </form>
    </div>
  );
}

export default Login;

// function loginAction(data: any): any {
//   throw new Error("Function not implemented.");
// }
