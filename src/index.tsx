import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Modlogs from "./pages/modlogs";
import Tickets from "./pages/tickets";
import Home from "./pages/home";
import AuthenticationContextProvider from "./components/context/AuthContext";
import SocketProvider from "./components/context/SocketProvider";

ReactDOM.render(
    <React.StrictMode>
        <AuthenticationContextProvider>
            <SocketProvider>
                <Router>
                    <Switch>
                        <Route path="/modlogs">
                            <Modlogs />
                        </Route>
                        <Route path="/tickets">
                            <Tickets />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </SocketProvider>
        </AuthenticationContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
