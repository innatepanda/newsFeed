import React, {Component} from 'react';
import './mainbody.css'
import {Card, CardBody, Button,  CardFooter} from 'reactstrap'

var filterednews=[]
class Main extends Component{
  constructor(props)
  {
    super(props)
    
    this.state={
      isLoaded:false,
      
      pg:this.props.pgg,
      perpage:6,
      maxpgs:0,
      items:[],
      

    }
    window.history.replaceState(null, "News", "/News/1")
  }
  
  async componentDidMount() {
    await fetch("https://api.first.org/data/v1/news")
      .then(res => {return res.json()})
      .then(
        (result) => {
          
          console.log(result.data)
          this.setState({
            isLoaded: true,
            items: result.data,
            maxpgs:Math.ceil(result.data.length/this.state.perpage)
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }
  

  render(){
    if(this.state.isLoaded)
    {
      
      
      var thispageNews;
      var firstIndex=this.state.pg*this.state.perpage;
        var lastIndex=firstIndex+this.state.perpage;
        if(this.props.searchVar!=="" && filterednews.length===0)
          {
            
            this.state.items.forEach((data)=>{
              if(data.title.toLowerCase().search(this.props.searchVar.toLowerCase())!==-1 ||
              data.published.toLowerCase().search(this.props.searchVar.toLowerCase())!==-1  
              
               )
              {
                
                filterednews.push(data)
              }
              
              

              
            })
            console.log(filterednews)
             thispageNews=filterednews.slice(firstIndex, lastIndex)
          }
          else
          {
            filterednews=[]
            thispageNews=this.state.items.slice(firstIndex, lastIndex);
          }
               

        console.log(thispageNews)
        var cname="maindiv";
        var cardname="card";
      if(this.props.newsType===1)
      {
        cname="maindiv grid-system"
        cardname="card grid-child"
      }
        
        
        return(
          <div>
            <div className={cname}>
              {
                filterednews.length===0 && this.props.searchVar!==""?<div>
                  no search results found.
                </div>:
              thispageNews.map((data, index)=>{
              
                  return (
                    
                    <Card className={cardname}>
                      <Button close onClick={()=>{
                        
                        this.setState({
                          items: this.state.items.filter(item => item.id !== data.id),
                        }, ()=>{
                          this.setState({
                            maxpgs: this.props.searchVar===""?Math.ceil(this.state.items.length/this.state.perpage):Math.ceil(filterednews.length/this.state.perpage)

                          })
                          thispageNews= thispageNews.filter(item => item !== data)
                          })

                      }}  className="btn-remove" />
                      <em>{data.title}</em>
                      <CardBody>
                        {data.summary}
                        
                      </CardBody>
                      <CardFooter>
            <small className="text-muted">{data.published.substr(0,17)}</small>
          </CardFooter>
                    </Card>
                  )
                })
              
            }
              
            
            
          </div >
          <div className="btns">
          {
              this.state.pg===0?
              <Button color="info" className="button" disabled>prev</Button>:
              <Button color="info" className="button" onClick={()=>{
                this.setState({
                  pg:this.state.pg-1
                }, ()=>{
                  window.history.replaceState(null, "News", "/News/"+(this.state.pg+1))

                })
              }}>prev</Button>
            }
            pg-{this.state.pg+1}
            {
              this.state.pg===this.state.maxpgs-1 || this.state.pg===Math.ceil(filterednews.length/this.state.perpage)-1 || (filterednews.length===0 && this.props.searchVar!=="")?
              <Button color="info" disabled className="button">next</Button>:
              <Button color="info" className="button" onClick={()=>{
                this.setState({
                  pg:this.state.pg+1
                }, ()=>{
                  window.history.replaceState(null, "News", "/News/"+(this.state.pg+1))
                  })
              }}>next</Button>
            }

          </div>
          
          </div>
          )

      }
      
    
    else{
      return (
        <div>
            Loading. Please wait.
        </div>
        
      )
    }
    
  }
}

export default Main
