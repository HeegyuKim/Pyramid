
//
//
//
function Rect3D(x, y, z, w) {
	var vertices = [
		x[0], x[1], x[2],
		y[0], y[1], y[2],
		z[0], z[1], z[2],
		w[0], w[1], w[2],
	];

	this.vb = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vb);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

}


Rect3D.prototype.setup = function () {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vb)
}


Rect3D.prototype.draw = function () {
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

Rect3D.prototype.dispose = function () {
	gl.deleteBuffer(this.vb);
}