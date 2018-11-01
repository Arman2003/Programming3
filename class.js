class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.index = 1;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
    ];
  }
  YntrelVandak(ch) {
    var found = [];
    for (var i = 0; i < this.directions.length; i++) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (matrix[y] && matrix[y][x] == ch) {
        found.push(this.directions[i]);
      }
    }
    return found;
  }
  Zarganal() {
    var field = random(this.YntrelVandak(0));
    if (field) {
      var x = field[0];
      var y = field[1];
      matrix[y][x] = 1;
      grassArr.push(new Grass(x, y));
    }
  }
}


class Xotaker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.index = 2;
    this.directions = [];
    this.energy = 5;
  }
  StanalNorKordinatner() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
    ];
  }
	YntrelVandak(ch) {
    this.StanalNorKordinatner();
    var found = [];
    for (var i = 0; i < this.directions.length; i++) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (matrix[y] && matrix[y][x] == ch) {
        found.push(this.directions[i]);
      }
    }
    return found;
  }
  move() {
    var field = random(this.YntrelVandak(0));
    if (field) {
      matrix[this.y][this.x] = 0;
      this.x = field[0];
      this.y = field[1];
      matrix[this.y][this.x] = this.index;
      this.energy--;
      return true;
    }
    return false;
  }
  eat() {
    var target = random(this.YntrelVandak(1));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in grassArr) {
        if (grassArr[i].x == target[0] && grassArr[i].y == target[1]) {
          grassArr.splice(i, 1);
          this.energy++;
          return true;
        }
      }
    }
    return false;
  }
  Vorsal() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;
      for (var i in xotakerArr) {
        if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
          xotakerArr.splice(i, 1);
          delete this;
          return false;
        }
      }
    }
    if (!this.Zarganal()) {
      if (!this.eat()) {
        this.move();
      }
    }
  }
  Zarganal() {
    if (this.energy == 7) {
      this.energy = 5;
      var field = random(this.YntrelVandak(0));
      if (field) {
        matrix[field[1]][field[0]] = this.index;
        xotakerArr.push(new Xotaker(field[0], field[1]));
        return true;
      }
      var field = random(this.YntrelVandak(1));
      if (field) {
        matrix[field[1]][field[0]] = this.index;
        xotakerArr.push(new Xotaker(field[0], field[1]));
        for (var i in grassArr) {
          if (grassArr[i].x == field[0] && grassArr[i].y == field[1]) {
            grassArr.splice(i, 1);
            return true;
          }
        }
      }
    }
  }
}

class Gishatich {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.index = 3;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
    ];
    this.energy = 80;
  }
  StanalNorKordinatner() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
    ];
  }
  YntrelVandak(ch) {
    this.StanalNorKordinatner();
    var found = [];
    for (var i = 0; i < this.directions.length; i++) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (matrix[y] && matrix[y][x] == ch) {
        found.push(this.directions[i]);
      }
    }
    return found;
  }
  
  move() {
    var field = random(this.YntrelVandak(0));
    if (field) {
      matrix[this.y][this.x] = 0;
      this.x = field[0];
      this.y = field[1];
      matrix[this.y][this.x] = this.index;
      this.energy--;
      return true;
    }
    return false;
  }
  eat() {
    var target = random(this.YntrelVandak(2));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in xotakerArr) {
        if (xotakerArr[i].x == target[0] && xotakerArr[i].y == target[1]) {
          xotakerArr.splice(i, 1);
          this.energy++;
          return true;
        }
      }
    }
    target = random(this.YntrelVandak(1));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in grassArr) {
        if (grassArr[i].x == target[0] && grassArr[i].y == target[1]) {
          grassArr.splice(i, 1);
          return true;
        }
      }
    }
    this.energy--;
    return false;
  }
  Vorsal() {
    if (!this.Mernel()) {
      if (!this.Zarganal()) {
        if (!this.eat()) {
          !this.move();
        }
      }
    }
  }
  Mernel() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;
      for (var i in gishatichArr) {
        if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
          gishatichArr.splice(i, 1);
          delete this;
          return true;
        }
      }
    }
    return false;
  }
  Zarganal() {
    if (this.energy == 90) {
      this.energy = 30;
      var field = random(this.YntrelVandak(0));
      if (field) {
        matrix[field[1]][field[0]] = this.index;
        gishatichArr.push(new Gishatich(field[0], field[1]));
        return true;
      }
      field = random(this.YntrelVandak(1));
      if (field) {
        for (var i in grassArr) {
          if (grassArr[i].x == field[0] && grassArr[i].y == field[1]) {
            grassArr.splice(i, 1);
            return true;
          }
        }
        matrix[field[1]][field[0]] = this.index;
        gishatichArr.push(new Gishatich(field[0], field[1]));
      }
      field = random(this.YntrelVandak(2));
      if (field) {
        for (var i in xotakerArr) {
          if (xotakerArr[i].x == field[0] && xotakerArr[i].y == field[1]) {
            xotakerArr.splice(i, 1);
            return true;
          }
        }
        matrix[field[1]][field[0]] = this.index;
        gishatichArr.push(new Gishatich(field[0], field[1]));
      }
    }
  }
}


class Amenaker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.index = 4;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
    ];
    this.energy = 90;
  }
  StanalNorKordinatner() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
    ];
  }
  YntrelVandak(ch) {
    this.StanalNorKordinatner();
    var found = [];
    for (var i = 0; i < this.directions.length; i++) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (matrix[y] && matrix[y][x] == ch) {
        found.push(this.directions[i]);
      }
    }
    return found;
  }
  move() {
    var field = random(this.YntrelVandak(0));
    if (field) {
      matrix[this.y][this.x] = 0;
      this.x = field[0];
      this.y = field[1];
      matrix[this.y][this.x] = this.index;
      this.energy -= 2;
      return true;
    }
    return false;
  }
  eat() {
    var target = random(this.YntrelVandak(2));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in xotakerArr) {
        if (xotakerArr[i].x == target[0] && xotakerArr[i].y == target[1]) {
          xotakerArr.splice(i, 1);
          this.energy += 2;
          return true;
        }
      }
    }
    target = random(this.YntrelVandak(3));
    if (target) {
      matrix[this. y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in gishatichArr) {
        if (gishatichArr[i].x == target[0] && gishatichArr[i].y == target[1]) {
          gishatichArr.splice(i, 1);
          this.energy += 3;
          return true;
        }
      }
    }
    target = random(this.YntrelVandak(1));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in grassArr) {
        if (grassArr[i].x == target[0] && grassArr[i].y == target[1]) {
          grassArr.splice(i, 1);
          this.energy--;
          return true;
        }
      }
    }
    return false;
  }
  Vorsal() {
    if (!this.Mernel()) {
      if (!this.Zarganal()) {
        if (!this.eat()) {
          !this.move();
        }
      }
    }
  }
  Mernel() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;
      for (var i in amenakerArr) {
        if (amenakerArr[i].x == this.x && amenakerArr[i].y == this.y) {
          amenakerArr.splice(i, 1);
          delete this;
          return true;
        }
      }
    }
    return false;
  }
  Zarganal() {
    if (this.energy >= 150) {
      this.energy = 90;
      var field = random(this.YntrelVandak(0));
      if (field) {
        matrix[field[1]][field[0]] = this.index;
        amenakerArr.push(new Amenaker(field[0], field[1]));
        return true;
      }
      field = random(this.YntrelVandak(1));
      if (field) {
        for (var i in grassArr) {
          if (grassArr[i].x == field[0] && grassArr[i].y == field[1]) {
            grassArr.splice(i, 1);
            return true;
          }
        }
        matrix[field[1]][field[0]] = this.index;
        amenakerArr.push(new Gishatich(field[0], field[1]));
      }
      field = random(this.YntrelVandak(2));
      if (field) {
        for (var i in xotakerArr) {
          if (xotakerArr[i].x == field[0] && xotakerArr[i].y == field[1]) {
            xotakerArr.splice(i, 1);
            return true;
          }
        }
        matrix[field[1]][field[0]] = this.index;
        amenakerArr.push(new Amenaker(field[0], field[1]));
      }
      field = random(this.YntrelVandak(3));
      if (field) {
        for (var i in gishatichArr) {
          if (gishatichArr[i].x == field[0] && gishatichArr[i].y == field[1]) {
            gishatichArr.splice(i, 1);
            return true;
          }
        }
        matrix[field[1]][field[0]] = this.index;
        amenakerArr.push(new Amenaker(field[0], field[1]));
      }
    }
  }
}