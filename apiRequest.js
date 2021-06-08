let api_key = "AIzaSyDgOscrEOmDEVQy9fC38jADHM9E73OUM5A";
const fetch = require('node-fetch');
const fs = require('fs');

let interval = 10000; // in secs
let searchTerm = "cricket";
let repeatNum = 1;

function getReqdTime(reqdInterval)
{
    let d = new Date().getTime();
    let curTime = new Date(d);
    curTime.setSeconds(curTime.getSeconds()-reqdInterval);
    return curTime.toISOString();
}

function generateQueryString(pageToken="")
{
    let reqdTime = getReqdTime(interval);

    query_string = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=date";
    if(pageToken !== "") {
        console.log("page token is not empty");
        query_string += ("&pageToken=" + pageToken);
    }
    else {
        console.log("page token is empty");
    }
    query_string += "&publishedAfter=" + reqdTime + "&q=" + searchTerm + "&type=video&key=" + api_key;

    console.log("query_string = \n" + query_string);
    console.log("getting results published after " + reqdTime);
    return query_string;
}

let res_arr = [];

async function start() {
    counter++;
    fetch(generateQueryString()).then((response) => {return response.json()}).then(async (data) => {
        // console.log(response.data)
        // console.log("data: " + JSON.stringify(data));
        let numResults = data.pageInfo.totalResults;
        let resPerPage = data.pageInfo.resultsPerPage;
        let nextPageToken = data.nextPageToken;
        res_arr.push(data.items);

        console.log("numResults: " + numResults + ", resPerPage = " + resPerPage + ", nextPageToken = " + nextPageToken);

        while(nextPageToken != null) {
            let ret_obj = await fetch(generateQueryString(nextPageToken)).then((response) => {return response.json();}).then((resData) => {
                // console.log("RES DATA: " + JSON.stringify(resData));
                return {data: resData, nextPageToken: resData.nextPageToken};
            }).catch((err) => {
                console.log(err);
            });

            console.log("DATA = " + JSON.stringify(ret_obj.data));
            res_arr.push(ret_obj.data.items);
            nextPageToken = ret_obj.nextPageToken;
        }

    }).catch((err) => {
        console.log(err);
    }).finally( () => {
        if(counter === repeatNum) {
            clearInterval(process);
            console.log("LENGTH: " + res_arr.length);
            fs.writeFile('Output.txt', JSON.stringify(res_arr), (err) => {
                if (err) throw err;
            });
        }
    });
}

let counter = 0;
let process = setInterval(start,5000);