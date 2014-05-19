


//
// compile the shader and return error message
function CompileShader(shader, source)
{
    Log.e(shader == null, 'shader cannot be null')

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    return gl.getShaderInfoLog(shader);
}


//
// link the program with shaders
// and return error message.
function LinkProgram(program, vertexShader, fragShader) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    return gl.getProgramInfoLog(program);
}

//
//
//
function Program(vsrc, fsrc) {
	this.vs = gl.createShader(gl.VERTEX_SHADER)
	this.fs = gl.createShader(gl.FRAGMENT_SHADER)
	this.program = gl.createProgram()
	this.msg = null

	this.msg = CompileShader(this.vs, vsrc)
	if (this.msg) return this.msg

	this.msg = CompileShader(this.fs, fsrc)
	if (this.msg) return this.msg

	this.msg = LinkProgram(this.program, this.vs, this.fs)
	if (this.msg) return this.msg
}


//
// use the program
Program.prototype.use = function () {
	gl.useProgram(this.program)
}


//
// get Attribute Location
Program.prototype.attrib = function(name) {
	return gl.getAttribLocation(name)
}
