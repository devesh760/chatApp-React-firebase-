import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import fire from './components/firebase/firebase';
import Login from './components/Login/Login'
import Home from './components/HomePage/home';
import axios from './components/axios/axios';
import Spinner from './components/UI/Spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:null,
      isLoading:false
    }
  }
  componentDidMount(){
    this.checkUserExists();
  }
  checkUserExists=()=>{
     this.setState({isLoading:true})
     fire.auth().onAuthStateChanged((userExist)=>{
       if(userExist){
         sessionStorage.setItem('currentUserId',`${userExist.providerData[0].uid}`);
         this.setState({user:userExist,isLoading:false})
       }
       else{
         this.setState({user:null,isLoading:false});
       }
     })
  }
  setUserInfoToFireBase(Info){
     const database = fire.database().ref('/userInfo/' + Info.id).set(Info)
  }
  LoginWithGoogle=(e)=>{
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then((result)=>{
      if (result.additionalUserInfo.isNewUser){
        this.setUserInfoToFireBase(result.additionalUserInfo.profile);
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  logoutHandler=()=>{
    fire.auth().signOut(); 
  }
  render() { 
    let ToShow=null;
    if(this.state.isLoading){
      ToShow = <div className='m-auto '><Spinner /></div>
    }
    else if(this.state.user){
      ToShow = <Home logOut={this.logoutHandler}/>
    }
    else{
      ToShow = <Login loginHandler={this.LoginWithGoogle}/>
    }
    return (  
      <div className='d-flex justify-content-center' style={{height:'100vh',backgroundColor:'darkgrey'}}>
        {ToShow}
      </div>
    );
  }
}
 
export default App;
