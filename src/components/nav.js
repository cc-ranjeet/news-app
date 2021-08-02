import React from 'react';
import {Link} from 'react-router-dom'
import './nav.css';

const nav = (props) => {
	return (
<nav className="navbar bg-light">
  <ul className="navbar-nav">
  <li className="nav-item">
    <Link className="nav-link" to="/">Top Headlines</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/regional">Regional</Link></li>
    <li className="nav-item">
      <Link className="nav-link" to="/category/national">National</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/international">International</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/entertainment">Entertainment</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/sports">Sports</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/business">Business</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/health">Health</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/science">Science</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/technology">Technology</Link></li>
    <li className="nav-item">
    <Link className="nav-link" to="/category/general">General</Link></li>
  </ul>

</nav>
	);
}

export default nav;