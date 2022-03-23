function radToDeg(r) {
  return (r * 180) / Math.PI;
}

function degToRad(d) {
  return (d * Math.PI) / 180;
}

function crossProduct(u,v) {
  var u_x = u[0];
  var u_y = u[1];
  var u_z = u[2];
  var v_x = v[0];
  var v_y = v[1];
  var v_z = v[2];

  return [
    u_y * v_z - u_z * v_y,
    u_z * v_x - u_x * v_z,
    u_x * v_y - u_y * v_x
  ];
}

function normalizeVector(u) {
  var u_x = u[0];
  var u_y = u[1];
  var u_z = u[2];

  var len = Math.sqrt(u_x * u_x + u_y * u_y + u_z * u_z);
  return [u_x / len, u_y / len, u_z / len];
}

function getVectorNormal(u, v) {
  var cross = crossProduct(u, v);
  return normalizeVector(cross);
}