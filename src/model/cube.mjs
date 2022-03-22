const thickness = 0.5;

const positions = [
    // left bottom bar
    // front face
    -1.0, -1.0, 1.0,
    -1.0 + thickness, -1.0, 1.0,
    -1.0 + thickness, -1.0 + thickness, 1.0,
    -1.0, -1.0 + thickness, 1.0,
    // back face
    -1.0, -1.0, -1.0,
    -1.0 + thickness, -1.0, -1.0,
    -1.0 + thickness, -1.0 + thickness, -1.0,
    -1.0, -1.0 + thickness, -1.0,
    // left face
    -1.0, -1.0, 1.0,
    -1.0, -1.0 + thickness, 1.0,
    -1.0, -1.0 + thickness, -1.0,
    -1.0, -1.0, -1.0,
    // right face
    -1.0 + thickness, -1.0, 1.0,
    -1.0 + thickness, -1.0 + thickness, 1.0,
    -1.0 + thickness, -1.0 + thickness, -1.0,
    -1.0 + thickness, -1.0, -1.0,
    // top face
    -1.0, -1.0 + thickness, 1.0,
    -1.0 + thickness, -1.0 + thickness, 1.0,
    -1.0 + thickness, -1.0 + thickness, -1.0,
    -1.0, -1.0 + thickness, -1.0,
    // bottom face
    -1.0, -1.0, 1.0,
    -1.0 + thickness, -1.0, 1.0,
    -1.0 + thickness, -1.0, -1.0,
    -1.0, -1.0, -1.0,

    // right bottom bar
    // front face
    1.0, -1.0, 1.0,
    1.0 - thickness, -1.0, 1.0,
    1.0 - thickness, -1.0 + thickness, 1.0,
    1.0, -1.0 + thickness, 1.0,
    // back face
    1.0, -1.0, -1.0,
    1.0 - thickness, -1.0, -1.0,
    1.0 - thickness, -1.0 + thickness, -1.0,
    1.0, -1.0 + thickness, -1.0,
    // left face
    1.0, -1.0, 1.0,
    1.0, -1.0 + thickness, 1.0,
    1.0, -1.0 + thickness, -1.0,
    1.0, -1.0, -1.0,
    // right face
    1.0 - thickness, -1.0, 1.0,
    1.0 - thickness, -1.0 + thickness, 1.0,
    1.0 - thickness, -1.0 + thickness, -1.0,
    1.0 - thickness, -1.0, -1.0,
    // top face
    1.0, -1.0 + thickness, 1.0,
    1.0 - thickness, -1.0 + thickness, 1.0,
    1.0 - thickness, -1.0 + thickness, -1.0,
    1.0, -1.0 + thickness, -1.0,
    // bottom face
    1.0, -1.0, 1.0,
    1.0 - thickness, -1.0, 1.0,
    1.0 - thickness, -1.0, -1.0,
    1.0, -1.0, -1.0,

    // front bottom bar
    // front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0 + thickness, 1.0,
    -1.0, -1.0 + thickness, 1.0,
    // back face
    -1.0, -1.0, 1.0 - thickness,
    1.0, -1.0, 1.0 - thickness,
    1.0, -1.0 + thickness, 1.0 - thickness,
    -1.0, -1.0 + thickness, 1.0 - thickness,
    // left face
    -1.0, -1.0, 1.0,
    -1.0, -1.0 + thickness, 1.0,
    -1.0, -1.0 + thickness, 1.0 - thickness,
    -1.0, -1.0, 1.0 - thickness,
    // right face
    1.0, -1.0, 1.0,
    1.0, -1.0 + thickness, 1.0,
    1.0, -1.0 + thickness, 1.0 - thickness,
    1.0, -1.0, 1.0 - thickness,
    // top face
    -1.0, -1.0 + thickness, 1.0,
    1.0, -1.0 + thickness, 1.0,
    1.0, -1.0 + thickness, 1.0 - thickness,
    -1.0, -1.0 + thickness, 1.0 - thickness,
    // bottom face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, 1.0 - thickness,
    -1.0, -1.0, 1.0 - thickness,

    // back bottom bar
    // front face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0 + thickness, -1.0,
    -1.0, -1.0 + thickness, -1.0,
    // back face
    -1.0, -1.0, -1.0 + thickness,
    1.0, -1.0, -1.0 + thickness,
    1.0, -1.0 + thickness, -1.0 + thickness,
    -1.0, -1.0 + thickness, -1.0 + thickness,
    // left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0 + thickness, -1.0,
    -1.0, -1.0 + thickness, -1.0 + thickness,
    -1.0, -1.0, -1.0 + thickness,
    // right face
    1.0, -1.0, -1.0,
    1.0, -1.0 + thickness, -1.0,
    1.0, -1.0 + thickness, -1.0 + thickness,
    1.0, -1.0, -1.0 + thickness,
    // top face
    -1.0, -1.0 + thickness, -1.0,
    1.0, -1.0 + thickness, -1.0,
    1.0, -1.0 + thickness, -1.0 + thickness,
    -1.0, -1.0 + thickness, -1.0 + thickness,
    // bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, -1.0 + thickness,
    -1.0, -1.0, -1.0 + thickness,

    // left front bar
    // front face
    -1.0 , -1.0 + thickness, 1.0,
    -1.0 + thickness, -1.0 + thickness, 1.0,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    // back face
    -1.0 , -1.0 + thickness, 1.0 - thickness,
    -1.0 + thickness, -1.0 + thickness, 1.0 - thickness,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    // left face
    -1.0, -1.0 + thickness, 1.0,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    -1.0, -1.0 + thickness, 1.0 - thickness,
    // right face
    -1.0 + thickness, -1.0 + thickness, 1.0,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    -1.0 + thickness, -1.0 + thickness, 1.0 - thickness,

    // right front bar
    // front face
    1.0, -1.0 + thickness, 1.0,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    1.0 - thickness, -1.0 + thickness, 1.0,
    // back face
    1.0, -1.0 + thickness, 1.0 - thickness,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    1.0 - thickness, -1.0 + thickness, 1.0 - thickness,
    // left face
    1.0 - thickness, -1.0 + thickness, 1.0,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    1.0 - thickness, -1.0 + thickness, 1.0 - thickness,
    // right face
    1.0, -1.0 + thickness, 1.0,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    1.0, -1.0 + thickness, 1.0 - thickness,

    // left back bar
    // front face
    -1.0 , -1.0 + thickness, -1.0,
    -1.0 + thickness, -1.0 + thickness, -1.0,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    // back face
    -1.0 , -1.0 + thickness, -1.0 + thickness,
    -1.0 + thickness, -1.0 + thickness, -1.0 + thickness,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    // left face
    -1.0, -1.0 + thickness, -1.0,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    -1.0, -1.0 + thickness, -1.0 + thickness,
    // right face
    -1.0 + thickness, -1.0 + thickness, -1.0,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    -1.0 + thickness, -1.0 + thickness, -1.0 + thickness,

    // right back bar
    // front face
    1.0, -1.0 + thickness, -1.0,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    1.0 - thickness, -1.0 + thickness, -1.0,
    // back face
    1.0, -1.0 + thickness, -1.0 + thickness,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    1.0 - thickness, -1.0 + thickness, -1.0 + thickness,
    // left face
    1.0 - thickness, -1.0 + thickness, -1.0,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    1.0 - thickness, -1.0 + thickness, -1.0 + thickness,
    // right face
    1.0, -1.0 + thickness, -1.0,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    1.0, -1.0 + thickness, -1.0 + thickness,

    // cap
    0.0 - thickness/2, 1.0, 0.0 + thickness/2,
    0.0 + thickness/2, 1.0, 0.0 + thickness/2,
    0.0 + thickness/2, 1.0, 0.0 - thickness/2,
    0.0 - thickness/2, 1.0, 0.0 - thickness/2,
];

const faceColors = [
  [1.0, 1.0, 1.0, 1.0], // Front face: white
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [1.0, 0.0, 1.0, 1.0], // Left face: purple
  [1.0, 1.0, 1.0, 1.0], // Front face: white
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [1.0, 0.0, 1.0, 1.0], // Left face: purple
  [1.0, 1.0, 1.0, 1.0], // Front face: white
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [1.0, 0.0, 1.0, 1.0], // Left face: purple
  [1.0, 1.0, 1.0, 1.0], // Front face: white
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [1.0, 0.0, 1.0, 1.0], // Left face: purple
  //
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [1.0, 0.0, 1.0, 1.0], // Left face: purple
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  //
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  //
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  //
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  //
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
];