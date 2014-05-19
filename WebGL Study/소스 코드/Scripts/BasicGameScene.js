


function BasicGameScene() {

	this.program = new Program(
			$('#IVSBasic').text(),
			$('#IFSBasic').text())
	
	try {
		Log.e(this.program.msg, "Failed to create Basic OpenGL program.")
	}
	catch (e) {
		console.log(e.name + " issued: " + e.message)
		return;
	}

	this.program.pos = gl.getAttribLocation(this.program.program, 'pos')
	gl.enableVertexAttribArray(this.program.pos)


	// set uniforms
	this.program.proj = gl.getUniformLocation(this.program.program, 'proj')
	this.program.view = gl.getUniformLocation(this.program.program, 'view')
	this.program.xf = gl.getUniformLocation(this.program.program, 'xf')
	this.program.color = gl.getUniformLocation(this.program.program, 'color')





	this.i4 = mat4.create()
	this.proj = mat4.create()
	this.view = mat4.create()
	this.xf = mat4.create()


	mat4.perspective(this.proj, 90, 800.0 / 600.0, 0.1, 100)


	var bound = {
		min: [-5, -5, -5],
		max: [5, 5, 5]
	}

	this.player = new Player([0, 0, 0], [0, 0, -1], [0, 1, 0], bound)



	gl.clearColor(0, 0, 0, 1)
	gl.clearDepth(1)

	gl.enable(gl.DEPTH_TEST)
}

BasicGameScene.prototype.render = function () {

    gl.useProgram(this.program.program)

	mat4.identity(this.i4)
	mat4.identity(this.view)
	mat4.identity(this.xf)



	var viewPos = vec3.clone(this.player.pos)
	viewPos[1] += 2
	viewPos[2] += 2

	var look = vec3.clone(this.player.vel)
	vec3.add(look, this.player.pos, look)

	mat4.lookAt(this.view, viewPos, look, this.player.up)

	gl.uniformMatrix4fv(this.program.proj, false, this.proj)
	gl.uniformMatrix4fv(this.program.view, false, this.view)




	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)




    this.player.setup(this.program)
    this.player.draw(this.program)
}




BasicGameScene.prototype.update = function (delta) {


}





BasicGameScene.prototype.isEnded = function () {

	return false
}





BasicGameScene.prototype.getNext = function () {


	return null
}



BasicGameScene.prototype.dispose = function () {


	return null
}