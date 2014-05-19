


function Player(p, bound) {
	this.pos = p
	this.vel = [0, 0, 1]
	this.up = [0, 1, 0]
	this.bound = bound
	this.color = vec4.create()

	vec4.set(this.color, 1, 0, 0, 1)

	this.vb = gl.createBuffer()
	this.ib = gl.createBuffer()
	this.lineIb = gl.createBuffer()

	var vertices = [
		0, 0, -1,
		-0.25, 0.25, 0,
		 0.25, 0.25, 0,
		 0.25,-0.25, 0,
		-0.25,-0.25, 0
	]
	
	var indices = [
		0, 1, 2,
		0, 2, 3,
		0, 3, 4,
		0, 4, 1,
		1, 2, 4,
		2, 3, 4
	]

	var lineIndices = [
		0, 1,
		0, 2,
		0, 3,
		0, 4,
		1, 2,
		2, 3,
		3, 4,
		4, 1
	]
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vb)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ib)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lineIb)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(lineIndices), gl.STATIC_DRAW)
	
	
	this.i4 = mat4.create()
	this.xf = mat4.create()
	this.rot = mat4.create()
}


function clamp(v, min, max) {
	if (v < min) return min
	if (v > max) return max
	return v
}

Player.prototype.update = function (delta) 
{
	identity(this.rot)

	if(key[VK_LEFT] && !key[VK_RIGHT]) {
		mat4.rotate(this.rot, this.i4, 0.01, this.up)
	}
	else if (key[VK_RIGHT]) {
		mat4.rotate(this.rot, this.i4, -0.01, this.up)
	}

	var newVel = vec3.clone(this.pos)




	//
	// 위치 값을 제한한다
	for(var i = 0; i < 3; ++i)
		this.pos[i] = clamp(this.pos[i], this.bound.min[i], this.bound.max[i])


}


Player.prototype.setup = function (program) {

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vb)
	gl.vertexAttribPointer(program.pos, 3, gl.FLOAT, false, 0, 0)


	mat4.identity(i4)
	mat4.identity(xf)
	mat4.rotate
	gl.uniformMatrix4fv(program.xf, false, this.xf)

}

Player.prototype.draw = function (program) {

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ib)
	gl.uniform4fv(program.color, this.color)
	gl.drawElements(gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0)


	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ib)
	gl.uniform4fv(program.color, [1, 1, 1, 1])
	gl.drawElements(gl.LINES, 16, gl.UNSIGNED_SHORT, 0)
}