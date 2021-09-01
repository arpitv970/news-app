import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general'
    }

    static defaultProps = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }      

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.capitalize(this.props.category)} - Times of India`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7f2e33c5c5e74b249fdc1d7a98ac3818&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({loading: true});

        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick = async ()=>{
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }
    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    fetchMoreData = async() => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7f2e33c5c5e74b249fdc1d7a98ac3818&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: true,
        })

    };
    
    render() {
        return (
            <>
                <h1 className="text-center my-3">Times of India: Top {this.capitalize(this.props.category)} Headlines</h1>                
                {this.state.loading && <Spinner/>}
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner/>}>
                
                <div className="container">
                <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                })}
                </div>
                </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
