import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {App} from "./web/App";


ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById("root")
);
