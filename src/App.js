import React from 'react'
import './App.css';
import Sidemenu from './sidemenu/Sidemenu';
import Main from './Main/Main'
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {newsType: 0,
    searchVar:"", pgg:0}
}

updateShared=(shared_value) =>{
  
    this.setState({newsType: shared_value}, ()=>{

    });
}

updateSearch=(shared_value) =>{
  
  this.setState({searchVar: shared_value}, ()=>{
      this.setState({
        pgg:0
      })
  });
}
render(){
  return (
    <div className="App">
      <Sidemenu newsType={this.state.newsType} updateShared={this.updateShared} search={this.state.search} updateSearch={this.updateSearch}/>
      <Main newsType={this.state.newsType} updateShared={this.updateShared} searchVar={this.state.searchVar} updateSearch={this.updateSearch} pgg={this.state.pgg}/>
    </div>
  )
}
  
}

export default App;
