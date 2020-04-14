const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')

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


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {
    
    const {query , pathname } = url.parse(req.url,true);
    //OVERVIEW PAGE
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200 , {'Content-type' : 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    
    //PRODUCT PAGE
    }else if(pathname ==='/product'){
        res.writeHead(200 , {'Content-type' : 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(templateProduct, product);
        res.end(output);

    //API
    }else if(pathname === '/API'){
       res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);

    //NOT-FOUND 400
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
