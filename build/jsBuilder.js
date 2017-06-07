//custom js appender, for module concatenation
var fs = require('fs');

var relativeModulesDir = '../chatterModules'
var modules_array = ['/utils.js', '/initChatter.js', '/adminChatter.js'];
var mainFile = '/chat.js'
var buildFileName = '../src/chatBuild.js'

watch()


function watch(){
	fs.watch(relativeModulesDir, function(event){
		console.log(event)
		buildStep(mainFile)


	})
}




function buildStep(mainFile){
	openModulesArrayAndAppendAll(relativeModulesDir, modules_array, function(buildFile){
		readFile(relativeModulesDir+mainFile, function(data){
			fs.appendFile(buildFile, '\n'+data, function(err) {
				if(err)console.log(err)
					console.log('YOU DI IT!')
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

function openModulesArrayAndAppendAll(relativeModulesDir, modules_array, callback){
	var modulesProcessed = 0
	createBuildFile(buildFileName, function(buildFile){
		modules_array.forEach(function(item, index, array){
			readFile(relativeModulesDir+item, function(data){
				fs.appendFile(buildFile, data, function(err){
					if(err) {
						console.log(err)
					}else{
						modulesProcessed++
						console.log('all gravey with the file ?')
						if(modulesProcessed === modules_array.length){
							callback(buildFile)
						}					
					}
				})
			})
		})
	})

	console.log('did we do it? open the modules and append them all into the build file?')
	console.log('the buidl file is called '+buildFileName+' and the main is '+mainFile)

}
