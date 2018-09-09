const axios = require('axios');
const express = require('express')();
axios.get('http://localhost:9000/getAllUsers').then((res) =>
{
    console.log(res);
})
express.listen(8000,() => console.log('running'));