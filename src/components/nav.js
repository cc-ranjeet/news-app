import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faGlobe, faFlag, faCompass, faFilm, faBicycle, faBriefcase, faMicroscope, faFlask, faMicrochip, faNewspaper, faWrench } from '@fortawesome/free-solid-svg-icons'
import './nav.css';

const nav = (props) => {
  return (
    <nav className="navbar bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/"><FontAwesomeIcon icon={faCoffee} color="" />&nbsp; Top Headlines</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/regional"><FontAwesomeIcon icon={faCompass} color="" />&nbsp; Regional</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/national"><FontAwesomeIcon icon={faFlag} color="" />&nbsp; National</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/international"><FontAwesomeIcon icon={faGlobe} color="" />&nbsp; International</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/entertainment"><FontAwesomeIcon icon={faFilm} color="" />&nbsp; Entertainment</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/sports"><FontAwesomeIcon icon={faBicycle} color="" />&nbsp; Sports</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/business"><FontAwesomeIcon icon={faBriefcase} color="" />&nbsp; Business</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/health"><FontAwesomeIcon icon={faMicroscope} color="" />&nbsp; Health</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/science"><FontAwesomeIcon icon={faFlask} color="" />&nbsp; Science</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/technology"><FontAwesomeIcon icon={faMicrochip} color="" />&nbsp; Technology</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/category/general"><FontAwesomeIcon icon={faNewspaper} color="" />&nbsp; General</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings"><FontAwesomeIcon icon={faWrench} color="" />&nbsp; Setting</Link></li>
      </ul>

    </nav>
  );
}

export default nav;