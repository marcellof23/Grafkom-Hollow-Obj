class ModelGL {
  constructor() {
    this.gl;
    this.canvas;

    this.aspect;
    this.ratio;

    this.cubePoints = [];
    this.cubeColors = [];

    this.donutVertices = [];
    this.donutIndices = [];
    this.donutNormals = [];
    this.donutTexCoords = [];
  }

  load_data(data) {}
}
