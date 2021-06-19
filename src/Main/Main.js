import React, {Component} from 'react';

import {Card, CardImg, CardBody, Button} from 'reactstrap'

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
          <div>
            {
              thispageNews.map((data, index)=>{
                if(this.state.rejected.includes(index+firstIndex))
                {
                  return (
                    <Card>
                      deleted
                    </Card>
                  )
                }
                else{
                  return (
                    <Card>
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

                      }} color="danger">remove</Button>
                    </Card>
                  )
                }

              })
              
            }
            {
              this.state.pg===0?
              <Button color="info" disabled>prev</Button>:
              <Button color="info" onClick={()=>{
                this.setState({
                  pg:this.state.pg-1
                }, ()=>{
                  window.history.replaceState(null, "News", "/News/"+this.state.pg)

                })
              }}>prev</Button>
            }
            {
              this.state.pg===this.state.maxpgs-1?
              <Button color="info" disabled>next</Button>:
              <Button color="info" onClick={()=>{
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
