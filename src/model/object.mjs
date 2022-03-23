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
    this.light;
  }

  load_data(data) {
    this.aspect = data.aspect;
    this.ratio = data.aspect;

    this.cubePoints = data.cubePoints;
    this.cubeColors = data.cubeColors;

    this.donutVertices = data.donutVertices;
    this.donutIndices = data.donutIndices;
    this.donutNormals = data.donutNormals;
    this.donutTexCoords = data.donutTexCoords;

    this.programInfo = data.programInfo;
    this.buffers = data.buffers;
    this.rot = data.rot;
    this.trans = data.trans;
    this.scale = data.scale;
    this.light = data.light;
  }
}
