import React from 'react';
import classes from './user.module.css';
import {NavLink} from "react-router-dom"
const user = (props) =>{
    return (
      <NavLink style={{textDecoration:'none'}} exact to={props.userName} activeClassName={classes.active}>
        <li onClick={() => props.clicked(props.id, props.userName)} className={classes.user}>
          <img className={classes.image} src={props.pictureSrc} />
          <p>{props.userName}</p>
        </li>
      </NavLink>
    );
}

export default user;