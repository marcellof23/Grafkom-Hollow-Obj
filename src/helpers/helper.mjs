function argsToArray(args) {
  return [].concat.apply([], Array.prototype.slice.apply(args));
}

function vec2() {
  var result = argsToArray(arguments);

  switch (result.length) {
    case 0:
      result.push(0.0);
    case 1:
      result.push(0.0);
  }

  return result.splice(0, 2);
}

function vec4() {
  var result = argsToArray(arguments);

  switch (result.length) {
    case 0:
      result.push(0.0);
    case 1:
      result.push(0.0);
    case 2:
      result.push(0.0);
    case 3:
      result.push(1.0);
  }

  return result.splice(0, 4);
}

function flatten(v) {
  if (v.matrix === true) {
    v = transpose(v);
  }

  var n = v.length;
  var elemsAreArrays = false;

  if (Array.isArray(v[0])) {
    elemsAreArrays = true;
    n *= v[0].length;
  }

  var floats = new Float32Array(n);

  if (elemsAreArrays) {
    var idx = 0;
    for (var i = 0; i < v.length; ++i) {
      for (var j = 0; j < v[i].length; ++j) {
        floats[idx++] = v[i][j];
      }
    }
  } else {
    for (var i = 0; i < v.length; ++i) {
      floats[i] = v[i];
    }
  }

  return floats;
}

function hexTodec(n) {
  return parseInt(n, 16).toString(10);
}

function euclidean_distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function leastStartIndex(pointIdx, modelGL) {
  for (let i = modelGL.start.length - 1; i >= 0; i--) {
    if (modelGL.start[i] <= pointIdx) {
      if (i === modelGL.start.length - 1) return -1;
      return modelGL.start[i];
    }
  }
}

function isPointOfShapes(pointIdx, shape, modelGL) {
  let leastStartIdx = leastStartIndex(pointIdx, modelGL);
  if (leastStartIdx === -1) {
    return false;
  }
  return modelGL.shapes[modelGL.start.indexOf(leastStartIdx)] === shape;
}

function midPoint(p1, p2) {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

function pointIsInPoly(p, polygon) {
  var isInside = false;
  var minX = polygon[0].x,
    maxX = polygon[0].x;
  var minY = polygon[0].y,
    maxY = polygon[0].y;
  for (var n = 1; n < polygon.length; n++) {
    var q = polygon[n];
    minX = Math.min(q.x, minX);
    maxX = Math.max(q.x, maxX);
    minY = Math.min(q.y, minY);
    maxY = Math.max(q.y, maxY);
  }

  if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
    return false;
  }

  var i = 0,
    j = polygon.length - 1;
  for (i, j; i < polygon.length; j = i++) {
    if (
      polygon[i].y > p.y != polygon[j].y > p.y &&
      p.x <
        ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
          (polygon[j].y - polygon[i].y) +
          polygon[i].x
    ) {
      isInside = !isInside;
    }
  }

  return isInside;
}

function mat4() {
  var v = argsToArray(arguments);

  var m = [];
  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [
        vec4(v[0], 0.0, 0.0, 0.0),
        vec4(0.0, v[0], 0.0, 0.0),
        vec4(0.0, 0.0, v[0], 0.0),
        vec4(0.0, 0.0, 0.0, v[0]),
      ];
      break;

    default:
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      break;
  }

  m.matrix = true;

  return m;
}

function transpose(m) {
  if (!m.matrix) {
    return "transpose(): trying to transpose a non-matrix";
  }

  var result = [];
  for (var i = 0; i < m.length; ++i) {
    result.push([]);
    for (var j = 0; j < m[i].length; ++j) {
      result[i].push(m[j][i]);
    }
  }

  result.matrix = true;

  return result;
}

function normalize(u, excludeLastComponent) {
  if (excludeLastComponent) {
    var last = u.pop();
  }

  var len = length(u);

  if (!isFinite(len)) {
    throw "normalize: vector " + u + " has zero length";
  }

  for (var i = 0; i < u.length; ++i) {
    u[i] /= len;
  }

  if (excludeLastComponent) {
    u.push(last);
  }

  return u;
}
