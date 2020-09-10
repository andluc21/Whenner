//@ts-check
import React from "react";
import "./App.css";
//Import all needed Component for this tutorial
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "../Landing/LandingPage";
import Calendar from "../Landing/CalendarPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: null,
    };
  }
  initializeGoogleSignIn() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "595886705037-j5ege0ds1g75a9jmpa1c3v5gl8ti6pcp.apps.googleusercontent.com",
        })
        .then(() => {
          // @ts-ignore
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          this.setState({ isSignedIn });

          authInstance.isSignedIn.listen((isSignedIn) => {
            this.setState({ isSignedIn });
          });
        });
    });
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
