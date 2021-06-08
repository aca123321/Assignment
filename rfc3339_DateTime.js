let d = new Date().getTime();

// subtracting 100 secs from the current time
let curTime = new Date(d);

console.log("current time: " + curTime.toISOString())

curTime.setMinutes(curTime.getMinutes()-5);

console.log("time 1 mins before: " + curTime.toISOString());