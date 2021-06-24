import React, {Component} from 'react';
import './mainbody.css'
import {Card, CardBody, Button, Spinner, CardFooter} from 'reactstrap'


class Main extends Component{
  constructor(props)
  {
    super(props)
    
    this.state={
      isLoaded:false,
      
      pg:0,
      perpage:6,
      maxpgs:0,
      items:[],
      

    }
    window.history.replaceState(null, "News", "/News/0")
  }
  
  async componentDidMount() {
    await fetch("https://api.first.org/data/v1/news")
      .then(res => {return res.json()})
      .then(
        (result) => {
          
          console.log(result.data)
          this.setState({
            isLoaded: true,
            items: result.data.slice(0, 20),
            maxpgs:Math.ceil(20/this.state.perpage)
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
      var firstIndex=this.state.pg*this.state.perpage;
        var lastIndex=firstIndex+this.state.perpage;
        var thispageNews=this.state.items.slice(firstIndex, lastIndex);
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
              thispageNews.map((data, index)=>{
              
                  return (
                    
                    <Card className={cardname}>
                      <Button close onClick={()=>{
                        
                        this.setState({
                          items: this.state.items.filter(item => item.id !== data.id),
                        }, ()=>{
                          this.setState({
                            maxpgs:Math.ceil(this.state.items.length/this.state.perpage)

                          })
                          thispageNews= thispageNews.filter(item => item !== data)
                          })

                      }}  className="btn-remove" />
                      <em>{data.title}</em>
                      <CardBody>
                        {data.summary.substr(0, 220)}
                        {
                          data.summary.length>220?"{...}":''
                        }
                        
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
                  window.history.replaceState(null, "News", "/News/"+this.state.pg)

                })
              }}>prev</Button>
            }
            pg-{this.state.pg+1}
            {
              this.state.pg===this.state.maxpgs-1?
              <Button color="info" disabled className="button">next</Button>:
              <Button color="info" className="button" onClick={()=>{
                this.setState({
                  pg:this.state.pg+1
                }, ()=>{
                  window.history.replaceState(null, "News", "/News/"+this.state.pg)
                  })
              }}>next</Button>
            }

          </div>
          
          </div>
          )

      }
      
    
    else{
      return (
        <Spinner size="sm" color="secondary" />
      )
    }
    
  }
}

export default Main
