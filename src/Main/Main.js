import React, {Component} from 'react';
import './mainbody.css'
import {Card, CardBody, Button} from 'reactstrap'

class Main extends Component{
  constructor(props)
  {
    super(props)
    this.state={
      isLoaded:false,
      type:0,
      pg:0,
      perpage:6,
      maxpgs:0,
      items:[],
      curnews:[],
      rejected:[]

    }
    window.history.replaceState(null, "News", "/News/0")
  }
  async componentDidMount() {
    await fetch("https://api.first.org/data/v1/news")
      .then(res => {return res.json()})
      .then(
        (result) => {
          console.log(result.data.length)
          
          this.setState({
            isLoaded: true,
            items: result.data,
            maxpgs:Math.ceil(result.data.length/this.state.perpage)
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
  }

  render(){
    if(this.state.isLoaded)
    {
      if(this.state.type===0)
      {
        var firstIndex=this.state.pg*this.state.perpage;
        var lastIndex=firstIndex+this.state.perpage;
        var thispageNews=this.state.items.slice(firstIndex, lastIndex);
        



        return(
          <div className="maindiv">
            {
              thispageNews.map((data, index)=>{
                if(this.state.rejected.includes(index+firstIndex))
                {
                  return (
                    <Card className="card">
                      deleted
                    </Card>
                  )
                }
                else{
                  return (
                    <Card className="card">
                      {data.title}
                      <CardBody>
                        {data.summary}
                      </CardBody>
                      <Button onClick={()=>{
                        this.setState({
                          rejected:[...this.state.rejected, index+firstIndex]
                        },()=>{
                          console.log(this.state.rejected)
                        })

                      }} color="danger" className="btn-remove">remove</Button>
                    </Card>
                  )
                }

              })
              
            }
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
        
  
          )

      }
      else{
        return(
          <div>
            
          </div>
        
  
          )

      }
      

    }
    else{
      return (
        <div>loading...</div>
      )
    }
    
  }
}

export default Main
