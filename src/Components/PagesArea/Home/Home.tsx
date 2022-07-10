import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home flex-center-col">
      <h1>Tasks System</h1>
      <img
        className="shadow"
        src="https://media.giphy.com/media/Nx85vtTY70T3W/giphy.gif"
        alt="TaaS"
      />
      {/* <iframe
        className="shadow noHover"
        src="https://giphy.com/embed/10zsjaH4g0GgmY"
        width="480"
        height="345"
        frameBorder="0"
        allowFullScreen
      ></iframe> */}
    </div>
  );
}

export default Home;
