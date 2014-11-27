
/*
 * GET home page.
 */

var md_parser = require("node-markdown").Markdown;
var fs=require('fs');
var dir ="posts/";
var data = new Array();

fs.readdir(dir,function(err,files) {
	if(err) throw err;
	var c=0;
	files.forEach(function(file) {
		files.sort(function(a, b) {
               return fs.statSync(dir + a).mtime.getTime() - fs.statSync(dir + b).mtime.getTime();
        });
		c++;
		fs.readFile(dir+file,'utf-8',function(err,html) {
			if(err) throw err;
			if(c>0) {
				data[c] = {
					title   : file.replace('.md',''),
					link    : file.replace('.md',''),
					content : md_parser(html)
				};
			}
			if(0===--c) {
				//console.log(data);
			}
		})
	})
})

exports.index = function(req, res){
	var thisPost = null;
	for (var i = 1; i < data.length; i++) {
    	if(data[i].title == req.params.id) {
    		thisPost = data[i];
    	}
	}
  	res.render('post', { title: 'Blog Engine', postData: thisPost });
};
