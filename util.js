module.exports = {
	handleError:function(err){
		if(err){
			logger.log('-----HandleError helper function found an error------'.rainbow)
			logger.log(err)
			logger.log('------End of error-------'.rainbow)
			return false
		}else{
			return true
		}
	}
}