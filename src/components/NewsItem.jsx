import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,date,source}=this.props;    
    return (
      <div className="my-3">
        <div className="card" >

          <div style={{display:'flex',
                       justifyContent:'flex-end',
                       position:'absolute',
                       right:'0'
          }}>
              <span className=" badge rounded-pill bg-danger" > {source} </span>
          </div>
          
            <img src={!imageUrl?"https://imgs.search.brave.com/tQukrSNthC1gcJ8f93eJdgbv58IVw_NnKkZ3X2EJ9zs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/OC80Ny9uby1pbWFn/ZS1zeW1ib2wtbWlz/c2luZy1hdmFpbGFi/bGUtaWNvbi1nYWxs/ZXJ5LXZlY3Rvci00/NzA1NDg0Ny5qcGc":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">{new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
