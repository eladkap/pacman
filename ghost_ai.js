function findPathAux(mat, src_pos_i, src_pos_j, dest_pos_i, dest_pos_j, path) {
  if (src_pos_i == dest_pos_i && src_pos_j == dest_pos_j) {
    console.log("path found!");
    return true;
  }

  let i = src_pos_i;
  let j = src_pos_j;

  // backtracking from visited tile or brick
  if (mat[i][j] == 1 || mat[i][j] == 9) {
    return false;
  }

  //mark the current tile part of the path and as visited
  path.push(new Array(src_pos_i, src_pos_j));
  mat[src_pos_i][src_pos_j] = 9;

  // go right
  if (
    findPathAux(mat, src_pos_i, src_pos_j + 1, dest_pos_i, dest_pos_j, path)
  ) {
    return true;
  }

  // go up
  if (
    findPathAux(mat, src_pos_i - 1, src_pos_j, dest_pos_i, dest_pos_j, path)
  ) {
    return true;
  }

  // go left
  if (
    findPathAux(mat, src_pos_i, src_pos_j - 1, dest_pos_i, dest_pos_j, path)
  ) {
    return true;
  }

  // go down
  if (
    findPathAux(mat, src_pos_i + 1, src_pos_j, dest_pos_i, dest_pos_j, path)
  ) {
    return true;
  }

  // unmark the current tile as part of the solution
  path.pop();
  mat[i][j] = 0;
  return false;
}

function findPath(mat, src_pos_i, src_pos_j, dest_pos_i, dest_pos_j) {
  var path = [];
  var result = findPathAux(
    mat,
    src_pos_i,
    src_pos_j,
    dest_pos_i,
    dest_pos_j,
    path
  );
  // console.log(result);
  if (!result) {
    return [];
  }
  var directions_path = [];

  for (var i = 0; i < path.length - 1; i++) {
    if (path[i][1] == path[i + 1][1] - 1) {
      directions_path.push("R");
    } else if (path[i][1] == path[i + 1][1] + 1) {
      directions_path.push("L");
    } else if (path[i][0] == path[i + 1][0] + 1) {
      directions_path.push("U");
    } else {
      directions_path.push("D");
    }
  }

  // console.log(path[i]);
  var curr_pos_i = path[i][0];
  var curr_pos_j = path[i][1];

  if (mat[curr_pos_i][curr_pos_j + 1] == 5) {
    directions_path.push("R");
  }
  if (mat[curr_pos_i][curr_pos_j - 1] == 5) {
    directions_path.push("L");
  }
  if (mat[curr_pos_i - 1][curr_pos_j] == 5) {
    directions_path.push("U");
  }
  if (mat[curr_pos_i + 1][curr_pos_j] == 5) {
    directions_path.push("D");
  }

  return directions_path;
}

/*
function copyMatrix(mat){
  var new_mat = [];
  for (let i = 0; i < mat.length; i++){
    var row = [];
    for (let j = 0; j < mat[i].length; j++){
      row.push(mat[i][j]);
    }
    mat.push(row);
  }
  return new_mat;
}
*/
