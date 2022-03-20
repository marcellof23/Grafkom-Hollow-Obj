var NumVertices = 36;

var points = [];
var colors = [];

var theta = [0, 0, 0];

var thetaLoc;

var modelGL;

var rotationMatrix;
var rotationMatrixLoc;

var angle = 0.0;
var axis = [0, 0, 1];

var trackingMouse = false;
var trackballMove = false;

var lastPos = [0, 0, 0];
var curx, cury;
var startX, startY;

function trackballView(x, y) {
  var d, a;
  var v = [];

  v[0] = x;
  v[1] = y;

  d = v[0] * v[0] + v[1] * v[1];
  if (d < 1.0) v[2] = Math.sqrt(1.0 - d);
  else {
    v[2] = 0.0;
    a = 1.0 / Math.sqrt(d);
    v[0] *= a;
    v[1] *= a;
  }
  return v;
}

function mouseMotion(x, y) {
  var dx, dy, dz;

  var curPos = trackballView(x, y);
  if (trackingMouse) {
    dx = curPos[0] - lastPos[0];
    dy = curPos[1] - lastPos[1];
    dz = curPos[2] - lastPos[2];

    if (dx || dy || dz) {
      angle = -0.1 * Math.sqrt(dx * dx + dy * dy + dz * dz);

      axis[0] = lastPos[1] * curPos[2] - lastPos[2] * curPos[1];
      axis[1] = lastPos[2] * curPos[0] - lastPos[0] * curPos[2];
      axis[2] = lastPos[0] * curPos[1] - lastPos[1] * curPos[0];

      lastPos[0] = curPos[0];
      lastPos[1] = curPos[1];
      lastPos[2] = curPos[2];
    }
  }
  render();
}

function startMotion(x, y) {
  trackingMouse = true;
  startX = x;
  startY = y;
  curx = x;
  cury = y;

  lastPos = trackballView(x, y);
  trackballMove = true;
}

function stopMotion(x, y) {
  trackingMouse = false;
  if (startX != x || startY != y) {
  } else {
    angle = 0.0;
    trackballMove = false;
  }
}

function init() {
  // Retrieve  canvas element
  modelGL.canvas = document.getElementById("webgl");
  // Get the rendering context
  modelGL.gl = WebGLUtils.setupWebGL(modelGL.canvas);
  if (!modelGL.gl) {
    alert("WebGL isn't available");
  }

  modelGL.gl.canvas.width = 0.6 * window.innerWidth;
  modelGL.gl.canvas.height = 1 * window.innerHeight;

  colorCube();
  //experiments();

  // Set viewport
  modelGL.gl.viewport(0, 0, modelGL.gl.canvas.width, modelGL.gl.canvas.height);

  // color clearing
  modelGL.gl.clearColor(1.0, 1.0, 1.0, 1.0);

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
  modelGL.gl.vertexAttribPointer(vPos, 4, modelGL.gl.FLOAT, false, 0, 0);
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

  //thetaLoc = modelGL.gl.getUniformLocation(program, "theta");

  rotationMatrix = mat4();
  rotationMatrixLoc = modelGL.gl.getUniformLocation(program, "r");
  modelGL.gl.uniformMatrix4fv(
    rotationMatrixLoc,
    false,
    flatten(rotationMatrix)
  );

  modelGL.gl.canvas.addEventListener("mousedown", function (event) {
    var x = (2 * event.clientX) / modelGL.gl.canvas.width - 1;
    var y =
      (2 * (modelGL.gl.canvas.height - event.clientY)) /
        modelGL.gl.canvas.height -
      1;
    startMotion(x, y);
  });

  modelGL.gl.canvas.addEventListener("mouseup", function (event) {
    var x = (2 * event.clientX) / modelGL.gl.canvas.width - 1;
    var y =
      (2 * (modelGL.gl.canvas.height - event.clientY)) /
        modelGL.gl.canvas.height -
      1;
    stopMotion(x, y);
  });

  modelGL.gl.canvas.addEventListener("mousemove", function (event) {
    var x = (2 * event.clientX) / modelGL.gl.canvas.width - 1;
    var y =
      (2 * (modelGL.gl.canvas.height - event.clientY)) /
        modelGL.gl.canvas.height -
      1;
    mouseMotion(x, y);
  });

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
  quad(1, 0, 3, 2);
  quad(4, 7, 6, 5);
  quad(9, 8, 10, 11);
  quad(13, 12, 14, 15);
  quad(17, 16, 18, 19);
}

function quad(a, b, c, d) {
  var vertices2 = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),

    vec4(-0.5, -0.5, 0.75, 1.0),
    vec4(-0.5, 0.5, 0.75, 1.0),
    vec4(0.5, 0.5, 0.75, 1.0),
    vec4(0.5, -0.5, 0.75, 1.0),

    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, 0.75, 1.0),
    vec4(-0.5, 0.5, 0.75, 1.0),

    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.75, 1.0),
    vec4(0.5, -0.5, 0.75, 1.0),

    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, 0.75, 1.0),
    vec4(0.5, -0.5, 0.75, 1.0),
  ];

  var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ];

  var vertexColors = [
    [0.0, 0.0, 0.0, 1.0], // black
    [1.0, 0.0, 0.0, 1.0], // red
    [1.0, 1.0, 0.0, 1.0], // yellow
    [0.0, 1.0, 0.0, 1.0], // green
    [0.0, 0.0, 1.0, 1.0], // blue
    [1.0, 0.0, 1.0, 1.0], // magenta
    [0.0, 1.0, 1.0, 1.0], // cyan
    [1.0, 1.0, 1.0, 1.0], // white
  ];

  var indices = [a, b, c, a, c, d];

  for (var i = 0; i < indices.length; ++i) {
    points.push(vertices[indices[i]]);
    colors.push(vertexColors[a]);
  }
}

function render() {
  modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT);

  if (trackballMove) {
    axis = normalize(axis);
    rotationMatrix = mult(rotationMatrix, rotate(angle, axis));
    modelGL.gl.uniformMatrix4fv(
      rotationMatrixLoc,
      false,
      flatten(rotationMatrix)
    );
  }

  modelGL.gl.drawArrays(modelGL.gl.TRIANGLES, 0, NumVertices);

  requestAnimFrame(render);
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;
