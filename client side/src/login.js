import React, { Component } from 'react';
import axios from 'axios';
import setAuthToken from './auth';

export default class extends Component {
  constructor(props)
  {
    super(props);
    this.state = {username:'',password:''};
  }
  
  login()
  {
    axios({
      method:'post',
      url:'http://localhost:9000/login',
      data:{
         username:this.state.username,
         password:this.state.password
      },
      headers:{
         'Access-Control-Allow-Origin':'http://localhost:9000'
      }
   }).then((res)=>{
      if(res.data.confirmation){
         localStorage.setItem('access_token',res.data.token);
         setAuthToken(res.data.token);
         this.props.history.replace('/profile?'+res.data.token);
      }
      else{
         if(res.data.error === "user not found"){
            alert('user not found');
         }
         else if(res.data.error === "password not match"){
            alert('incorrect password');
         }
      }
      
   }).catch((err)=>{
      console.log(err);
   })
  }
  render() {
    return (
      <div id="login">
      <h1> Login Here </h1>
      <input name="username" type="text" placeholder="username" onChange ={(e) => this.setState({username:e.target.value})}/>
      <input name="password" type="password" placeholder="password" onChange ={(e) => this.setState({password:e.target.value})}/>
      <button onClick={this.login.bind(this)}>Login</button>
      </div>
    );
  }
}