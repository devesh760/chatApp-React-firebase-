import React from "react";
import classes from "./sideBar.module.css";
import Logo from "../../../Assets/images/ew.jpg";
import User from "./User/user";
import Loader from "../../UI/Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

const sideBar = (props) => {
  let toShow = null;
  if (props.isLoading) {
    toShow = (
      <div className="m-auto">
        <Loader />
      </div>
    );
  } else if (props.allUsers) {
    let currentUserId = sessionStorage.getItem("currentUserId");
    toShow = Object.values(props.allUsers).map((user) => {
      if (user.id != currentUserId)
        return (
          <User
            key={user.id}
            id={user.id}
            pictureSrc={user.picture}
            userName={[user.given_name, user.family_name].join(" ")}
            clicked={props.isIdClicked}
          />
        );
      else return null;
    });
  }
  return (
    <div className={classes.SideBar}>
      {/* <div className={classes.SideBarHeader}>
                <p>User are</p>
            </div> */}
      <div className={classes.UsersSection}>
        <ul>
          {/* <User pictureSrc={Logo} userName='Devesh'/>
                    <User pictureSrc={Logo} userName='Devesh'/>
                    <User pictureSrc={Logo} userName='Devesh'/> */}
          {toShow}
        </ul>
      </div>
    </div>
  );
};

export default sideBar;
