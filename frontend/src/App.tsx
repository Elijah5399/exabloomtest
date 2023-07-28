import { useEffect, useState } from "react";
import Worksheets from "./Worksheets";
import "./App.css";
import { WSType } from "./types/types";
import profileLogo from "./images/user_profile.png";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  //worksheets is an array of objects
  const [worksheets, setWorksheets] = useState<WSType[]>([]);
  const [failedLogin, setFailedLogin] = useState<boolean>(false);

  const handleUsernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLoginCredentials({
      ...loginCredentials,
      username: event.currentTarget.value,
    });
  const handlePasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLoginCredentials({
      ...loginCredentials,
      password: event.currentTarget.value,
    });

  //checking database to see if
  const handleLoginSubmitButtonOnClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ user: loginCredentials }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.logged_in ? setIsLoggedIn(data.logged_in) : setFailedLogin(true);
        });
    } catch (e: any) {
      let message = "Unknown error";
      if (e instanceof Error) message = e.message;
      console.error(message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${process.env.REACT_APP_API_URL}/worksheets/index`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ user: loginCredentials }),
      })
        .then((response) => response.json())
        .then((data) => setWorksheets(data.worksheets));
    }
  }, [isLoggedIn, loginCredentials]);

  if (!isLoggedIn) {
    return (
      <div className="loginWrapper">
        <form className="loginForm">
          <img src={profileLogo} alt="Profile" className="profileIcon" />
          <h3 className="loginTitle">Log in</h3>
          <div className="entryFieldWrapper">
            <input
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleUsernameOnChange}
            />
          </div>
          <div className="entryFieldWrapper">
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordOnChange}
            />
          </div>
          <button
            type="button"
            onClick={handleLoginSubmitButtonOnClick}
            className="submitButton"
          >
            Submit
          </button>
          {failedLogin ? (
            <div className="failedLoginContainer">
              <p>Wrong credentials.</p>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    );
  } else {
    return <Worksheets worksheets={worksheets} />;
  }
};

export default App;
