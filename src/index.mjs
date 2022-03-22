var cubeRotation = 0.0;
var NumVertices = 246;

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
  var shaderProgram = initShaders(
    modelGL.gl,
    "vertex-shader",
    "fragment-shader"
  );

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: modelGL.gl.getAttribLocation(
        shaderProgram,
        "aVertexPosition"
      ),
      vertexColor: modelGL.gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: modelGL.gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: modelGL.gl.getUniformLocation(
        shaderProgram,
        "uModelViewMatrix"
      ),
    },
  };

  experiments();
  console.log(points);

  const buffers = initBuffers(modelGL.gl);

  var then = 0;

  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;
    drawScene(modelGL.gl, programInfo, buffers, deltaTime);
  }
  requestAnimationFrame(render);
  // set listener to sliders
  document.getElementById("rotate-x").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  })
  document.getElementById("rotate-y").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  })
  document.getElementById("rotate-z").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  })

  document.getElementById("translate-x").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  })
  document.getElementById("translate-y").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  })
  document.getElementById("translate-z").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  })

  document.getElementById("scaler").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  })
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

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(points),
    gl.STATIC_DRAW
  );

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function experiments() {
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
  console.log(indexes);

  for (var i = 0; i < indexes.length; ++i) {
    points.push(indexes[i]);
    colors.push(randomColors);
  }
}

function drawScene(gl, programInfo, buffers, deltaTime, rot, trans) {
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

  if (!rot) {
    rot = { x: 0, y: 0, z: 0 };
  }

  if (!trans) {
    trans = { x: 0, y: 0, z: 0};
  }

  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to translate
    [0.0 + trans.x, 0.0 + trans.y, 0.0 + trans.z]
  ); // amount to translate
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation, // amount to rotate in radians
    [0, 0, 1]
  ); // axis to rotate around (Z)
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation * 0.7, // amount to rotate in radians
    [0, 1, 0]
  );
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation, // amount to rotate in radians
    [1, 0, 0]
  );
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      4,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  // Set the shader uniforms\
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    gl.drawElements(gl.TRIANGLES, NumVertices, gl.UNSIGNED_SHORT, 0);
  }

  // Update the rotation for the next draw
  cubeRotation += deltaTime;
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;
