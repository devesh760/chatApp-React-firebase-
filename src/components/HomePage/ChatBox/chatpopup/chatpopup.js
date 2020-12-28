import React from 'react';
import classes from './chatpopup.module.css';
const popup = (props) =>{
    return (
      <div className={[classes.popupCont,props.right?classes.popupContRight:null].join(' ')}>
        <div className={props.right?classes.popupRight:classes.popupLeft}>
          {props.right?null: <span>{props.name}</span>}
          <p>{props.children}</p>
        </div>
      </div>
    );
}
export default popup;