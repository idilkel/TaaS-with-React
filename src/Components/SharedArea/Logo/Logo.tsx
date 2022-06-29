import "./Logo.css";
import src from "../../../Assets/Images/todo_logo.svg";

function Logo(): JSX.Element {
  return (
    <div className="Logo">
      <img src={src} alt="logo" />
    </div>
  );
}

export default Logo;
