var fs = require('fs');

module.exports = function(file, req, res) {

  var ext = "",
      type = "",
      fileExtensions = {};

  fs.exists(file, function(exists) {
    if(exists) {
      ext = require('path').extname(file).slice(1);
      fileExtensions = {
          'html':'text/html',
          'css':'text/css',
          'js':'text/javascript',
          'png':'image/png',
          'jpg':'image/jpg'
      };

      console.log('req'+req.url)
      for(var i in fileExtensions) {
        console.log(ext)
        if(ext === i) {    
            type = fileExtensions[i]
            console.log(type);
            break
         }
      }

      res.writeHead(200, { 'Content-Type': type })
      fs.createReadStream(file).pipe(res)
      console.log('served  '+req.url+" "+type);
    }

    else {
        console.log(file,' does not exists');
       }  
  })

}

    
