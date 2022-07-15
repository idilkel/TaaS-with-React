import "./Register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CredentialsModel, RegisterModel } from "../../../Models/Welcome";
import web from "../../../Services/WebApi";
import notify from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {
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
    confirm: yup
      .string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

  const registerUser = async (model: RegisterModel) => {
    const credentials = new CredentialsModel();
    credentials.email = model.email;
    credentials.password = model.password;

    console.log("going to send to remote server..." + credentials);

    web
      .register(credentials)
      .then((res) => {
        notify.success("register successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        notify.error(err.value);
      });
  };

  return (
    <div className="Register flex-center-col">
      <h1>Register</h1>
      {/* Step 9 - handleSubmit your form  */}
      <form onSubmit={handleSubmit(registerUser)} className="flex-center-col">
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
        <label htmlFor="confirm">Confirm Password</label>
        <input
          {...register("confirm")}
          type="password"
          placeholder="confirm"
          id="confirm"
        />
        <span>{errors.confirm?.message}</span>
        <button className="button-success" disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
