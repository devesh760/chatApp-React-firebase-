import React from "react";
import Chatpopup from "./chatpopup/chatpopup";
import classes from "./chatbox.module.css";
import { Component } from "react";
import fire from "../../firebase/firebase";
class chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChat: "",
      messageToRender: [],
    };
  }
  componentDidMount() {
    let sender = sessionStorage.getItem("currentUserId")
    let receiver = this.props.currentUser;
    this.loadChat(receiver, sender);
    this.addchildAddEventListnerTodb(receiver,sender);
  }
  addchildAddEventListnerTodb=(receiver,sender)=>{
    let key = this.getHashKey(receiver,sender);
    let ref = fire.database().ref('/messages/'+key);
    if(sessionStorage.getItem(`${receiver}`) !== 'listening'){
    ref.limitToLast(1).on('child_added',(snap)=>{
     let a = Object.values(snap.val())[0]
     let b = Object.keys(snap.val())[0]
      let popup = <Chatpopup >{a}</Chatpopup>
      let currentUserId = sessionStorage.getItem('currentUserId');
      sessionStorage.setItem(`${receiver}`, "listening");
     if(this.state.messageToRender &&  this.state.messageToRender[this.state.messageToRender.length-1]!==popup && b!==currentUserId){
        let newObj = [...this.state.messageToRender,popup];
        this.setState({messageToRender:newObj});
        setTimeout(() => {
          let a = document.querySelector("#chatbox");
          a.scrollTo(0, a.scrollHeight + 20000);
        }, 0);
     }
    })
  }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      let sender = sessionStorage.getItem("currentUserId");
      let receiver = this.props.currentUser;
      this.loadChat(receiver, sender);
      this.addchildAddEventListnerTodb(receiver, sender);
    }
  }
  loadChat = (receiver, sender) => {
    let key = this.getHashKey(receiver, sender);
    let db = fire.database();
    db.ref("/messages/" + key)
      .get()
      .then((snap) => {
        let currId = sessionStorage.getItem("currentUserId");
        if(snap.val()){  
            let arr = snap.val().map((el) => {
              let keyArr = Object.keys(el);
              if (keyArr[0] == currId) {
                return (
                  <Chatpopup key={Math.random() * 100000000000000} right>
                    {el[keyArr[0]]}
                  </Chatpopup>
                );
              } else {
                return (
                  <Chatpopup key={Math.random() * 100000000000000}>
                    {el[keyArr[0]]}
                  </Chatpopup>
                );
              }
            });
            this.setState({ messageToRender: arr });
        }else{
           this.setState({messageToRender:null})
        }
        setTimeout(() => {
          let a = document.querySelector("#chatbox");
          a.scrollTo(0, a.scrollHeight + 20000);
        }, 0);
      });
  };
  change = (e) => {
    this.setState({ currentChat: e.target.value });
  };
  writeMessageToDb(receiver, sender, chat) {
    let key = this.getHashKey(receiver, sender);
    let db = fire.database();
    let chatObj = {};
    chatObj[sender] = chat;
    let previousChat = null;
    db.ref("/messages/" + key)
      .get()
      .then((snap) => {
        previousChat = snap.val();
        if (previousChat != null) {
          let updatedChat = [...previousChat];
          updatedChat.push(chatObj);
          db.ref("/messages/" + key).set(updatedChat);
        } else {
          db.ref("/messages/" + key).set([chatObj]);
        }
      });
  }
  getHashKey(Id1, Id2) {
    Id1 = Number(Id1);
    Id2 = Number(Id2);
    let a = (Id1 + Id2)%10000;
    return a;
  }
  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.currentChat !== "") {
      let messages = [...this.state.messageToRender];
      messages.push(<Chatpopup right>{this.state.currentChat}</Chatpopup>);
      this.setState({ messageToRender: messages, currentChat: "" });
      this.writeMessageToDb(
        this.props.currentUser,
        sessionStorage.getItem("currentUserId"),
        this.state.currentChat
      );
      setTimeout(()=>{
        let a = document.querySelector("#chatbox");
        a.scrollTo(0, a.scrollHeight + 20000);
      },0);
    }
  };
  render() {
    return (
      <div className={classes.chatBox}>
        <div id="chatbox" className={classes.chatDisplay}>
          {this.state.messageToRender}
        </div>
        <div className={classes.chat}>
          <form>
            <input
              value={this.state.currentChat}
              onChange={this.change}
              placeholder="Type Here"
              type="text"
            />
            <button onClick={this.sendMessage}>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default chatbox;
