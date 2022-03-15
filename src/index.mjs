function init() {
  BELOW_TRESHOLD = false;
  isChecked = false;
  // Retrieve  canvas element
  modelGL.canvas = document.getElementById("webgl");
  // Get the rendering context
  modelGL.gl = WebGLUtils.setupWebGL(modelGL.canvas);
  if (!modelGL.gl) {
    alert("WebGL isn't available");
  }

  modelGL.gl.canvas.width = 0.6 * window.innerWidth;
  modelGL.gl.canvas.height = window.innerHeight;

  // Set viewport
  modelGL.gl.viewport(0, 0, modelGL.canvas.width, modelGL.canvas.height);

  // color clearing
  modelGL.gl.clearColor(0.8, 0.8, 0.8, 1.0);

  // canvas clearing
  modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT);

  // Initialize shaders
  var program = initShaders(modelGL.gl, "vertex-shader", "fragment-shader");
  modelGL.gl.useProgram(program);

  // Create buffer ,set buffer and copy data into a buffer for position
  modelGL.bufferId = modelGL.gl.createBuffer();
  modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.bufferId);
  modelGL.gl.bufferData(
    modelGL.gl.ARRAY_BUFFER,
    maxNumVertices,
    modelGL.gl.STATIC_DRAW
  );

  var vPos = modelGL.gl.getAttribLocation(program, "vPosition");
  modelGL.gl.vertexAttribPointer(vPos, 2, modelGL.gl.FLOAT, false, 0, 0);
  modelGL.gl.enableVertexAttribArray(vPos);

  // Create buffer ,set buffer and copy data into a buffer for color
  modelGL.cBufferId = modelGL.gl.createBuffer();
  modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, modelGL.cBufferId);
  modelGL.gl.bufferData(
    modelGL.gl.ARRAY_BUFFER,
    maxNumVertices,
    modelGL.gl.STATIC_DRAW
  );

  var vColor = modelGL.gl.getAttribLocation(program, "vColor");
  modelGL.gl.vertexAttribPointer(vColor, 4, modelGL.gl.FLOAT, false, 0, 0);
  modelGL.gl.enableVertexAttribArray(vColor);
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;
