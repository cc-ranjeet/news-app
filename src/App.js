import React, { useState, useEffect } from "react";
import './App.css';
import { Link, useLocation, useParams } from 'react-router-dom'
import News from "./components/news";
import EventBus from 'eventing-bus';
import NoData from "./no-data.jpg";
import Skeleton from 'react-loading-skeleton';
var axios = require("axios").default;

const Apps = props => {
  const urlParameters = useParams();
  const [newsState, setNewsState] = useState({
    news: [
    ]
  })

  const [renders, setRenders] = useState(0);

  const [search, setSearch] = useState({
    country: '',
    q: '',
    language: '',
    sources: ''
  });
  const [newsCategory, setNewsCategory] = useState(props.location.pathname)
  const newsFeed = () => {
    setRenders(0);
    let user = JSON.parse(localStorage.getItem("user_info"));
    let payload = search;
    let params = null;
    if (payload.country && payload.sources) {
      payload.sources = '';
    }
    if (!payload.country && !payload.sources) {
      payload.country = (user && user.country) ? user.country.toLowerCase() : "us";
    }
    if (urlParameters && urlParameters.slug) {
      payload.sources = "";
      payload["category"] = urlParameters.slug;
    } else {
      payload.category = "";
    }
    if (urlParameters && ['regional', 'national'].includes(urlParameters.slug)) {
      payload.category = "";
    } else if (urlParameters && ['international'].includes(urlParameters.slug)) {
      payload["category"] = "general"
    }
    if (payload.language) {
      payload.country = "";

    }

    params = new URLSearchParams(payload).toString();
    var options = {
      method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines?sortBy=popularity&apiKey=3260baa80697482f9dd14101776c04d9&' + params
    };
    axios.request(options).then(function (response) {
      if (response.data && response.data.status === "ok") {
        newsState.news = setNewsState({
          news: response.data.articles
        })
      } else {

      }

    }).catch(function (error) {
      console.error(error);
    }).finally(() => {
      setRenders(1);
    });
  }

  EventBus.on("searchNews", (data) => {
    setSearch(data);
  });

  EventBus.on("setSearched", (data) => {
    search.country = setSearch({
      ...search,
      country: data
    });
  });
  EventBus.on("setSearched", (data) => {
    setSearch(data);
  });
  useEffect(() => {
    newsFeed()
  }, [search, urlParameters.slug]);

  return (
    <div>
      <Skeleton count={50} style={{ display: renders ? "none" : "block", fontSize: 20, lineHeight: 2 }}  />
      <div style={{ display: renders ? "block" : "none" }}>
      {renders && newsState.news.length > 0 ?
        <div className="row">
          {newsState.news.map((value, i) => {
            return (value.author ? (<News key={i} uniqueKey={i} news={value} />) : (""))
          })}
        </div>
        :
        <div className="row">
          <center><img className="" src={NoData} alt="Logo" /></center>
        </div>
      }
      </div>
    </div>
  );
}

export default Apps;