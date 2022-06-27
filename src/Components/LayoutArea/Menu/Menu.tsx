import "./Menu.css";

function Menu(): JSX.Element {
  return (
    <div className="Menu flex-col-top-center">
      <a href="#">Home</a>
      <a href="#">Tasks</a>
      <a href="#">About</a>
      <a href="#">Donate</a>
    </div>
  );
}

export default Menu;
