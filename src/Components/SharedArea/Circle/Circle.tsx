import axios from "axios";
import { useEffect, useState } from "react";
import { TodoModel } from "../../../Models/Todo";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./Circle.css";

interface CircleProps {
  num: number;
}

function Circle(props: CircleProps): JSX.Element {
  const [num, setNum] = useState<number>(props.num);

  return <div className="Circle">{num}</div>;
}

export default Circle;
