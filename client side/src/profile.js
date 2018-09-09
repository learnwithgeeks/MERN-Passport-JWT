import React , {Component} from 'react';
import axios from 'axios';
import setAuthToken from './auth';
export default class extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    componentDidMount()
    {
        setAuthToken(localStorage.getItem('access_token'));
        axios.get('http://localhost:9000/getUserData').then((res) =>
    {
        console.log(res.data.userData);
    })
        axios.get('http://localhost:9000/getAllUsers').then((res) =>
    {
        console.log(res.data);
    })
    }

    render()
    {
        return(
        <main>
        <h1> Profile </h1>
        </main>
        )
    }
}
