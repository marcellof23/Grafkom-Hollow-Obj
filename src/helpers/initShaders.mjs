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

  var arr_position = [];
  var arr_colors = [];
  var arr_indices = [];
  var arr_normals = [];
  if (menu_index == 0) {
    arr_position = positions;
    arr_colors = modelGL.cubeColors;
    arr_indices = modelGL.cubePoints;
    arr_normals = modelGL.cubeNormals;
  } else if (menu_index == 1) {
    arr_position = pyramidPositions;
    arr_colors = modelGL.cubeColors;
    arr_indices = modelGL.cubePoints;
    arr_normals = modelGL.pyramidNormals;
  } else if (menu_index == 2) {
    arr_position = modelGL.donutVertices;
    arr_colors = modelGL.cubeColors;
    arr_indices = modelGL.donutIndices;
    arr_normals = modelGL.donutNormals;
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr_position), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr_colors), gl.STATIC_DRAW);

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr_normals), gl.STATIC_DRAW);

  // var texBuffer, normalBuffer;
  // if (menu_index == 2) {
  //   texBuffer = gl.createBuffer();
  //   gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelGL.donutTexCoords), gl.STATIC_DRAW);

  //   normalBuffer = gl.createBuffer();
  //   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelGL.donutNormals), gl.STATIC_DRAW);
  // }

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(arr_indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
    // texcoords: texBuffer,
    normal: normalBuffer,
  };
}
