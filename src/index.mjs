var NumVertices = 36;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [30, 50, 0];

var thetaLoc;

var modelGL;

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

  //colorCube();
  experiments();

  // Set viewport
  modelGL.gl.viewport(0, 0, modelGL.gl.canvas.width, modelGL.gl.canvas.height);

  // color clearing
  modelGL.gl.clearColor(0.25, 0.25, 0.25, 1.0);

  modelGL.gl.enable(modelGL.gl.DEPTH_TEST);

  // Initialize shaders
  var program = initShaders(modelGL.gl, "vertex-shader", "fragment-shader");
  modelGL.gl.useProgram(program);

  // Create buffer ,set buffer and copy data into a buffer for position
  modelGL.vBuffer = modelGL.gl.createBuffer();
  modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.vBuffer);
  modelGL.gl.bufferData(
    modelGL.gl.ARRAY_BUFFER,
    flatten(points),
    modelGL.gl.STATIC_DRAW
  );

  var vPos = modelGL.gl.getAttribLocation(program, "vPosition");
  modelGL.gl.vertexAttribPointer(vPos, 3, modelGL.gl.FLOAT, false, 0, 0);
  modelGL.gl.enableVertexAttribArray(vPos);

  // Create buffer ,set buffer and copy data into a buffer for color
  modelGL.cBuffer = modelGL.gl.createBuffer();
  modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.cBuffer);
  modelGL.gl.bufferData(
    modelGL.gl.ARRAY_BUFFER,
    flatten(colors),
    modelGL.gl.STATIC_DRAW
  );

  var vColor = modelGL.gl.getAttribLocation(program, "vColor");
  modelGL.gl.vertexAttribPointer(vColor, 4, modelGL.gl.FLOAT, false, 0, 0);
  modelGL.gl.enableVertexAttribArray(vColor);

  thetaLoc = modelGL.gl.getUniformLocation(program, "theta");

  //event listeners for buttons

  document.getElementById("xButton").onclick = function () {
    axis = xAxis;
  };
  document.getElementById("yButton").onclick = function () {
    axis = yAxis;
  };
  document.getElementById("zButton").onclick = function () {
    axis = zAxis;
  };

  render();
}

function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

function experiments() {
  var q1 = 1;
  var q2 = 0;
  var q3 = 2;
  var q4 = 3;
  for (var i = 0; i < NumVertices / 6; i++) {
    quad(q1 + 4 * i, q2 + 4 * i, q3 + 4 * i, q4 + 4 * i);
  }
}

var z_pos = 0.5;

function quad(a, b, c, d) {
  var randomColors = [Math.random(), Math.random(), Math.random(), 1.0];

  var indices = [a, b, c, a, c, d];
  console.log(indices);

  for (var i = 0; i < indices.length; ++i) {
    points.push(cubeVertices[indices[i]]);
    colors.push(randomColors);
  }
}

function render() {
  modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT);

  theta[axis] += 2.0;
  modelGL.gl.uniform3fv(thetaLoc, theta);

  modelGL.gl.drawArrays(modelGL.gl.TRIANGLES, 0, NumVertices);

  requestAnimFrame(render);
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;
