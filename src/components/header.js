import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import EventBus from 'eventing-bus';

import logo from '../logo.png';
import header from './header.css';

var axios = require("axios").default;

const Header = (props) => {
  const [searchData, setSearchData] = useState({
    country: '',
    q: '',
    language: '',
    sources: ''
  });
  const [getUserLocation, setUserLocation] = useState();
  const handleChange = event => {
    EventBus.publish("searchNews", searchData);
  }

  const filter = event => {
    EventBus.publish("setSearched", { ...searchData, [event.target.name]: event.target.value });
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value
    })

  }
  useEffect(() => {
    var options = {
      method: 'GET',
      url: 'https://ipinfo.io?token=f525f67c6de7c8'
    };
    axios.request(options).then(function (response) {
      if (response.data) {
        localStorage.setItem("user_info", JSON.stringify(response.data));
        EventBus.publish("country", response.data.country.toLowerCase());
        searchData.country = setSearchData({
          country: searchData.country ? searchData.country : response.data.country.toLowerCase()
        });
      }

    }).catch(function (error) {
      console.error(error);
    });

  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="row">
        <div className="col-sm-2">
          <Link className="navbar-brand" to="/"><img className="log-width" src={logo} alt="Logo" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="col-sm-10">

          <div className="float-end" id="navbarSupportedContent">
            <form className="d-flex">
              <select className="form-select form-control me-2" aria-label="Default select example" name="country" value={searchData.country} onChange={filter}>
                <option value="">Select Country</option>
                <option value="in">India</option>
                <option value="us">Uited State</option>
                <option value="es">Span</option>
                <option value="fr">France</option>
                <option value="he">Hebrew</option>
                <option value="it">Itly</option>
                <option value="nl">Dutch</option>
                <option value="pt">Portugal</option>
                <option value="ru">Russia</option>
                <option value="zh">China</option>
                <option value="ar">UAE</option>
              </select>
              <select className="form-select form-control me-2" aria-label="Default select example" name="language" value={searchData.language} onChange={filter}>
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="he">Hebrew</option>
                <option value="it">Italian</option>
                <option value="nl">Dutch</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="zh">Chinese</option>
                <option value="ar">Arabic</option>
              </select>
              <select className="form-select form-control me-2" aria-label="Default select example" name="sources" value={searchData.sources} onChange={filter}>
                <option value="">Select News Source</option>
                <option value="cnn">CNN News</option>
                <option value="bbc-news">BBC News</option>
                <option value="fox-news">Fox News</option>
                <option value="nbc-news">NBC News</option>
                <option value="the-times-of-india">The Time of India</option>
              </select>
              <input className="form-control me-2" type="search" name="q" placeholder="Search" aria-label="Search" onChange={filter} />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

