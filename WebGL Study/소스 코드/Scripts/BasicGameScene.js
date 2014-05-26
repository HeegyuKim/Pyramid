


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

	gl.useProgram(this.program.program)
	

	var vertices = [
		 0, 1, -0.5,
		 0, -1, -0.5,
		 1, 0, -0.5,
	]

	this.buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)


	this.program.pos = gl.getAttribLocation(this.program.program, 'pos')
	gl.enableVertexAttribArray(this.program.pos)
	gl.vertexAttribPointer(this.program.pos, 3, gl.FLOAT, false, 0, 0)


	var texels = [
        0, 0,
        0, 1,
        1, 0.5
	]
	this.texture = LoadTexture('Images/Koala.jpg')
	this.tbuf = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuf)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texels), gl.STATIC_DRAW)


	this.program.tex = gl.getAttribLocation(this.program.program, 'tex')
	gl.enableVertexAttribArray(this.program.pos)
    gl.vertexAttribPointer(this.program.pos, 2, gl.FLOAT, false, 0, 0)


	// set uniforms
	this.program.proj = gl.getUniformLocation(this.program.program, 'proj')
	this.program.view = gl.getUniformLocation(this.program.program, 'view')
	this.program.xf = gl.getUniformLocation(this.program.program, 'xf')
	this.program.samp = gl.getUniformLocation(this.program.program, 'samp')

    gl.bindBuffer(gl.ARRAY_BUFFER, null)
}


var i4 = mat4.create()
var proj = mat4.create()
var view = mat4.create()
var xf = mat4.create()

var angle = 0
var x = 0

BasicGameScene.prototype.render = function () {

    mat4.perspective(proj, 90, 800.0 / 600.0, 0.1, 100)
	gl.uniformMatrix4fv(this.program.proj, false, proj)

	mat4.lookAt(view, [0, 0, 5], [0, 0, 0], [0, 1, 0])
	gl.uniformMatrix4fv(this.program.view, false, view)

	if (key[37]) {
		angle += 0.1
		x -= 0.1
	}
	if (key[39]) {
		angle -= 0.1
		x += 0.1
	}

	if (angle < -6.2)
		angle = 0
	else if (angle > 6.2)
		angle = 0

	mat4.identity(i4)

	mat4.translate(xf, i4, [x, 0, 0])
	mat4.rotateY(i4, xf, angle)
	gl.uniformMatrix4fv(this.program.xf, false, i4)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.texture.tex)
	gl.uniform1i(this.program.samp, 0)

	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)


	gl.drawArrays(gl.TRIANGLES, 0, 3)
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