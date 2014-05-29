

function Texture(srcname, min, max) {
	this.min = min
	this.max = max
	this.id = gl.createTexture()

	var image = new Image()
	image.src = srcname
	image.onload = function () {
		gl.bindTexture(gl.TEXTURE_2D, this.id)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height,
			0, gl.RGBA, gl.UNSIGNED_BYTE, image)

	}
}