var cubeRotation = 0.0;
var PyramidNumVertices = 246;
var CubeVertices = 432;
var NumVertices = 432;
var donutNumVertices = 960;
const cubeFace = 6;

var modelGL;

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

  // Initialize shaders
  var shaderProgram = initShaders(modelGL.gl, "vertex-shader", "fragment-shader");

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: modelGL.gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: modelGL.gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: modelGL.gl.getAttribLocation(shaderProgram, "normal"),
      vertexTexCoord: modelGL.gl.getAttribLocation(shaderProgram, "texcoord"),
    },
    uniformLocations: {
      projectionMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      worldMatrix: modelGL.gl.getUniformLocation(shaderProgram, "uWorldMatrix"),
    },
  };

  if (menu_index == 0) {
    generateCubeVertice();
  } else if (menu_index == 1) {
    generatePyramidVertice();
  } else if (menu_index == 2) {
    donut.makeVerts(modelGL);
  }

  console.log(modelGL.cubePoints);
  var buffers = initBuffers(modelGL.gl);

  var then = 0;

  let mf = document.getElementById("menu-features");
  mf.addEventListener("click", () => {
    menu_index = mf.selectedIndex;
    modelGL.cubePoints = [];
    modelGL.cubeColors = [];
    if (menu_index == 0) {
      generateCubeVertice();
    } else if (menu_index == 1) {
      generatePyramidVertice();
    } else if (menu_index == 2) {
      donut.makeVerts(modelGL);
    }

    buffers = initBuffers(modelGL.gl);
    requestAnimationFrame(render);
  });

  var trans = { x: 0, y: 0, z: 0 };
  var rot = { x: 0, y: 0, z: 0 };

  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = 0;
    then = now;
    drawScene(programInfo, buffers, deltaTime, rot, trans);
  }
  requestAnimationFrame(render);
  // set listener to sliders
  document.getElementById("rotate-x").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-x").value) - 50)/50;
    rot.x = rotation;
    requestAnimationFrame(render);
  });
  document.getElementById("rotate-y").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-y").value) - 50)/50;
    rot.y = rotation;
    requestAnimationFrame(render);
  });
  document.getElementById("rotate-z").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-z").value) - 50)/50;
    rot.z = rotation;
    requestAnimationFrame(render);
  });

  document.getElementById("translate-x").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  });
  document.getElementById("translate-y").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  });
  document.getElementById("translate-z").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  });

  document.getElementById("scaler").addEventListener("input", function (e) {
    requestAnimationFrame(render);
  });
}

const donut = {
  slices: 8,
  loops: 20,
  inner_rad: 0.5,
  outerRad: 2,
  makeVerts(modelGL) {
    modelGL.donutVertices = [];
    modelGL.donutIndices = [];
    modelGL.donutNormals = [];
    modelGL.donutTexCoords = [];

    for (let slice = 0; slice <= this.slices; ++slice) {
      const v = slice / this.slices;
      const slice_angle = v * 2 * Math.PI;
      const cos_slices = Math.cos(slice_angle);
      const sin_slices = Math.sin(slice_angle);
      const slice_rad = this.outerRad + this.inner_rad * cos_slices;

      for (let loop = 0; loop <= this.loops; ++loop) {
        const u = loop / this.loops;
        const loop_angle = u * 2 * Math.PI;
        const cos_loops = Math.cos(loop_angle);
        const sin_loops = Math.sin(loop_angle);

        const x = slice_rad * cos_loops;
        const y = slice_rad * sin_loops;
        const z = this.inner_rad * sin_slices;

        modelGL.donutVertices.push(x, y, z);
        modelGL.donutNormals.push(cos_loops * sin_slices, sin_loops * sin_slices, cos_slices);

        modelGL.donutTexCoords.push(u);
        modelGL.donutTexCoords.push(v);
      }
    }

    // 0  1  2  3  4  5
    // 6  7  8  9  10 11
    // 12 13 14 15 16 17

    const vertsPerSlice = this.loops + 1;
    for (let i = 0; i < this.slices; ++i) {
      let v1 = i * vertsPerSlice;
      let v2 = v1 + vertsPerSlice;

      for (let j = 0; j < this.loops; ++j) {
        modelGL.donutIndices.push(v1);
        modelGL.donutIndices.push(v1 + 1);
        modelGL.donutIndices.push(v2);

        modelGL.donutIndices.push(v2);
        modelGL.donutIndices.push(v1 + 1);
        modelGL.donutIndices.push(v2 + 1);

        v1 += 1;
        v2 += 1;
      }
    }

    console.log(modelGL);
  },
};

function generateCubeVertice() {
  var q1 = 1;
  var q2 = 0;
  var q3 = 2;
  var q4 = 3;
  for (var i = 0; i < CubeVertices / cubeFace; i++) {
    quad(q1 + 4 * i, q2 + 4 * i, q3 + 4 * i, q4 + 4 * i);
    for (var k = 0; k < 4; k++) {
      var randomColors = [Math.random(), Math.random(), Math.random(), 1.0];
      for (var j = 0; j < 4; j++) {
        modelGL.cubeColors.push(randomColors[j]);
      }
    }
  }
}

function generatePyramidVertice() {
  var q1 = 0;
  var q2 = 1;
  var q3 = 2;
  var q4 = 3;
  for (var i = 0; i < PyramidNumVertices / cubeFace; i++) {
    quad(q1 + 4 * i, q2 + 4 * i, q3 + 4 * i, q4 + 4 * i);
    for (var k = 0; k < 10; k++) {
      var randomColors = [1, 1, 0, 1.0];
      for (var j = 0; j < 4; j++) {
        modelGL.cubeColors.push(randomColors[j]);
      }
    }
  }
}

function quad(a, b, c, d) {
  var indexes = [a, b, c, a, c, d];
  for (var i = 0; i < indexes.length; ++i) {
    modelGL.cubePoints.push([indexes[i]]);
  }
}

function drawScene(programInfo, buffers, deltaTime, rot, trans) {
  modelGL.gl.clearColor(0.25, 0.25, 0.25, 1.0); // Clear to black, fully opaque
  modelGL.gl.clearDepth(1.0); // Clear everything
  modelGL.gl.enable(modelGL.gl.DEPTH_TEST); // Enable depth testing
  modelGL.gl.depthFunc(modelGL.gl.LEQUAL); // Near things obscure far things

  modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = modelGL.gl.canvas.clientWidth / modelGL.gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  var worldMatrix = new Float32Array(16);
  mat4.identity(worldMatrix);

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = mat4.create();

  if (!rot) {
    rot = { x: 0, y: 0, z: 0 };
  }

  if (!trans) {
    trans = { x: 0, y: 0, z: 0 };
  }

  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to translate
    [0.0 + trans.x, 0.0 + trans.y, -6.0 + trans.z],
  ); // amount to translate
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    rot.z, // amount to rotate in radians
    [0, 0, 1],
  ); // axis to rotate around (Z)
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    rot.y, // amount to rotate in radians
    [0, 1, 0],
  );
  mat4.rotate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to rotate
    rot.x, // amount to rotate in radians
    [1, 0, 0],
  );
  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, buffers.position);
    modelGL.gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  if (menu_index == 2) {
    console.log("punten");
    {
      modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, buffers.texcoords);
      modelGL.gl.vertexAttribPointer(programInfo.attribLocations.vertexTexCoord, 2, modelGL.gl.FLOAT, false, 0, 0);
      modelGL.gl.enableVertexAttribArray(programInfo.attribLocations.vertexTexCoord);
    }

    {
      modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, buffers.normal);
      modelGL.gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal, 3, modelGL.gl.FLOAT, false, 0, 0);
      modelGL.gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
    }
  }

  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, buffers.color);
    modelGL.gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  // Tell WebGL which indices to use to index the vertices
  modelGL.gl.bindBuffer(modelGL.gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Tell WebGL to use our program when drawing
  modelGL.gl.useProgram(programInfo.program);
  // Set the shader uniforms\
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.worldMatrix, false, worldMatrix);

  {
    if (menu_index == 0) {
      NumVertices = CubeVertices;
    } else if (menu_index == 1) {
      NumVertices = PyramidNumVertices;
    } else if (menu_index == 2) {
      NumVertices = donutNumVertices;
    }
    modelGL.gl.drawElements(modelGL.gl.TRIANGLES, NumVertices, modelGL.gl.UNSIGNED_SHORT, 0);
  }
  cubeRotation += deltaTime;
}

function main() {
  modelGL = new ModelGL();
  init();
}

window.onload = main;
