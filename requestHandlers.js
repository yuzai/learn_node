var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs'),
    formidable = require("formidable");

function start(response){
  console.log("request handler 'start' was called");
  // var content = 'empty';
  //
  // exec('ls -lah',function(error,stdout,stderr){
  //   response.writeHead(200,{"Content-Type":"text/plain"});
  //   response.write(stdout);
  //   response.end();
  // })

  // function sleep(milsecond){
  //   var starttime = new Date().getTime();
  //   while(new Date().getTime() < starttime + milsecond);
  // }
  // sleep(10000);
  // return content;

  var body ='<html>'+
   '<head>'+
   '<meta http-equiv="Content-Type" content="text/html; '+
   'charset=UTF-8" />'+
   '</head>'+
   '<body>'+
   '<form action="/upload" method="post" enctype = "multipart/form-data">'+
   '<input type = "file" name="upload" multiple = "multiple">'+
   '<input type="submit" value="Upload file" />'+
   '</form>'+
   '</body>'+
   '</html>';

   response.writeHead(200,{"Content-Type":"text/html"});
   response.write(body);
   response.end();
}
function upload(response,request){
  console.log("request handler 'upload' was called");
  var form =new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request,function(err, fields, files){
    console.log('parsing done');
    // fs.renameSync(files.upload.path,'G:/tmp/test.jpg');
    fs.readFile(files.upload.path,'binary',function(err,file){
      if(err){
        response.writeHead(500,{'Content-Type':'text/plain'});
        response.write(err+'\n');
        response.end();
      }
      else {
        response.writeHead(200,{'Content-Type':'text/plain'});
        response.write(file,'binary');
        response.end();
      }
    });
    // response.writeHead(200,{'content-type':'text/plain'});
    // response.write('<img src="/show" >');
    // response.end();
  });
}

function show(response){
  console.log('request handler "show" was called');
  fs.readFile('/tmp/test.jpg','binary',function(err,file){
    if(err){
      response.writeHead(500,{'Content-Type':'text/plain'});
      response.write(err+'\n');
      response.end();
    }
    else {
      response.writeHead(200,{'Content-Type':'text/plain'});
      response.write(file,'binary');
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
