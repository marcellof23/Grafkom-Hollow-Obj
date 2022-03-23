class ModelGL {
  constructor() {
    this.gl;
    this.canvas;

    this.aspect;
    this.ratio;

    this.cubePoints = [];
    this.cubeColors = [];

    this.pyramidNormals = [];
    this.pyramidPositions = [];

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

    this.menuIdx;
    this.menuViewIdx;
  }

  load_data(data) {
    this.menuIdx = data.menuIdx;
    this.menuViewIdx = data.menuViewIdx;

    this.rot = data.rot;
    this.trans = data.trans;
    this.scale = data.scale;
    this.light = data.light;
  }
}
