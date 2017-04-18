
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', (req, res)=>{

  var url = 'http://www.cashbackmonitor.com/cashback-comparison/?filter-store=Amazon';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var amazonEbates;
            var json = { amazonEbates : ""};


            $('td.l.tl').filter(function(){
            var data = $(this);

            amazonEbates = data.children().last().text();

            json.amazonEbates = amazonEbates;
            })

            // $('div.subtext a').filter(function(){
            // var data = $(this);

            // release = data.children().first().text();

            // json.release = release

            // });

            // $('div.ratingValue').filter(function(){
            //     var data = $(this);

            // rating = data.children().first().text();

            //     json.rating = rating;
            // })
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')
    })
})

app.listen('8080')
console.log('Magic happens on port 8080');
exports = module.exports = app;