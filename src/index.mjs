//const { mat4 } = glMatrix;

var left = -1.0;
var right = 1.0;
var top = 1.0;
var bottom = -1.0;

const fieldOfView = (45 * Math.PI) / 180; // in radians

const zNear = -1;
const zFar = 1;

var projectionMatrix = mat4.create();
var modelViewMatrix = mat4.create();

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

  modelGL.aspect = modelGL.gl.canvas.clientWidth / modelGL.gl.canvas.clientHeight;
  modelGL.ratio = modelGL.gl.canvas.width / modelGL.gl.canvas.height;

  if (menu_index == 0) {
    generateCubeVertice(modelGL);
  } else if (menu_index == 1) {
    generatePyramidVertice(modelGL);
  } else if (menu_index == 2) {
    donut.makeVerts(modelGL);
  }
  var buffers = initBuffers(modelGL.gl);

  let mf = document.getElementById("menu-features");
  mf.addEventListener("click", () => {
    menu_index = mf.selectedIndex;
    modelGL.cubePoints = [];
    modelGL.cubeColors = [];
    if (menu_index == 0) {
      generateCubeVertice(modelGL);
    } else if (menu_index == 1) {
      generatePyramidVertice(modelGL);
    } else if (menu_index == 2) {
      donut.makeVerts(modelGL);
    }

    buffers = initBuffers(modelGL.gl);
    requestAnimationFrame(render);
  });

  var trans = { x: 0, y: 0, z: 0 };
  var rot = { x: 0, y: 0, z: 0 };
  var scale = { x: 0, y: 0, z: 0 };

  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = 0;
    then = now;

    drawScene(programInfo, buffers, deltaTime, rot, trans, scale);
  }
  requestAnimationFrame(render);

  // set listener to sliders

  document.getElementById("rotate-x").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-x").value) - 50) / 50;
    rot.x = rotation;
    requestAnimationFrame(render);
  });
  document.getElementById("rotate-y").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-y").value) - 50) / 50;
    rot.y = rotation;
    requestAnimationFrame(render);
  });
  document.getElementById("rotate-z").addEventListener("input", function (e) {
    var rotation = (parseInt(document.getElementById("rotate-z").value) - 50) / 50;
    rot.z = rotation;
    requestAnimationFrame(render);
  });

  document.getElementById("translate-x").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-x").value) - 50)) / 100;
    trans.x = translate;
    requestAnimationFrame(render);
  });
  document.getElementById("translate-y").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-y").value) - 50)) / 100;
    trans.y = translate;
    requestAnimationFrame(render);
  });
  document.getElementById("translate-z").addEventListener("input", function (e) {
    var translate = (5 * (parseInt(document.getElementById("translate-z").value) - 50)) / 100;
    trans.z = translate;
    requestAnimationFrame(render);
  });

  document.getElementById("scale-x").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-x").value) - 50) / 100;
    scale.x = scaler;
    requestAnimationFrame(render);
  });
  document.getElementById("scale-y").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-y").value) - 50) / 100;
    scale.y = scaler;
    requestAnimationFrame(render);
  });
  document.getElementById("scale-z").addEventListener("input", function (e) {
    var scaler = (parseInt(document.getElementById("scale-z").value) - 50) / 100;
    scale.z = scaler;
    requestAnimationFrame(render);
  });

  document.getElementById("camera").addEventListener("input", function (e) {
    var scaler = parseInt(document.getElementById("camera").value);
    cameraAngleRadians = degToRad(scaler);
    requestAnimationFrame(render);
  });

  document.getElementById("zoom").addEventListener("input", function (e) {
    var scaler = parseInt(document.getElementById("zoom").value);
    radius = scaler;
    requestAnimationFrame(render);
  });
  let mfv = document.getElementById("menu-features-view");
  mfv.addEventListener("click", () => {
    menu_index_view = mfv.selectedIndex;
    requestAnimationFrame(render);
  });

  // Set event listener for export button
  let formatJSONPrefix = "data:text/json;charset=utf-8,";
  const exportBtn = document.getElementById("export-button");
  exportBtn.addEventListener("click", () => {
    var string_data = formatJSONPrefix + encodeURIComponent(JSON.stringify(modelGL));
    var download_button = document.getElementById("download-link");
    download_button.setAttribute("href", string_data);
    download_button.setAttribute("download", "data.json");
    download_button.click();
  });

  const importBtn = document.getElementById("import-button");
  importBtn.addEventListener("click", () => {
    if (window.FileList && window.FileReader && window.File) {
      uploadBtn.click();
    } else {
      alert("file upload not supported by your browser!");
    }
  });

  const uploadBtn = document.getElementById("upload-button");
  uploadBtn.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const read_file = new FileReader();
    read_file.addEventListener("load", async (e) => {
      try {
        var data = await JSON.parse(e.target.result);
        if (data) {
          modelGL.load_data(data);
          render_data(modelGL);
        }
      } catch (err) {
        alert(`invalid json file\n${err}`);
      }
    });
    read_file.readAsText(file);
  });
}

function quad(a, b, c, d) {
  var indexes = [a, b, c, a, c, d];
  for (var i = 0; i < indexes.length; ++i) {
    modelGL.cubePoints.push([indexes[i]]);
  }
}

function drawScene(programInfo, buffers, deltaTime, rot, trans, scale) {
  modelGL.gl.clearColor(0.25, 0.25, 0.25, 1.0); // Clear to black, fully opaque
  modelGL.gl.clearDepth(1.0); // Clear everything
  modelGL.gl.enable(modelGL.gl.DEPTH_TEST); // Enable depth testing
  modelGL.gl.depthFunc(modelGL.gl.LEQUAL); // Near things obscure far things

  modelGL.gl.clear(modelGL.gl.COLOR_BUFFER_BIT | modelGL.gl.DEPTH_BUFFER_BIT);

  projectionMatrix = mat4.create();
  modelViewMatrix = mat4.create();

  if (menu_index_view == 0) {
    mat4.perspective(projectionMatrix, fieldOfView, modelGL.aspect, zNear, zFar);
  } else if (menu_index_view == 1) {
    eye = vec3(0, 0, 1);
    mat4.lookAt(modelViewMatrix, eye, at, up);
    mat4.ortho(projectionMatrix, -1, 1, -1, 1, -1.5, 10);
  } else if (menu_index_view == 2) {
    mat4.perspective(projectionMatrix, fieldOfView, modelGL.aspect, zNear, zFar);
  }

  if (!rot) {
    rot = { x: 0, y: 0, z: 0 };
  }

  if (!trans) {
    trans = { x: 0, y: 0, z: 0 };
  }

  if (!scale) {
    scale = { x: 0, y: 0, z: 0 };
  }

  console.log(modelViewMatrix, projectionMatrix);

  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to translate
    [0.0, 0.0, -10.0],
  ); // amount to translate
  {
    modelGL.gl.bindBuffer(modelGL.gl.ARRAY_BUFFER, buffers.position);
    modelGL.gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, modelGL.gl.FLOAT, false, 0, 0);
    modelGL.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  if (menu_index == 2) {
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
  //var cameraMatrix;

  mat4.rotateY(modelViewMatrix, modelViewMatrix, cameraAngleRadians);

  mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, radius * 1.5]);

  // Make a view matrix from the camera matrix
  mat4.invert(modelViewMatrix, modelViewMatrix);

  // Compute a view projection matrix
  mat4.multiply(projectionMatrix, projectionMatrix, modelViewMatrix);

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
  mat4.translate(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to translate
    [trans.x, trans.y, trans.z],
  ); // amount to translate
  mat4.scale(
    modelViewMatrix, // dest matrix
    modelViewMatrix, // matrix to translate
    [1.0 + scale.x, 1.0 + scale.y, 1.0 + scale.z],
  ); // amount to translate

  var wMatrix = new Float32Array(16);
  mat4.identity(wMatrix);

  console.log(modelViewMatrix, projectionMatrix);

  // Set the shader uniforms
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  modelGL.gl.uniformMatrix4fv(programInfo.uniformLocations.worldMatrix, false, wMatrix);

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
