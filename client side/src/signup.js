import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
  constructor(props)
  {
    super(props);
    this.state = {username:'',password:''};
  }
  
  signup()
  {
    axios({
      method:'post',
      url:'http://localhost:9000/signup',
      data:{
         username:this.state.username,
         password:this.state.password
      },
      headers:{
         'Access-Control-Allow-Origin':'http://localhost:9000'
      }
   }).then((res)=>{
      if(res.data.confirmation){
         this.props.history.replace('/login');
      }
      else{
         if(res.data.error === "username already exist"){
            alert('username already exist');
         }
      }
      
   }).catch((err)=>{
      console.log(err);
   })
  }
  render() {
    return (
      <div id="signup">
      <h1> Signup Here </h1>
      <input name="username" type="text" placeholder="username" onChange ={(e) => this.setState({username:e.target.value})}/>
      <input name="password" type="password" placeholder="password" onChange ={(e) => this.setState({password:e.target.value})}/>
      <button onClick={this.signup.bind(this)}>Login</button>
      </div>
    );
  }
}