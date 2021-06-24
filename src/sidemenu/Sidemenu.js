import React from 'react';
import classes from './Sidemenu.module.css'
import {Button, ButtonGroup, Input} from 'reactstrap'
import { Columns, DistributeVertical, Search } from 'react-bootstrap-icons';

class Sidemenu extends React.Component {
   
   updateShared(e) {
      this.props.updateShared(e);
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
         <Input type="text" id="search" />
         <Button color="primary"><Search /></Button>
         <Button close ></Button>
         </div>
         
         
      </div>
       );
}

};
export default Sidemenu;