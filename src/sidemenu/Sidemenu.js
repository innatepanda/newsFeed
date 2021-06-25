import React from 'react';
import classes from './Sidemenu.module.css'
import {Button, ButtonGroup, Input} from 'reactstrap'
import { Columns, DistributeVertical, Search, X } from 'react-bootstrap-icons';

class Sidemenu extends React.Component {
   constructor(props){
      super(props)
      this.state={
         v:""
      }
   }
   changeip(e){
     
      this.setState({
         v:e.target.value
      }, ()=>{

      })
   }
   updateSearch() {
      
      this.props.updateSearch(this.state.v);
  }
  updateShared(e){
     this.props.updateShared(e)
  }
render(){
   return (
      <div className={classes.sidemenu}>
         <div className={classes.contentdiv}>
         <header className={classes.writing}>News Style</header>
         <ButtonGroup >
            
              <Button color="primary "  active={this.props.newsType === 0} onClick={() => {this.updateShared(0); }}><DistributeVertical/></Button>
              <Button color="primary " active={this.props.newsType === 1} onClick={() => {this.updateShared(1) }} ><Columns/></Button>
              
            </ButtonGroup>
            

         </div>
         <div className={classes.contentdiv}>
         <header className={classes.writing}>Search news</header>
         <Input type="text" id="search" value={this.state.v} onChange={(e)=>this.changeip(e)}/>
         <Button color="primary" onClick={()=>this.updateSearch()}><Search /></Button>
         <Button color="primary" onClick={()=>{
            this.setState({
               v:""
            }, ()=>
            this.updateSearch())
         }}><X /></Button>
         
         </div>
         
         
      </div>
       );
}

};
export default Sidemenu;