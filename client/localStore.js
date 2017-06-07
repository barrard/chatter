var localStore = (function(){
	
function save(data){
	var dataCount = 0;

	for(let k in data){
		dataCount++
		localStorage.setItem(k, data[k])

	}

	return dataCount

}


function get(string){
	return localStorage.getItem(string)
}
function clear(){
	localStorage.clear()
}
function remove(string){
	localStorage.removeItem(string)
}
return {
	save:save,
	get:get,
	clear:clear,
	remove:remove
}

})()