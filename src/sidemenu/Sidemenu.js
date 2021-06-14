import React from 'react';
import classes from './Sidemenu.module.css'
const Sidemenu = (props) => {
return (
<div className={classes.sidemenu}>
   <a href="#section">About</a>
   <a href="#section">Services</a>
   <a href="#section">Clients</a>
   <a href="#section">Contact</a>
</div>
 );
};
export default Sidemenu;