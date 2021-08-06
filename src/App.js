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
    //console.log("search", search);
    setRenders(0);    
    let payload = search;
    let params = null;
    //console.log(payload);
    
    if (localStorage.getItem("searchStored")) {
        payload = JSON.parse(localStorage.getItem("searchStored"));
    } else {
       if(JSON.parse(localStorage.getItem("user_info"))){
         let user = JSON.parse(localStorage.getItem("user_info"));
         payload.country = user.country.toLowerCase();
       }      
    }
    if (urlParameters.slug) {
        payload.sources = ''; 
      payload.category = ['regional', 'national'].includes(urlParameters.slug) ? "" : ['international'].includes(urlParameters.slug) ? "general" : urlParameters.slug;
    } 
    if(payload.language) {
        payload.country = "";
    }    
    
    params = new URLSearchParams(payload).toString();
    var options = {
      method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines?sortBy=popularity&apiKey=622058ee8fa14beeab599e6ccbd8fafc&' + params
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

  EventBus.on("country", (data) => {
    setSearch(data);
  });
  useEffect(() => {
    newsFeed();
    if (localStorage.getItem("background_color")) {
      document.body.style.backgroundColor = localStorage.getItem("background_color");
    }
  }, [search, urlParameters.slug]);

  return (
    <div>
      <Skeleton count={50} style={{ display: renders ? "none" : "block", fontSize: 20, lineHeight: 2 }} />
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