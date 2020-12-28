import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar/Navs";
import classes from "./home.module.css";
import SideBar from "./SideBar/sideBar";
import Chatbox from "./ChatBox/chatbox";
import fire from "../firebase/firebase";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllUserData: {},
      isLoading: false,
      currentUser:null,
      currentUserData:null
    };
  }
  componentDidMount() {
    this.getAllUsers();
  }
  getAllUsers = () => {
    this.setState({ isLoading: true });
    let database = fire.database();
    database.ref("userInfo").on("value", (snapshot) => {
      let obj = snapshot.val();
      this.setState({AllUserData:obj,isLoading:false})
      this.setState({currentUserData:obj[sessionStorage.getItem('currentUserId')]});
    });
  };
  isIdClicked=(Id,username)=>{
    this.setState({currentUser:Id});
  }
  render() {
    return (
      <div className={[classes.Home, "d-flex flex-column"].join(" ")}>
        <NavBar userData={this.state.currentUserData}/>
        <SideBar
          isLoading={this.state.isLoading}
          allUsers={this.state.AllUserData}
          isIdClicked = {this.isIdClicked}
        />
        {this.state.currentUser?<Chatbox currentUser={this.state.currentUser} />:null}
      </div>
    );
  }
}

export default Home;
