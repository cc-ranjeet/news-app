import React from "react";
import { Link } from 'react-router-dom'
const News = (props) => {
  const showNews = () => {
    console.log(props);
  }
  return (
    <div className="col-sm-4 mb-5 mt-2 mr-5">
      <div className="card" >
        <img src={props.news.urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.news.title}</h5>
          <p className="card-text">{props.news.description ? props.news.description.substring(0, 100) : ""}...</p>
          <Link className="btn btn-primary" to={
            {
              pathname: "/news-details/",
              post: props.news
            }
          }>view</Link>
        </div>
      </div>
    </div>
  );
}

export default News;