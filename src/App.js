import React from 'react'
import './App.css';
import Sidemenu from './sidemenu/Sidemenu';
import Main from './Main/Main'
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {newsType: 0,
    searchVar:""}
}

updateShared=(shared_value) =>{
  
    this.setState({newsType: shared_value}, ()=>{

    });
}

updateSearch=(shared_value) =>{
  
  this.setState({searchVar: shared_value}, ()=>{

  });
}
render(){
  return (
    <div className="App">
      <Sidemenu newsType={this.state.newsType} updateShared={this.updateShared} search={this.state.search} updateSearch={this.updateSearch}/>
      <Main newsType={this.state.newsType} updateShared={this.updateShared} searchVar={this.state.searchVar} updateSearch={this.updateSearch}/>
    </div>
  )
}
  
}

export default App;
