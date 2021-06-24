import React from 'react'
import './App.css';
import Sidemenu from './sidemenu/Sidemenu';
import Main from './Main/Main'
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {newsType: 0};
}

updateShared=(shared_value) =>{
  
    this.setState({newsType: shared_value}, ()=>{

    });
}
render(){
  return (
    <div className="App">
      <Sidemenu newsType={this.state.newsType} updateShared={this.updateShared}/>
      <Main newsType={this.state.newsType} updateShared={this.updateShared}/>
    </div>
  )
}
  
}

export default App;
