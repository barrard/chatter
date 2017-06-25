//custom js appender, for module concatenation
var fs = require('fs');
var exec = require('child_process').exec
var zlib = require('zlib');

var colors = require('colors');
var logger = require('tracer').colorConsole({
                    format : "{{timestamp.green}} <{{title.yellow}}> {{message.cyan}} (in {{file.red}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                })

var relativeModulesDir = '../chatterModules'
var modules_array = ['/shadowCSS.js','/chatterData.js', '/utils.js', '/initChatter.js', '/socketHandles.js', '/adminChatter.js', '/chatterFunctions.js', '/chatRoomTabs.js'];
var mainFile = '/chat.js'
var buildFileName = '../client/chatBuild.js'
var minifiedFile = '../client/min.chat.js'

var changeFlag = false

watch()


function watch(){
	fs.watch(relativeModulesDir, function(event){
		logger.log(event)
		if(!changeFlag){
			buildStep(mainFile)

		}else{
			logger.log('changeFlag prefented this')
		}


	})
}

function runBabal(){
	var tmp = './tempBuild.js'
	var bild = './bld.js'
	logger.log('babel?')
	createBuildFile(tmp, function(fd){
		if(fd){
			readFile('../client/chatBuild.js', function(data){
				if(data){
					fs.writeFile(fd, data, function(err){
						if(err){logger.log(err)}
						exec('babel --presets=es2015 '+tmp+' > '+bild, function(err){
							if(err) {
								logger.log(err)
								}else{
									logger.log('babel done')
									exec('sudo uglifyjs ./bld.js -o '+minifiedFile+' -c -m')
									readFile(minifiedFile, function(data){
										zlib.gzip(data, function(err, result){
											if(!err){
												logger.log('success GZIPPPP!!!!!')
												createBuildFile('../client/chatzip.js', function(fd){
													fs.writeFile(fd, result, function(err){
														if(!err){
															logger.log('success writing to GZIPPPP!!!!!')
															changeFlag = false

														}else{
															logger.log('failed writing gzip file')

														}
													})
												})
											}else{
												logger.log(err)
											}
										})
									})
								}
						})
					})
				}
			})
		}
	})
	


}


function buildStep(mainFile){
	openModulesArrayAndAppendAll(relativeModulesDir, modules_array, function(buildFile){
		readFile(relativeModulesDir+mainFile, function(data){
			fs.appendFile(buildFile, '\n'+data, function(err) {
				if(err){
					logger.log(err)
					}else{
						logger.log('YOU DI IT!')
						// changeFlag = false
						runBabal()
					}
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
		    return logger.error(err);
		 }
		logger.log("File opened successfully!");
		callback(fd)

	})
}

function readFile(fileName, callback){
	fs.readFile(fileName, function(err, data){
		if(err) logger.log(err)
			callback(data)
	})
}



function openModulesArrayAndAppendAll(relativeModulesDir, modules_array, callback){
	var modulesProcessed = 0
	createBuildFile(buildFileName, function(buildFile){
		modules_array.forEach(function(item, index, array){
			readFile(relativeModulesDir+item, function(data){
				fs.appendFileSync(buildFile, '\n'+data) 
				modulesProcessed++
				logger.log('JS builder count '+modulesProcessed)
				logger.log('total count '+modules_array.length)
				if(modulesProcessed === modules_array.length){
					callback(buildFile)
				}					
			})
		})
	})
	changeFlag = true
	logger.log('did we do it? open the modules and append them all into the build file?')
	logger.log('the buidl file is called '+buildFileName+' and the main is '+mainFile)

}
