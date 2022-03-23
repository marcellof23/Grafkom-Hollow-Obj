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
    modelGL.donutColors = [];

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
        modelGL.donutColors.push(colorRgb.r, colorRgb.g, colorRgb.b, 1.0);
        modelGL.donutNormals.push(cos_loops * sin_slices, sin_loops * sin_slices, cos_slices);

        modelGL.donutTexCoords.push(u);
        modelGL.donutTexCoords.push(v);
      }
    }

    modelGL.donutVertices = modelGL.donutVertices.map((x) => x * 0.3);

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
  },
};
