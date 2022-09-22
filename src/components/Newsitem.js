import React, { Component } from "react";

export class Newsitem extends Component {
    
  render() {
   let  {title,description,imageurl,newsurl,author,date,source} = this.props;
    return (
      
        <div className="card my-3">
          <span class="position-absolute top-10 start-100 translate-middle badge badge-pill badge-danger">{source}</span>
          <img src={!imageurl?"https://ichef.bbci.co.uk/news/1024/branded_news/1358E/production/_126764297_gettyimages-1287615348.jpg":imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">by {author}  on  {new Date(date).toGMTString()}</small> </p>
            <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      
    );
  }
}

export default Newsitem;
