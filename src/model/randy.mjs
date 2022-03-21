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
];

const faceColors = [
  [1.0, 1.0, 1.0, 1.0], // Front face: white
  [1.0, 0.0, 0.0, 1.0], // Back face: red
  [0.0, 1.0, 0.0, 1.0], // Top face: green
  [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
  [1.0, 1.0, 0.0, 1.0], // Right face: yellow
  [1.0, 0.0, 1.0, 1.0], // Left face: purple
];