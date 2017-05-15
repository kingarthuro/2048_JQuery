jQuery.fn.extend({
  mygame: function(size) {
    var gameObject = $(this).attr('id');
    var blockSize = size;
    var boardSize = 4 * blockSize;
    var square = [];
    var empty = [];

    var createBoard = function() {
      $('<div id="board"></div>').appendTo($('#'+gameObject));
      $('#board').css({
        'width'       : boardSize,
        'height'      : boardSize,
      });
    }

    var fillBoard = function() {
      for (y = 0; y < 4; y++) {
        square.push([]);
        empty.push([]);
        for (x = 0; x < 4; x++) {
          square[y][x] = 0;
          $('<div class="square-container" style="left:' + (x * blockSize) + 'px;top:' + (y * blockSize) + 'px;"></div>').appendTo($("#board"));
          $('.square-container').css({
            'width'       : blockSize,
            'height'      : blockSize,
          });
        }
      }
    }

    var findEmpty = function() {
      for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
          if (square[y][x] === 0) {
            empty[y][x] = 1;
          }
          else {
            empty[y][x] = 0;
          }
        }
      }
    }

    var newTile = function() {
      max = 0;
      findEmpty();
      for(y = 0; y < 4; y++) {
        for(x = 0; x < 4; x++) {
          empty[y][x] = empty[y][x] * Math.random();
          if(empty[y][x] > max) {
            max = empty[y][x];
          }
        }
      }
      for(y = 0; y < 4; y++) {
        for(x = 0; x < 4; x++) {
          if(empty[y][x] === max) {
            if(Math.random() < 0.5) {
              z = 2;
            }
            else {
              z = 4;
            }
          createTile(y, x, z);
          square[y][x] = z;
          }
        }
      }
    }

    var createTile = function(y, x, z) {
      $('<div class="col' + x + ' row' + y + ' tile back' + z + '" style="left:' + (x * blockSize) + 'px;top:' + (y * blockSize) + 'px;display:none"><p>' + z + '</p></div>').appendTo("#board");
      $('.tile').css({
        'width'       : blockSize,
        'height'      : blockSize,
      });
      var tile = $('.col' + x + '.row' + y);
      tile.delay(200).fadeIn(200);
    }

    var firstTiles = function() {
      newTile();
      newTile();
    }

    var keyPress = function() {
      $(this).keydown(function (key) {
        $(".tile").finish();
        switch(parseInt(key.which, 10)) {
          case 37:
            for(y = 0; y < 4; y++) {
              x = 0;
              i = 0;
              merged = false;
              while(square[y][i] === 0) {
                i++;
              }
              if (i === 4) {
                x = 4;
              }
              else {
                square[y][x] = square[y][i];
                animateMoveRow(i, x, y);
                i++;
              }
              for(i; i < 4; i++) {
                if(square[y][i] !== 0) {
                  if(square[y][i] === square[y][x] && merged === false) {
                    square[y][x] += square[y][i];
                    animateAddRow(i, y, x);
                    merged = true;
                  }
                  else {
                    x++;
                    square[y][x] = square[y][i];
                    animateMoveRow(i, x, y);
                    merged = false;
                  }
                }
              }
              x++;
              for (x; x < 4; x++) {
                square[y][x] = 0;
              }
            }
            break;
          case 38:
            for(x = 0; x < 4; x++) {
              y = 0;
              j = 0;
              merged = false;
              while(square[j][x] === 0) {
                j++;
                if(j === 4) {
                  break;
                }
              }
              if(j === 4) {
                y = 4;
              }
              else {
                square[y][x] = square[j][x];
                animateMoveCol(j, x, y);
                j++;
              }
              for(j; j < 4; j++) {
                if(square[j][x] !== 0) {
                  if (square[j][x] === square[y][x] && merged === false) {
                    square[y][x] += square[j][x];
                    animateAddCol(j, y, x);
                    merged = true;
                  }
                  else {
                  y++;
                  square[y][x] = square[j][x];
                  animateMoveCol(j, x, y);
                  merged = false;
                  }
                }
              }
              y++;
              for(y; y < 4; y++) {
                square[y][x] = 0;
              }
            }
            break;
          case 39:
            for(y = 0; y < 4; y++) {
              x = 3;
              i = 3;
              merged = false;
              while(square[y][i] === 0) {
                i--;
              }
              if (i === -1) {
                x = -1;
              }
              else {
                square[y][x] = square[y][i];
                animateMoveRow(i, x, y);
                i--;
              }
              for (i; i > -1; i--) {
                if(square[y][i] !== 0) {
                  if(square[y][i] === square[y][x] && merged === false) {
                    square[y][x] += square[y][i];
                    animateAddRow(i, y, x);
                    merged = true;
                  }
                  else {
                    x--;
                    square[y][x] = square[y][i];
                    animateMoveRow(i, x, y);
                    merged = false;
                  }
                }
              }
              x--;
              for(x; x > -1; x--) {
                square[y][x] = 0;
              }
            }
            break;
          case 40:
            for(x = 0; x < 4; x++) {
              y = 3;
              j = 3;
              merged = false;
              while(square[j][x] === 0) {
                j--;
                if (j === -1) {
                  break;
                }
              }
              if(j === -1) {
                y = -1;
              }
              else {
                square[y][x] = square[j][x];
                animateMoveCol(j, x, y);
                j--;
              }
              for(j; j > -1; j--) {
                if(square[j][x] !== 0) {
                  if(square[j][x] === square[y][x] && merged === false) {
                    square[y][x] += square[j][x];
                    animateAddCol(j, y, x);
                    merged = true;
                  }
                  else {
                    y--;
                    square[y][x] = square[j][x];
                    animateMoveCol(j, x, y);
                    merged = false;
                  }
                }
              }
              y--;
              for(y; y > -1; y--) {
                square[y][x] = 0;
              }
            }
            break;
        }
        newTile();
      });
    }

    var animateMoveRow = function(i, x, y) {
      $(".col" + i + ".row" + y).animate({
        'marginLeft': '-=' + blockSize * (i - x) + 'px'
      }, 200).removeClass("col" + i).addClass("col" + x);
    }

    var animateAddRow = function(i, y, x) {
      $(".col" + i + ".row" + y).addClass("delete").css("z-index", "1").animate({
        'marginLeft': '-=' + blockSize * (i - x) + 'px'
      }, 200, function() {
        deleteClass(x, y);
      });
    }

    var animateMoveCol = function(j, x, y) {
      $(".col" + x + ".row" + j).animate({
        'marginTop': '-=' + blockSize * (j - y) + 'px'
      }, 200).removeClass("row" + j).addClass("row" + y);
    }

    var animateAddCol = function(j, y, x) {
      $(".col" + x + ".row" + j).addClass("delete").css("z-index", "1").animate({
        'marginTop': '-=' + blockSize * (j - y) + 'px'
      }, 200, function(x, y) {
        deleteClass(x, y);
      });
    }

    var deleteClass = function(x, y) {
      $(".delete").remove();
      var tile = $(".col" + x + ".row" + y);
      var z = square[y][x];
      tile.html("<p>" + z + "</p>");
    }

    return this.each(function() {
      createBoard();
      fillBoard();
      findEmpty();
      firstTiles();
      keyPress();
    });
  },
});
