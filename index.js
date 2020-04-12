const fs = require('fs');
const http = require('http');
const url = require('url');

///////////////////////
            //FILEEEEE
// // Blocking, sychronous way
// const textIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `this is the silaki ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);
// console.log('FIle has been written');


//////////////////////////


// //Non-Blocking, asynchronous way
// fs.readFile('./1-node-farm/starter/txt/start.txt', 'utf-8', (error, data1) => {
//     fs.readFile(`./1-node-farm/starter/txt/${data1}.txt`, 'utf-8', (error, data2) => {
//         console.log(data2);
//         fs.readFile(`./1-node-farm/starter/txt/append.txt`, 'utf-8', (error, data3) => {
//             console.log(data3);

//             fs.writeFile('./1-node-farm/starter/txt/final.txt' , `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log(`Your file has been written`);
//             });
//         });
//     });
// });
// console.log('Will read file');

/////////////////////////////////////
// SERVER 


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the OVERVIEW');
    }else if(pathName ==='/product'){
        res.end('THis is the Product');
    }else if(pathName === '/API'){
       res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
    }else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello-world'
        });
        res.end('<h1>THis page could not be found</h1>');
    }
    

});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to request on port 8000");
});
