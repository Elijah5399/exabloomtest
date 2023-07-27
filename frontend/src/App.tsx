import { Fragment, useEffect, useState } from "react";
import Worksheets from "./Worksheets";
import "./App.css";
import { WSType } from "./types/types";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  //worksheets is an array of objects
  const [worksheets, setWorksheets] = useState<WSType[]>([]);

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
        .then((data) => setIsLoggedIn(data.logged_in));
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

  if (!isLoggedIn)
    return (
      <Fragment>
        <form>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Type username here"
            onChange={handleUsernameOnChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Type password here"
            onChange={handlePasswordOnChange}
          />
          <button type="button" onClick={handleLoginSubmitButtonOnClick}>
            Submit
          </button>
        </form>
      </Fragment>
    );
  else return <Worksheets worksheets={worksheets} />;
};

export default App;
