function initShaders(gl, vertexShaderId, fragmentShaderId) {
  var vertShdr;
  var fragShdr;

  var vertElem = document.getElementById(vertexShaderId);
  var fragElem = document.getElementById(fragmentShaderId);

  vertShdr = buildShader(gl, vertElem.text, gl.VERTEX_SHADER);
  fragShdr = buildShader(gl, fragElem.text, gl.FRAGMENT_SHADER);

  var program = gl.createProgram();
  gl.attachShader(program, vertShdr);
  gl.attachShader(program, fragShdr);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
    return -1;
  }

  return program;
}

function buildShader(gl, src, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("Error while compiling shader: " + gl.getShaderInfoLog(shader));
    return;
  }
  return shader;
}

function initBuffers(gl) {
  // Create a buffer for the cube's vertex positions.
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(points), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}
