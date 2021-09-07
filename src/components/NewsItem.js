import React from 'react'

const NewsItem = (props) => {
        let {title, description, imageUrl, newsUrl, author, date, source, mode} = props;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem", backgroundColor: props.mode==='dark'?'#101112':'white', color: props.mode !== "light" ? "#101112" : "white",}}>
                <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-primary`} style={{left:'50%', zIndex: '1'}}>{source}</span>
                    <img src={!imageUrl?"https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body" style={{backgroundColor: props.mode==='dark'?'#101112':'white', color: props.mode !== "light" ? "#101112" : "white",}}>
                        <h5 className="card-title">
                            {title}...
                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-outline-primary rounded-pill">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
