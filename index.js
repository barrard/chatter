var express = require('express');
var cors = require('cors')
var corsOptions = {
	credentials: true,
	// origin: 'http://localhost:7777',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
var fs = require('fs');

var db = require('./chatterDB.js')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var logger = require('tracer').colorConsole({
	format: "{{timestamp.green}} <{{title.yellow}}> {{message.cyan}} (in {{file.red}}:{{line}})",
	dateformat: "HH:MM:ss.L"
})

var app = express();
var server = require('http').createServer(app)
var io = require('socket.io')(server);

app.use(cors())
app.use(session({
	store: new mongoStore({
		url: 'mongodb://localhost:27017/chatter'
		// ,ttl: 10*60*24
		// db: 'users',
		// host: 'mongodb://localhost',
		// port: 27017
	}),
	secret: 'topsecret',
	resave: true,
	saveUninitialized: true,
	name: 'chatSession',
	cookie: {
		// sameSite:'lax',
		secure: false,
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 365 //one year
	}
}))

app.get('/', function(req, res) {
	logger.log(req.headers)
	logger.log('inde9x')
	res.sendFile('index.html', {
		root: __dirname + '/client/'
	}, function(err) {
		if (err) {
			logger.log(err)
		} else {
			logger.log('Sent:');
		}
	});


})

app.use(express.static('client'));
// app.use(verifyUser)

// function verifyUser(req, res, next) {
// 	// logger.log('MIDDLE WEAR')
// 	// logger.log(req.session)
// 	if (req.session.loggedIn) {
// 		logger.log('this user is logged in')

// 	} else {
// 		logger.log('this user is NOT logged in')

// 	}

// 	next()
// }


function serveFiles(fileRequested, res) {
	fs.readFile(__dirname + '/client' + fileRequested,
		// fs.readFile(__dirname + req.url,
		function(err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
}


app.get('/chatter.css', function(req, res) {
	var fileRequested = '/chatter.css'
	serveFiles(fileRequested, res)

})


app.get('/chatBuild/:api', function(req, res) {
	logger.log('chatBuild endpoint hit '.rainbow)
	logger.log(req.params.api)
	logger.log(req.headers)
	var fileRequested = '';
	var domainName = req.headers.host
	db.find({
		// registeredIp:ip,
		domain: domainName,
		apikey: req.params.api
	}, 'registeredDomains', function(items) {
		if (items.length === 0) {
			logger.log('length === 0 send the adminSetup??')
			fileRequested = '/adminSetup.js';
		} else {
			logger.log(items)
			// fileRequested = '/chat.min.js';
			fileRequested = '/chatzip.js';
			res.setHeader('Content-Encoding', 'gzip')
		}
		serveFiles(fileRequested, res)
	})
})




app.get('/signOut', function(req, res) {
	var respObj = {}
	req.session.loggedIn = false
	respObj.loggedIn = false

	respObj = JSON.stringify(respObj)
	res.send(respObj)
})

app.post('/addDomain', function(req, res) {
	// var respObj={};

	var body = ''
	// var resp ={}
	req.on('data', function(data) {
		// logger.log(data)
		logger.log('data event')

		body += data
	})
	req.on('end', function() {
		logger.log('end event, body of data is ')

		logger.log(body)
		body = JSON.parse(body)
		logger.log(body)

		body = JSON.parse(body)
		logger.log(body)

		logger.log(body.domain)


		db.find({
			domain: body.domain
		}, 'registeredDomains', function(item) {
			if (item.length === 0) {
				logger.log('didnt find this domain in the registeredDomains')
				db.insertOne(body, 'registeredDomains', {}, function(item) {
					logger.log(item.ops)
					res.send({
						success: 'Successfully added ' + body.domain
					})

				})

			} else {
				logger.log('domain already registered')
				res.send({
					err: 'This domain already exists'
				})
			}
		})

	})

})



//  $$$$$$$       RETURNS ADMIN FOR TESTING     $$$      /////////////
// app.get('/checkIfLoggedin', function(req, res){
//  var respObj={}
//  logger.log('check if user is logged in')
//  if(req.session.loggedIn){

//    respObj.loggedIn=false
//    respObj=JSON.stringify(respObj)
//    res.send(respObj)
//    logger.log('loggedIn = false')

//  }else{
//    respObj.loggedIn=true
//    respObj=JSON.stringify(respObj)
//    res.send(respObj)
//    logger.log('loggedIn = true')

//  }
// })


app.get('/checkIfLoggedin', function(req, res) {
	var respObj = {}
	logger.log('check if user is logged in')
	// logger.log(req.headers)
	if (req.session.loggedIn) {
		// logger.log('req.session.loggedIn')
		// logger.log(req.session)
		respObj.loggedIn = true
		respObj.apikey = req.session.apikey
		respObj.username = req.session.username

		respObj = JSON.stringify(respObj)
		res.send(respObj)
		logger.log('loggedIn = true')


	} else {
		// logger.log('else')
		// logger.log('req.session.loggedIn')
		// logger.log(req.session)
		respObj.loggedIn = false
		respObj = JSON.stringify(respObj)
		res.send(respObj)
		logger.log('loggedIn = false')

	}
})

// app.get('/admin', function(req, res){
//  if(!req.session.loggedIn){
//    res.redirect('/')
//  }else{
//    logger.log('admin hit')
//    logger.log(req.headers)
//    res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);

//    res.sendFile('admin.html',{root: __dirname + '/pages/'}, function (err) {
//        if (err) {
//          logger.log(err)
//        } else {
//          logger.log('Sent:');
//        }
//      });
//  }
// })

// app.get('/userInfo', function(req, res){
//  var username = req.session.username
//  var respObj={}
//  if(!req.session.loggedIn){
//    // res.redirect('/')
//    respObj.redirect=true
//    respObj.url='http://127.0.0.1:7777'
//    res.send(respObj)
//    return false
//  }else{

//    db.find({
//      username:username
//      }, 'users', function(items){
//        logger.log(items)
//        if(items.length===0){
//          res.redirect('/')
//        }else if(items.length===1){
//          logger.log('we got a match, check dakine password')
//            logger.log(items)
//            res.end(JSON.stringify(items[0]));


//        }

//    })

//  }
// })

app.post('/login', function(req, res) {
	logger.log('we got a login request')
	logger.log(req.session)
	handleRegisterLogin('login', req, res)

})
app.post('/register', function(req, res) {
	logger.log('we got a login request')
	logger.log(req.session)
	handleRegisterLogin('register', req, res)

})

var port = 8081
server.listen(port)




function generateRandomAPIKey() {
	var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUSWXYZ1234567890'
	var keysArray = randomChars.split('')
	var max = randomChars.length
	var keyLength = 20;
	var apikey = []
	for (let x = 0; x < keyLength; x++) {
		var char = keysArray[Math.floor(Math.random() * (62))]
		apikey.push(char)
	}
	apikey = apikey.join('')
	logger.log(apikey)
	return apikey


}

function handleRegisterLogin(type, req, res) {
	var body = ''
	var resp = {}
	logger.log('handle the ' + type + ' request')
	req.on('data', function(data) {
		logger.log('data')

		body += data
	})
	req.on('end', function() {
		logger.log('body')
		body = JSON.parse(body)
		logger.log(body.username)


		if (type === 'login' && req.method === 'POST') {

			db.find({
				username: body.username
			}, 'users', function(items) {
				logger.log(items)
				if (items.length === 0) {
					resp.err = 'Incorrect username/Password'
					res.end(JSON.stringify(resp))
				} else if (items.length === 1) {
					logger.log('we got a match, check dakine password')
					if (items[0].password === body.password) {
						req.session.loggedIn = true
						req.session.username = body.username
						req.session.apikey = items[0].apikey
						logger.log('matching password, redirect to admin!')
						resp.success = 'Logging in....'
						logger.log(req.session)

						resp.loggedIn = true
						resp.userData = items[0]
						// resp.redirect='http://127.0.0.1:7777/admin'
						// logger.log('before')
						// logger.log(res.get('Set-Cookie'))
						res.end(JSON.stringify(resp));
						// logger.log('after')
						// logger.log(res.get('Set-Cookie'))

					}

				}

			})



		} else if (type === 'register' && req.method === 'POST') {
			logger.log('register a user')
			db.find({
				username: body.username
			}, 'users', function(items) {
				logger.log(items)
				if (items.length !== 0) {
					logger.log('user already exists')
					resp.err = 'Username not available'
					res.end(JSON.stringify(resp))
				} else {
					logger.log('log user')
					var apikey = generateRandomAPIKey()
					db.insertOne({
						username: body.username,
						password: body.password,
						apikey: apikey
					}, 'users', { /*empty object*/ }, function(data) {
						if (data) {

							logger.log(data.ops)
							logger.log('new user registered')
							req.session.loggedIn = true
							req.session.username = body.username
							req.session.apikey = apikey

							// res.redirect('/admin')
							resp.success = 'Creating new account....'
							resp.loggedIn = true
							resp.userData = data.ops
							// resp.redirect='http://127.0.0.1:7777/admin'
							res.end(JSON.stringify(resp));

						}
					})
				}

			})


		}

	})


}




var socketArray = []
var socketRoomObj = {}
io.on('connection', function(socket) {
	logger.log('socket connection event'.rainbow)
	logger.log('socketCount = '.bgWhite.blue+socketArray.length)
	// logger.log(socket.request.headers)
	socket.emit('connection', 'tell me your name')
	socket.on('newChatter', function(socketNameObj) {
		logger.log(socketNameObj)
		socketArray.push(socketNameObj)

		logger.log('sweet we got a newChatter socket Event'.bgCyan.white)
		logger.log(socketNameObj)
		logger.log(socketArray)

		socket.emit('newChatterInit', socketArray)
		socket.broadcast.emit('newChatter', socketNameObj);


	})

	// socket.on('returningUser', function(getUsernamefn) {
	// 	logger.log('got a returningUser'.bgMagenta)
	// 	logger.log(getUsernamefn)

	// })
	// 	socket.on('usernameTest', function(getUsernamefn) {
	// 	logger.log('got a usernameTest'.bgMagenta)
	// 	logger.log(getUsernamefn)

	// })

	socket.on('reconnecting_user', function(username) {
		logger.log('reconnecting_user'.bgMagenta)

	})
	socket.on('verifyAccount', function(d) {
		logger.log(d)

	})




	socket.on('requestingRoom', function(room) {
		socket.join(room)
		logger.log('joining room '+room.bgYellow.white)
		socket.emit('roomJoined', room)
	})


	socket.on('inputText', function(d) {
		logger.log('got chat text to broadcast')
		socket.broadcast.emit('inputText', d)
	})



	socket.on('disconnect', function() {
		logger.log('disconnection! ' + socket.id)

		var pos = socketArray.map(function(i) { return i.socketId; }).indexOf(socket.id);
		logger.log(pos+' is not negative???')
		logger.log('socketCount = '.bgRed.white+socketArray.length)



		if (pos > -1) {
			logger.log('remove this socket '.green + socket.id + ' from socketArray')
			socketArray.splice(pos, 1)
			socket.broadcast.emit('userDisconnected', {
			id: socket.id,
		})
		} else {
			logger.log('this socket is lost...? '.red + socket.id)
		}


	})


});

logger.log('listing on port '.rainbow + port)