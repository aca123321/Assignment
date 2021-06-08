let p = new Promise((resolve, reject) => {
    let a = 1+2;
    if(a == 4)
    {
        resolve("Success");
    }
    else
    {
        reject("Failed");
    }
});

p.then((msg) => {
    console.log(msg);
}).catch((err) => {
    console.log("error: " + err);
});