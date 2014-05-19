


//
// RuntimeException class
function RuntimeException(message) {
    this.name = 'RuntimeExcpetion'
    this.message = message
}



// Log system
Log = {}


// check value and logging and throw exception
Log.e = function (value, message) {

    if(value) {
        console.log(value + ' : ' + message)
        throw new RuntimeException(message)
    }
}