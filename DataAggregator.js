const fs = require('fs');

function readData()
{
    fs.readFile("Output.txt", 'utf-8',(err, data) => {
        if(data == "") {
            console.log("Empty File");
        }
        else {
            // console.log(data);
            let items_arr = JSON.parse(data);
            let entries = [];
            for(let i=0;i<items_arr.length;i++) {
                let items = items_arr[i];
                for(let j=0;j<items.length;j++) {
                    let item = items[j];
                    let obj = {
                        videoTitle: item.snippet.title,
                        videoId: item.id.videoId,
                        description: item.snippet.description,
                        thumbnailURL: item.snippet.thumbnails.default.url,
                        channelTitle: item.snippet.channelTitle,
                        publishDateTime: item.snippet.publishTime
                    };
                    // console.log(JSON.stringify(obj) + " ADDED")
                    entries.push(obj);
                }
            }
            // TODO : insert all these obj into a database
            console.log(entries.length + " records to be inserted")
        }
    });
}

readData();