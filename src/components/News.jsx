import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {

    static defaultProps = {
         country: 'in',
         max:6,
         category:'General',
    }
    static propTypes = {
        country:PropTypes.string,
        max:PropTypes.number,
        category:PropTypes.string,
    }
    capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page:1,
            hasMore:true
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsTation`;
       
    }
    async updateNews(){
        this.props.setProgress(10);
        const apiKey= import.meta.env.VITE_GNEWS_API;
        const url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&lang=en&max=${this.props.max}&page=${this.state.page}&category=${this.props.category}&apikey=${apiKey}`;
        this.setState({loading:true}); 
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json() 
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles, 
                       hasMore: parsedData.articles && parsedData.articles.length === this.props.max,
                       loading:false})
        this.props.setProgress(100);               
    }

    async componentDidMount(){ 
       this.updateNews();
    }

    handleNextClick = () => {
    this.setState(
        { page: this.state.page + 1 },
        () => this.updateNews()   // ← Updated page ke baad hi chalega
    );
};

    handlePrevClick = () => {
    this.setState(
        { page: this.state.page - 1 },
        () => this.updateNews()
    );
};


    //  fetchMoreData = async ()=>{
    //     const apiKey= import.meta.env.VITE_GNEWS_API;      
    //     // this.setState({page:this.state.page + 1});
    //     const nextPage= this.state.page+1;
    //     const url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&lang=en&max=${this.props.max}&page=${nextPage}&category=${this.props.category}&apikey=${apiKey}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json() 
    //     this.setState({articles: this.state.articles.concat(parsedData.articles), 
    //                 //    hasMore: parsedData.articles.length>0 
    //                    totalArticles:parsedData.totalArticles })                           
    //  }

    render() { 
        return (
            <>
                <h1 className="text-center" style={{margin:'15px 0px'}}>NewsTation - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1> 
                {this.state.loading && <Spinner/>}        
                  {/* <InfiniteScroll
                    dataLength={this.state.articles.length} 
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<Spinner/>}
                >  */}
                <div className="container">
                <div className="row"> 
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.image} newsUrl={element.url}  date={element.publishedAt} source={element.source.name}/>
                    </div> 
                    
                })} 
                </div>
                </div>
                {/* </InfiniteScroll> */}
                <div className="d-flex justify-content-between gap-4 my-4">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={!this.state.hasMore} type="button" className="btn btn-dark btn-sm" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>        
        )
    }
}

export default News   