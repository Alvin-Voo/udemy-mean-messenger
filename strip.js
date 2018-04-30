let stripDebug = require('strip-debug');
let fs = require('fs');
let path = require('path');

let output ="";
let dist = "./public/js/app"

function fromDir(startPath,filter){
//console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);

            let data = fs.readFileSync(filename).toString();

            fs.writeFileSync(filename, stripDebug(data).toString(), function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file "+filename +" was stripped!");
            });
        };
    };
};

fromDir(dist,'chunk');
