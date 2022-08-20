import Circle from "../../SharedArea/Circle/Circle";
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import TodoTotal from "../../TodoArea/TodoTotal/TodoTotal";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer flex-around">
      <SocialMedia />
      <p>All rights reserved &copy; to Idil Kasuto Kelson</p>
      <TodoTotal />
    </div>
  );
}

export default Footer;
