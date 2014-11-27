
/*
 * GET home page.
 */

var md_text = "###Hi im a test", //"**bold** *italic* [link](http://www.neti.ee) `code block`",
    md_parser = require("node-markdown").Markdown;

//console.log(md_parser(md_text));



exports.index = function(req, res){
  res.render('index', { title: 'Express', content: md_parser(md_text) });
};