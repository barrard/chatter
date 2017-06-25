//custom js appender, for module concatenation
var fs = require('fs');

var relativeModulesDir = '../indexHTMLmodules'
var templateFolderName = '/templates'
var head = '/head.html'
var footer = '/footer.html'
var modules_array = ['/login.html', '/admin.html'];
var mainFile = '/chat.js'
var buildFileName = '../client/index.html'

watch()


function watch(){
	fs.watch(relativeModulesDir, function(event){
		console.log(event)
		buildStep(head, footer)
	})
	fs.watch(relativeModulesDir+templateFolderName, function(event){
		console.log(event)
		buildStep(head, footer)
	})
}


function start_head(buildFileName, head, callback){
	createBuildFile(buildFileName, function(buildFile){
		readFile(relativeModulesDir+head, function(data){
			fs.appendFile(buildFile, data, function(err){
				if(err) {
				}else{
					callback(buildFile)
				}
			})
		})
	})
}




function buildStep(head, footer){
	start_head(buildFileName, head, function(buildFile){
		openModulesArrayAndAppendAll(templateFolderName, buildFile, relativeModulesDir, modules_array, function(buildFile){
			readFile(relativeModulesDir+footer, function(data){
				fs.appendFile(buildFile, '\n'+data, function(buildFile, err) {
					if(err){
						console.log(err)
						}else{
							console.log('YOU DI IT!')
						}
				})

			})
		})

	})


}

function createBuildFile(buildFileName, callback){
	openFile(buildFileName, 'w', function(fd){
		callback(fd)
	})


}


function openFile(filename, flag, callback){
	fs.open(filename, flag, function(err, fd){
		 if (err) {
		    return console.error(err);
		 }
		console.log("File opened successfully!");
		callback(fd)

	})
}

function readFile(fileName, callback){
	fs.readFile(fileName, function(err, data){
		if(err) console.log(err)
			callback(data)
	})
}


function openModulesArrayAndAppendAll(templateFolderName, buildFile, relativeModulesDir, modules_array, callback){
	var modulesProcessed = 0
		modules_array.forEach(function(item, index, array){
			readFile(relativeModulesDir+templateFolderName+item, function(data){
				fs.appendFileSync(buildFile, data)
				modulesProcessed++
				console.log('HTML builder count '+modulesProcessed)
				console.log('total count '+modules_array.length)
				if(modulesProcessed === modules_array.length){
					callback(buildFile)
				}	
			})
		})

	console.log('did we do it? open the modules and append them all into the build file?')
	console.log('the buidl file is called '+buildFileName+' and the main is '+mainFile)

}
