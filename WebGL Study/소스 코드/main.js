

/*
    Global opengl object
*/
var gl = null



/*
    Current game scene object
*/
var scene = null


//
//	Key states
//
var key = []

$(document).keydown(function (e) {
	key[e.keyCode] = true
})
$(document).keyup(function (e) {
	key[e.keyCode] = false
})

/*
    On document ready

*/
$(document).ready(function () {

    var canvas = document.getElementById('IGameCanvas')
    
    // get webgl context
    gl = canvas.getContext('experimental-webgl')
    if (!gl)
        return

	gl.viewport(0, 0, canvas.width, canvas.height)
	console.log(canvas.width + ' ' + canvas.height)

    // create scene
    scene = new BasicGameScene()

    // 
    // start game loop
    var timer = setInterval( function() {
        scene.update(0.016)
        scene.render()

        //
        // scene ended
        if (scene.isEnded()) {
            // dispose the current scene and 
            // change current scene to next
            var next = scene.getNext()
            scene.dispose()

            // if next is null
            // stop the timer
            if (next == null)
                clearInterval(timer)

            scene = next
        }
    }, 16)
});