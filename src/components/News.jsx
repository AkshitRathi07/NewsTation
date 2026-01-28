import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [hasMore,setHasMore]=useState(true)
   
    const capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      
       
    
    const updateNews = async() => {
        props.setProgress(10);
        const apiKey= import.meta.env.VITE_GNEWS_API;
        const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&lang=en&max=${props.max}&page=${page}&category=${props.category}&apikey=${apiKey}`;
        setLoading(true);
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json() 
        props.setProgress(70);

        setArticles(parsedData.articles)
        setHasMore(parsedData.articles && parsedData.articles.length === props.max)
        setLoading(false)
        
        props.setProgress(100);               
    }

    useEffect(()=>{
       document.title=`${capitalizeFirstLetter(props.category)}-NewsTation`;
       updateNews();
    }, [])
 

    const handleNextClick = () => {
          setPage(page+1),
          updateNews()   // ← Updated page ke baad hi chalega
    
};

    const handlePrevClick = () => {
            setPage(page-1)
            updateNews()
    
};


    //  fetchMoreData = async ()=>{
    //     const apiKey= import.meta.env.VITE_GNEWS_API;      
    //     
    //     const nextPage= page+1;
    //     const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&lang=en&max=${props.max}&page=${nextPage}&category=${props.category}&apikey=${apiKey}`;
    //     setPage(page+1)
    //     let data = await fetch(url);
    //     let parsedData = await data.json() 
    //     setArticles(articles.concat(parsedData.articles))
    //     setHasMore(parsedData.articles.length>0 )                         
    //  }

   
        return (
            <>
                <h1 className="text-center" style={{margin:'15px 0px',marginTop:'75px'}}>NewsTation - Top {capitalizeFirstLetter(props.category)} Headlines </h1> 
                {loading && <Spinner/>}        
                  {/* <InfiniteScroll
                    dataLength={articles.length} 
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Spinner/>}
                >  */}
                <div className="container"  style={{ backgroundColor: props.mode === 'dark' ? '#121212' : 'white', color: props.mode === 'dark' ? 'white' : 'black'}}>
                <div className="row"> 
                {!loading && articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.image} newsUrl={element.url}  date={element.publishedAt} source={element.source.name} mode={props.mode}/>
                    </div> 
                    
                })} 
                </div>
                </div>
                {/* </InfiniteScroll> */}
                <div className="d-flex justify-content-between gap-4 my-4">
                <button disabled={page<=1} type="button" className={`btn btn-sm ${props.mode === "dark" ? "btn-light" : "btn-dark"}`} onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled={!hasMore} type="button" className={`btn btn-sm ${props.mode === "dark" ? "btn-light" : "btn-dark"}`} onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </>        
        )
    }


    News.defaultProps = {
         country: 'in',
         max:6,
         category:'General',
    }
    News.propTypes = {
        country:PropTypes.string,
        max:PropTypes.number,
        category:PropTypes.string,
    }

export default News   