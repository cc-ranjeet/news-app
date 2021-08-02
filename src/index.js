import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Nav from "./components/nav";
import Post from "./components/post";

const Routing = () => {
  const onchange = (value) => {
  	console.log(value);
  }
  return(
    <Router>
    <div className="container-fluid">
    <div className="row">
      <Header onchange={(e) => { onchange(e) }}/>
    </div>
    <div className="row">
    <div className="col-sm-2 sidebar-custom">
      <Nav/>
      </div>
      <div className="col-sm-10">
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/category/:slug" component={App} />
        <Route exact path="/news-details" component={Post} />
      </Switch>
      </div>
      <Footer/>
      </div>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
