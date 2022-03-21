var cubeRotation = 0.0;
var NumVertices = 36;

var points = [];
var colors = [];

const { mat2, mat3, mat4, vec2, vec3, vec4 } = glMatrix;

function init() {
  // Retrieve  canvas element
  modelGL.canvas = document.getElementById("webgl");
  // Get the rendering context

  modelGL.gl = WebGLUtils.setupWebGL(modelGL.canvas);
  if (!modelGL.gl) {
    alert("WebGL isn't available");
  }

  modelGL.gl.canvas.width = 0.8 * window.innerWidth;
  modelGL.gl.canvas.height = 1 * window.innerHeight;

  // Set viewport
  modelGL.gl.viewport(0, 0, modelGL.gl.canvas.width, modelGL.gl.canvas.height);

  // color clearing
  modelGL.gl.clearColor(0.25, 0.25, 0.25, 1.0);

  modelGL.gl.enable(modelGL.gl.DEPTH_TEST);

  // Initialize shaders
  var shaderProgram = initShaders(modelGL.gl, "vertex-shader", "fragment-shader");

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: modelGL.gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: modelGL.gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  generateCubeVertice();

  const buffers = initBuffers(modelGL.gl);

  var then = 0;

  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(modelGL.gl, programInfo, buffers, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function generateCubeVertice() {
  var q1 = 0;
  var q2 = 1;
  var q3 = 2;
  var q4 = 3;
  for (var i = 0; i < NumVertices / 6; i++) {
    quad(q1 + 4 * i, q2 + 4 * i, q3 + 4 * i, q4 + 4 * i);
  }
}

function quad(a, b, c, d) {
  var randomColors = [Math.random(), Math.random(), Math.random(), 1.0];

  var indexes = [a, b, c, a, c, d];
  for (var i = 0; i < indexes.length; ++i) {
    points.push(indexes[i]);
    colors.push(randomColors);
  }
}

function drawScene(gl, programInfo, buffers, deltaTime) {
  gl.clearColor(0.25, 0.25, 0.25, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = mat4.create();

  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0],
  ); // amount to translate
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation, // amount to rotate in radians
    [0, 0, 1],
  ); // axis to rotate around (Z)
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation * 0.7, // amount to rotate in radians
    [0, 1, 0],
  );
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
  // Set the shader uniforms\
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  {
    gl.drawElements(gl.TRIANGLES, NumVertices, gl.UNSIGNED_SHORT, 0);
  }
  cubeRotation += deltaTime;
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;
