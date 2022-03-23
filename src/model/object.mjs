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

    this.programInfo;
    this.buffers;
    this.rot;
    this.trans;
    this.scale;
  }

  load_data(data) {}
}
