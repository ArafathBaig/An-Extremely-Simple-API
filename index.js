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
const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/(%QUANTITY%)/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(!product.organic){
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;

};

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {
    const pathName = req.url;

    //OVERVIEW PAGE
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200 , {'Content-type' : 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    
    //PRODUCT PAGE
    }else if(pathName ==='/product'){

        res.end('This is the Product');

    //API
    }else if(pathName === '/API'){
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
