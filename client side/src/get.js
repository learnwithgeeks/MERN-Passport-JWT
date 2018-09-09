import React from 'react';
import axios from 'axios';
export default class extends React.Component
{
componentDidMount()
{
axios.get('http://localhost:9000/getAllUsers').then((res) =>
{
    console.log(res.data);
})
}
render(){
    return(<h1>dsds</h1>)}
}