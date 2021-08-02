import React, {useState, useEffect} from "react";
import './App.css';
import {Link, useLocation, useParams} from 'react-router-dom'
import News from "./components/news";
import EventBus from 'eventing-bus';  
import NoData from "./no-data.jpg";
var axios = require("axios").default;

const Apps = props => {
  const urlParameters  = useParams();
   const [newsState, setNewsState] = useState({
    news: [
    ]
  })

   const [renders, setRenders] = useState(1);

   const [search, setSearch] = useState({
    country: '',
    q: '',
    language : 'en',
    sources: ''
  });
  const [newsCategory, setNewsCategory] = useState(props.location.pathname)
  const newsFeed = () => {
  let payload = search;
  let params = null;
  if(payload.country && payload.sources) {
    payload.sources = '';
  }
  if(!payload.country && !payload.sources) {
    payload.country = "us";    
  } 
  if(urlParameters && urlParameters.slug) {
    payload.sources = "";
    payload["category"] = urlParameters.slug; 
  } else {
    payload.category = "";
  }

  if(urlParameters && ['regional', 'national'].includes(urlParameters.slug)) {
    payload.category = "";
  } else if(urlParameters && ['international'].includes(urlParameters.slug)) {
    payload["category"] = "general" 
  }
  if(payload.language) {
    payload.country = "";
    
  }

  params = new URLSearchParams(payload).toString();
  var options = {
  method: 'GET',
  url: 'https://newsapi.org/v2/top-headlines?sortBy=popularity&apiKey=a7d3eb4693e34f67aaef7de2216aecb4&'+params  
};
axios.request(options).then(function (response) {
  if(response.data && response.data.status === "ok") {
      newsState.news = setNewsState({
      news: response.data.articles
  })
  }
  
}).catch(function (error) {
  console.error(error);
});
   }

   EventBus.on("searchNews", (data) => {
    setSearch(data);
   });
useEffect(() => {
    newsFeed()
}, [search, urlParameters.slug]);

  return ( 
        <div>  
        {newsState.news .length > 0 ?
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
  );
}

export default Apps;