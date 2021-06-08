let a = 1;
let b = 2;

const fetch = require("node-fetch");

// setTimeout(() => {
//     console.log("Async code");
// },500);

setInterval(() => {
    let curTime = new Date(new Date().getTime());
    console.log(curTime.toISOString());
}, 10000);


fetch('http://localhost:7000/')
    .then(response => response.json().then((data) => {
        console.log("json data = " + JSON.stringify(data));
    }));