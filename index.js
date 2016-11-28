var path = require('path');
var express = require('express');
var multer = require('multer');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
  var fileName = path.join(__dirname + '/public', 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
      var name=file.originalname;
      if(name.indexOf('/')!=-1 || name.indexOf('..')!=-1){
        throw new Error("Invalid file name ! try harder");
      }
      cb(null, name);        
  }
})

app.post('/get-file-size', multer({ storage: storage , limits: {fileSize: 2024*1024} } ).single('file'), function(req,res){
	console.log('req.body',req.body); 
	console.log('req.file',req.file); //form files
	/* example output:
            { fieldname: 'file',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	 console.log('file',req.get('host'),req.headers.origin);
	res.send({size:req.file.size, url:req.headers.origin+'/uploads/'+req.file.originalname  });
});
