import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import {PropTypes} from 'prop-types';
export class News extends Component {
    
static defaultProps={
    country: "in",
    pageSize:8,
    category:"general"

}
static propTypes={

    country:PropTypes.string,
    pageSize:PropTypes.array,
    category:PropTypes.string
}
      
        
       
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading :false,
            page:1
           
                   }
                   document.title=`${this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} - NewsPlatter`
    }

  async componentDidMount(){
    this.props.setProgress(0)
   
       try{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aada472754634078a6e4c71996e9fd42&page=1`;
        const data= await fetch(url);
        const parseData=await data.json();
        this.setState({
            articles:parseData.articles,
            page:1,
             loading:false,
            totalResults:parseData.totalResults
        });
            
          
       }
       catch(e){
        console.log("something is not working")
       }
       this.props.setProgress(100)
    }

   handlePreviousClick=async()=>{
    this.props.setProgress(0)
      try{
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aada472754634078a6e4c71996e9fd42&page=${this.state.page-1}&pageSize=${this.props.pageSize}}`;
            this.setState({loading:true});
            let data= await fetch(url);
            let parseData=await data.json();
            this.setState({
                articles:parseData.articles,
                page:this.state.page-1,
                loading:false
              
            });
               

              }
              catch(e){
                console.log("Something is not working")
              }
              this.props.setProgress(100)

            }

    handleNextClick=async()=>{
       
        this.props.setProgress(0)
        try{
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aada472754634078a6e4c71996e9fd42&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data= await fetch(url);
            let parseData=await data.json();
            this.setState({
                articles:parseData.articles,
                page:this.state.page+1,
                loading:false
                
            });        
           }
           catch(e){
            console.log("something is not working")
           }
           this.props.setProgress(100)
        }
          
       

       

      
    
  render() {
    return (
      <div className="container mx-23 my-3">
      <h1 className="text-center" style={{margin:"60px 0px"}}><strong>NewsPlatter</strong> - Sizzling top {this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} Headlines</h1>
      {this.state.loading && <Spinner/>}
      <div className="row">
      {this.state.articles.map((element)=>{
         
         return  <div className="col-md-4" key={element.url}>
          <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
    
         </div>
          
      })}
      </div>
      <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
      <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      <div className="foo text-center">
      <footer>Copyright &copy; www.NewsPlatter.com. All Rights Reserved.</footer>
       </div>
       </div>
       
       

    )
  }
}

export default News