


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


function LoadTexture(filename) {
    var tex = gl.createTexture()
    var image = new Image()

    image.src = filename
    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
        gl.bindTexture(gl.TEXTURE_2D, null)

        console.log(filename + ' has loaded.')
    }

    return tex
}
