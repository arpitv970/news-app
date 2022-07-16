import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }      

    const updateNews = async () => {
        props.setProgress(25);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true)

        let data = await fetch(url);

        props.setProgress(50);

        let parsedData = await data.json()

        props.setProgress(75);

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalize(props.category)} - Times of India`;
        updateNews();
    }, [])

    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)

        let data = await fetch(url);
        let parsedData = await data.json()

        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

    };
        return (
            <div className="container" style={{ color: props.mode === "light" ? "#101112" : "white" }} >
                <h1 className="text-center" style={{marginTop: '10vh', marginBottom: '5vh'}}>Times of India: Top {capitalize(props.category)} Headlines</h1>                
                {loading && <Spinner/>}
                <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner/>}>
                
                <div className="container">
                <div className="row">
                {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} mode={props.mode} />
                            </div>
                })}
                </div>
                </div>
                </InfiniteScroll>
            </div>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
}

News.defaultProps = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}


export default News
