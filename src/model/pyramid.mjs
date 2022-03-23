const pyramidThickness = 0.1;

function generatePyramidVertice(modelGL) {
  var q1 = 0;
  var q2 = 1;
  var q3 = 2;
  var q4 = 3;
  for (var i = 0; i < PyramidNumVertices / cubeFace; i++) {
    quad(q1 + 4 * i, q2 + 4 * i, q3 + 4 * i, q4 + 4 * i);
    for (var k = 0; k < 10; k++) {
      var randomColors = [colorRgb.r, colorRgb.g, colorRgb.b, 1];
      for (var j = 0; j < 4; j++) {
        modelGL.cubeColors.push(randomColors[j]);
      }
    }
  }
  modelGL.pyramidNormals = getNormals(pyramidPositions);
  modelGL.pyramidPositions = pyramidPositions;
}

const pyramidPositions = [
  // left bottom bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, 1.0,
  -1.0 + pyramidThickness, -1.0, 1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, 1.0,
  -1.0, -1.0 + pyramidThickness, 1.0,
  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0 + pyramidThickness, -1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, -1.0,
  -1.0 + pyramidThickness, -1.0, -1.0,
  -1.0, -1.0, -1.0,
  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, 1.0,
  -1.0, -1.0 + pyramidThickness, 1.0,
  -1.0, -1.0 + pyramidThickness, -1.0,
  -1.0, -1.0, -1.0,
  // right face (urutan bener sesuai kaidah tangan kanan)
  -1.0 + pyramidThickness, -1.0, 1.0,
  -1.0 + pyramidThickness, -1.0, -1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, -1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, 1.0,
  // top face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0 + pyramidThickness, 1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, 1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, -1.0,
  -1.0, -1.0 + pyramidThickness, -1.0,
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, 1.0,
  -1.0, -1.0, -1.0,
  -1.0 + pyramidThickness, -1.0, -1.0,
  -1.0 + pyramidThickness, -1.0, 1.0,

  // right bottom bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0, 1.0,
  1.0, -1.0 + pyramidThickness, 1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, 1.0,
  1.0 - pyramidThickness, -1.0, 1.0,
  // back face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0, -1.0,
  1.0 - pyramidThickness, -1.0, -1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, -1.0,
  1.0, -1.0 + pyramidThickness, -1.0,
  // left face (urutan bener sesuai kaidah tangan kanan)
  1.0 - pyramidThickness, -1.0, 1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, 1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, -1.0,
  1.0 - pyramidThickness, -1.0, -1.0,
  // right face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0, 1.0,
  1.0, -1.0, -1.0,
  1.0, -1.0 + pyramidThickness, -1.0,
  1.0, -1.0 + pyramidThickness, 1.0,
  // top face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0 + pyramidThickness, 1.0,
  1.0, -1.0 + pyramidThickness, -1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, -1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, 1.0,
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0, 1.0,
  1.0 - pyramidThickness, -1.0, 1.0,
  1.0 - pyramidThickness, -1.0, -1.0,
  1.0, -1.0, -1.0,

  // front bottom bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, -1.0 + pyramidThickness, 1.0,
  -1.0, -1.0 + pyramidThickness, 1.0,
  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, 1.0 - pyramidThickness,
  1.0, -1.0, 1.0 - pyramidThickness,
  1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  -1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, 1.0,
  -1.0, -1.0 + pyramidThickness, 1.0,
  -1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  -1.0, -1.0, 1.0 - pyramidThickness,
  // right face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0, 1.0,
  1.0, -1.0, 1.0 - pyramidThickness,
  1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  1.0, -1.0 + pyramidThickness, 1.0,
  // top face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0 + pyramidThickness, 1.0,
  1.0, -1.0 + pyramidThickness, 1.0,
  1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  -1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, 1.0,
  -1.0, -1.0, 1.0 - pyramidThickness,
  1.0, -1.0, 1.0 - pyramidThickness,
  1.0, -1.0, 1.0,

  // back bottom bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, -1.0 + pyramidThickness,
  1.0, -1.0, -1.0 + pyramidThickness,
  1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  -1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, -1.0,
  -1.0, -1.0 + pyramidThickness, -1.0,
  1.0, -1.0 + pyramidThickness, -1.0,
  1.0, -1.0, -1.0,
  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, -1.0,
  -1.0, -1.0, -1.0 + pyramidThickness,
  -1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  -1.0, -1.0 + pyramidThickness, -1.0,
  // right face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0, -1.0,
  1.0, -1.0 + pyramidThickness, -1.0,
  1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  1.0, -1.0, -1.0 + pyramidThickness,
  // top face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0 + pyramidThickness, -1.0,
  -1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  1.0, -1.0 + pyramidThickness, -1.0,
  // bottom face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0, -1.0,
  1.0, -1.0, -1.0,
  1.0, -1.0, -1.0 + pyramidThickness,
  -1.0, -1.0, -1.0 + pyramidThickness,

  // left front bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.0 , -1.0 + pyramidThickness, 1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, 1.0,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  // back face (urutan bener sesuai kaidah tangan kanan)
  -1.0 , -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0 + pyramidThickness, 1.0,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  -1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  // right face (urutan bener sesuai kaidah tangan kanan)
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, 1.0,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,

  // right front bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0 + pyramidThickness, 1.0,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, 1.0,
  // back face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  // left face (urutan bener sesuai kaidah tangan kanan)
  1.0 - pyramidThickness, -1.0 + pyramidThickness, 1.0,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, 1.0 - pyramidThickness,
  // right face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0 + pyramidThickness, 1.0,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  1.0, -1.0 + pyramidThickness, 1.0 - pyramidThickness,

  // left back bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  -1.0 , -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  // back face  (urutan bener sesuai kaidah tangan kanan)
  -1.0 , -1.0 + pyramidThickness, -1.0,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, -1.0,
  // left face (urutan bener sesuai kaidah tangan kanan)
  -1.0, -1.0 + pyramidThickness, -1.0,
  -1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  // right face (urutan bener sesuai kaidah tangan kanan)
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, -1.0,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  -1.0 + pyramidThickness, -1.0 + pyramidThickness, -1.0 + pyramidThickness,

  // right back bar
  // front face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  // back face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0 + pyramidThickness, -1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, -1.0,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  // left face (urutan bener sesuai kaidah tangan kanan)
  1.0 - pyramidThickness, -1.0 + pyramidThickness, -1.0,
  1.0 - pyramidThickness, -1.0 + pyramidThickness, -1.0 + pyramidThickness,
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  // right face (urutan bener sesuai kaidah tangan kanan)
  1.0, -1.0 + pyramidThickness, -1.0,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  1.0, -1.0 + pyramidThickness, -1.0 + pyramidThickness,

  // cap (urutan bener sesuai kaidah tangan kanan)
  0.0 - pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 + pyramidThickness/2,
  0.0 + pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,
  0.0 - pyramidThickness/2, 1.0, 0.0 - pyramidThickness/2,

];

const pyramidColors = [
  // [1.0, 1.0, 1.0, 1.0], // Front face: white
  // [1.0, 0.0, 0.0, 1.0], // Back face: red
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [1.0, 0.0, 1.0, 1.0], // Left face: purple
  // [1.0, 1.0, 1.0, 1.0], // Front face: white
  // [1.0, 0.0, 0.0, 1.0], // Back face: red
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [1.0, 0.0, 1.0, 1.0], // Left face: purple
  // [1.0, 1.0, 1.0, 1.0], // Front face: white
  // [1.0, 0.0, 0.0, 1.0], // Back face: red
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [1.0, 0.0, 1.0, 1.0], // Left face: purple
  // [1.0, 1.0, 1.0, 1.0], // Front face: white
  // [1.0, 0.0, 0.0, 1.0], // Back face: red
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [1.0, 0.0, 1.0, 1.0], // Left face: purple
  // //
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [1.0, 0.0, 1.0, 1.0], // Left face: purple
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // //
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // [1.0, 0.0, 0.0, 1.0], // Back face: red
  // //
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // [1.0, 0.0, 0.0, 1.0], // Back face: red
  // //
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  // [0.0, 1.0, 0.0, 1.0], // Top face: green
  // [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  // [1.0, 0.0, 0.0, 1.0], // Back face: red
  // //
  // [1.0, 1.0, 0.0, 1.0], // Right face: yellow
];