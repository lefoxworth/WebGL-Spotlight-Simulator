//CS435
//Project #4
//Created by laura Foxworth
//Based on the shadedSphere4 and shadedSphereObjectSpace code frameworks from the textbook's repository
//This program simulates a simple, movable spotlight in a room.

var canvas;
var gl;

var numTimesToSubdivide = 3;

var index = 0;

var pointsArray = [
          //bottom, leftmost tri
          vec4(0, 0, 0, 1),
          vec4(1, 0, 0, 1),
          vec4(0, 0, 2, 1),
          //bottom, 2nd tri
          vec4(1, 0, 0, 1),
          vec4(1, 0, 2, 1),
          vec4(0, 0, 2, 1),
          //bottom, 3rd tri
          vec4(1, 0, 1, 1),
          vec4(2, 0, 1, 1),
          vec4(1, 0, 2, 1),
          //bottom, 4th tri
          vec4(2, 0, 1, 1),
          vec4(2, 0, 2, 1),
          vec4(1, 0, 2, 1),
          //bottom, 5th tri
          vec4(2, 0, 0, 1),
          vec4(3, 0, 0, 1),
          vec4(2, 0, 2, 1),
          //bottom, 6th tri
          vec4(3, 0, 0, 1),
          vec4(3, 0, 2, 1),
          vec4(2, 0, 2, 1),

          //floor, leftmost tri
          vec4(0, 0.1, 0, 1),
          vec4(1, 0.1, 0, 1),
          vec4(0, 0.1, 2, 1),
          //floor, 2nd tri
          vec4(1, 0.1, 0, 1),
          vec4(1, 0.1, 2, 1),
          vec4(0, 0.1, 2, 1),
          //floor, 3rd tri
          vec4(1, 0.1, 1, 1),
          vec4(2, 0.1, 1, 1),
          vec4(1, 0.1, 2, 1),
          //floor, 4th tri
          vec4(2, 0.1, 1, 1),
          vec4(2, 0.1, 2, 1),
          vec4(1, 0.1, 2, 1),
          //floor, 5th tri
          vec4(2, 0.1, 0, 1),
          vec4(3, 0.1, 0, 1),
          vec4(2, 0.1, 2, 1),
          //floor, 6th tri
          vec4(3, 0.1, 0, 1),
          vec4(3, 0.1, 2, 1),
          vec4(2, 0.1, 2, 1),

          //left outside wall, 1st tri
          vec4(0, 0, 0, 1),
          vec4(0, 0, 2, 1),
          vec4(0, 0.5, 2, 1),
          //left outside wall, 2nd tri
          vec4(0, 0, 0, 1),
          vec4(0, 0.5, 2, 1),
          vec4(0, 0.5, 0, 1),

          //top outside wall, 1st tri
          vec4(0, 0, 2, 1),
          vec4(3, 0, 2, 1),
          vec4(3, 0.5, 2, 1),
          //top outside wall, 2nd tri
          vec4(0, 0, 2, 1),
          vec4(0, 0.5, 2, 1),
          vec4(3, 0.5, 2, 1),

          //right outside wall, 1st tri
          vec4(3, 0, 2, 1),
          vec4(3, 0, 0, 1),
          vec4(3, 0.5, 2, 1),
          //right outside wall, 2nd tri
          vec4(3, 0.5, 2, 1),
          vec4(3, 0, 0, 1),
          vec4(3, 0.5, 0, 1),

          //bottom-right outside wall, 1st tri
          vec4(3, 0, 0, 1),
          vec4(2, 0, 0, 1),
          vec4(2, 0.5, 0, 1),
          //bottom-right outside wall, 2nd tri
          vec4(2, 0.5, 0, 1),
          vec4(3, 0.5, 0, 1),
          vec4(3, 0, 0, 1),

          //right inlet outside wall, 1st tri
          vec4(2, 0, 0, 1),
          vec4(2, 0.5, 0, 1),
          vec4(2, 0, 1, 1),
          //right inlet outside wall, 2nd tri
          vec4(2, 0.5, 0, 1),
          vec4(2, 0.5, 1, 1),
          vec4(2, 0, 1, 1),

          //bottom inlet outside wall, 1st tri
          vec4(2, 0, 1, 1),
          vec4(2, 0.5, 1, 1),
          vec4(1, 0, 1, 1),
          //bottom inlet outside wall, 2nd tri
          vec4(2, 0.5, 1, 1),
          vec4(1, 0.5, 1, 1),
          vec4(1, 0, 1, 1),

          //left inlet outside wall, 1st tri
          vec4(1, 0, 1, 1),
          vec4(1, 0, 0, 1),
          vec4(1, 0.5, 0, 1),
          //left inlet outside wall, 2nd tri
          vec4(1, 0.5, 0, 1),
          vec4(1, 0.5, 1, 1),
          vec4(1, 0, 1, 1),

          //bottom-left outside wall, 1st tri
          vec4(1, 0, 0, 1),
          vec4(0, 0, 0, 1),
          vec4(0, 0.5, 0, 1),
          //bottom-left outside wall, 2nd tri
          vec4(0, 0.5, 0, 1),
          vec4(1, 0.5, 0, 1),
          vec4(1, 0, 0, 1),

          //left inside wall, 1st tri
          vec4(0.1, 0, 0.1, 1),
          vec4(0.1, 0, 1.9, 1),
          vec4(0.1, 0.5, 1.9, 1),
          //left inside wall, 2nd tri
          vec4(0.1, 0, 0.1, 1),
          vec4(0.1, 0.5, 1.9, 1),
          vec4(0.1, 0.5, 0.1, 1),

          //top inside wall, 1st tri
          vec4(0.1, 0, 1.9, 1),
          vec4(2.9, 0, 1.9, 1),
          vec4(2.9, 0.5, 1.9, 1),
          //top inside wall, 2nd tri
          vec4(0.1, 0, 1.9, 1),
          vec4(0.1, 0.5, 1.9, 1),
          vec4(2.9, 0.5, 1.9, 1),

          //right inside wall, 1st tri
          vec4(2.9, 0, 1.9, 1),
          vec4(2.9, 0, 0.1, 1),
          vec4(2.9, 0.5, 1.9, 1),
          //right inside wall, 2nd tri
          vec4(2.9, 0.5, 1.9, 1),
          vec4(2.9, 0, 0.1, 1),
          vec4(2.9, 0.5, 0.1, 1),

          //bottom-right inside wall, 1st tri
          vec4(2.9, 0, 0.1, 1),
          vec4(2.1, 0, 0.1, 1),
          vec4(2.1, 0.5, 0.1, 1),
          //bottom-right inside wall, 2nd tri
          vec4(2.1, 0.5, 0.1, 1),
          vec4(2.9, 0.5, 0.1, 1),
          vec4(2.9, 0, 0.1, 1),

          //right inlet inside wall, 1st tri
          vec4(2.1, 0, 0.1, 1),
          vec4(2.1, 0.5, 0.1, 1),
          vec4(2.1, 0, 1.1, 1),
          //right inlet inside wall, 2nd tri
          vec4(2.1, 0.5, 0.1, 1),
          vec4(2.1, 0.5, 1.1, 1),
          vec4(2.1, 0, 1.1, 1),

          //bottom inlet inside wall, 1st tri
          vec4(2.1, 0, 1.1, 1),
          vec4(2.1, 0.5, 1.1, 1),
          vec4(0.9, 0, 1.1, 1),
          //bottom inlet inside wall, 2nd tri
          vec4(2.1, 0.5, 1.1, 1),
          vec4(0.9, 0.5, 1.1, 1),
          vec4(0.9, 0, 1.1, 1),

          //left inlet inside wall, 1st tri
          vec4(0.9, 0, 1.1, 1),
          vec4(0.9, 0, 0.1, 1),
          vec4(0.9, 0.5, 0.1, 1),
          //left inlet inside wall, 2nd tri
          vec4(0.9, 0.5, 0.1, 1),
          vec4(0.9, 0.5, 1.1, 1),
          vec4(0.9, 0, 1.1, 1),

          //bottom-left inside wall, 1st tri
          vec4(0.9, 0, 0.1, 1),
          vec4(0.1, 0, 0.1, 1),
          vec4(0.1, 0.5, 0.1, 1),
          //bottom-left inside wall, 2nd tri
          vec4(0.1, 0.5, 0.1, 1),
          vec4(0.9, 0.5, 0.1, 1),
          vec4(0.9, 0, 0.1, 1),

          //left wall top, 1st tri
          vec4(0, 0.5, 0, 1),
          vec4(0, 0.5, 2, 1),
          vec4(0.1, 0.5, 0, 1),
          //left wall top, 2nd tri
          vec4(0.1, 0.5, 0, 1),
          vec4(0.1, 0.5, 2, 1),
          vec4(0, 0.5, 2, 1),

          //top wall top, 1st tri
          vec4(0.1, 0.5, 1.9, 1),
          vec4(0.1, 0.5, 2, 1),
          vec4(2.9, 0.5, 2, 1),
          //top wall top, 2nd tri
          vec4(0.1, 0.5, 1.9, 1),
          vec4(2.9, 0.5, 1.9, 1),
          vec4(2.9, 0.5, 2, 1),

          //right wall top, 1st tri
          vec4(2.9, 0.5, 2, 1),
          vec4(3, 0.5, 2, 1),
          vec4(2.9, 0.5, 0, 1),
          //right wall top, 2nd tri
          vec4(2.9, 0.5, 0, 1),
          vec4(3, 0.5, 0, 1),
          vec4(3, 0.5, 2, 1),

          //bottom-right wall top, 1st tri
          vec4(2.9, 0.5, 0, 1),
          vec4(2.9, 0.5, 0.1, 1),
          vec4(2.1, 0.5, 0, 1),
          //bottom-right wall top, 2nd tri
          vec4(2.9, 0.5, 0.1, 1),
          vec4(2.1, 0.5, 0.1, 1),
          vec4(2.1, 0.5, 0, 1),

          //right inlet wall top, 1st tri
          vec4(2, 0.5, 0, 1),
          vec4(2, 0.5, 1.1, 1),
          vec4(2.1, 0.5, 0, 1),
          //right inlet wall top, 2nd tri
          vec4(2.1, 0.5, 0, 1),
          vec4(2.1, 0.5, 1.1, 1),
          vec4(2, 0.5, 1.1, 1),

          //bottom inlet wall top, 1st tri
          vec4(2, 0.5, 1.1, 1),
          vec4(2, 0.5, 1, 1),
          vec4(1, 0.5, 1.1, 1),
          //bottom inlet wall top, 2nd tri
          vec4(2, 0.5, 1, 1),
          vec4(1, 0.5, 1, 1),
          vec4(1, 0.5, 1.1, 1),

          //left inlet wall top, 1st tri
          vec4(1, 0.5, 1.1, 1),
          vec4(1, 0.5, 0, 1),
          vec4(0.9, 0.5, 1.1, 1),
          //left inlet wall top, 2nd tri
          vec4(0.9, 0.5, 1.1, 1),
          vec4(0.9, 0.5, 0, 1),
          vec4(1, 0.5, 0, 1),

          //bottom-left inlet wall top, 1st tri
          vec4(0.9, 0.5, 0.1, 1),
          vec4(0.9, 0.5, 0, 1),
          vec4(0.1, 0.5, 0.1, 1),
          //bottom-left inlet wall top, 2nd tri
          vec4(0.9, 0.5, 0, 1),
          vec4(0.1, 0.5, 0.1, 1),
          vec4(0.1, 0.5, 0, 1)

          // //front
          // vec4(0,   0,  0, 1),
          // vec4(0, 0.5,  0, 1),
          // vec4(0.5,   0,  0, 1),
          // vec4(0, 0.5,  0, 1),
          // vec4(0.5, 0.5,  0, 1),
          // vec4(0.5,   0,  0, 1),
          //
          // //top
          // vec4(0,   0.5,  0, 1),
          // vec4(0.5,  0.5,  0, 1),
          // vec4(0.5,   0.5,  0.5, 1),
          // vec4(0,  0.5,  0, 1),
          // vec4(0,  0.5,  0.5, 1),
          // vec4(0.5,   0.5,  0.5, 1),
          //
          // //back
          // vec4(0,   0,  0.5, 1),
          // vec4(0, 0.5,  0.5, 1),
          // vec4(0.5,   0,  0.5, 1),
          // vec4(0, 0.5,  0.5, 1),
          // vec4(0.5, 0.5,  0.5, 1),
          // vec4(0.5,   0,  0.5, 1),
          //
          // //bottom
          // vec4(0,   0,  0, 1),
          // vec4(0.5,  0,  0, 1),
          // vec4(0.5,   0,  0.5, 1),
          // vec4(0,  0,  0, 1),
          // vec4(0,  0,  0.5, 1),
          // vec4(0.5,   0,  0.5, 1),
          //
          // //left
          //  vec4(0,   0,  0, 1),
          //  vec4(0,   0,  0.5, 1),
          //  vec4(0,  0.5,  0.5, 1),
          //  vec4(0,  0,  0, 1),
          //  vec4(0,   0.5,  0, 1),
          //  vec4(0,  0.5,  0.5, 1),
          //
          // //right
          // vec4(0.5,   0,  0, 1),
          // vec4(0.5,   0,  0.5, 1),
          // vec4(0.5,  0.5,  0.5, 1),
          // vec4(0.5,  0,  0, 1),
          // vec4(0.5,   0.5,  0, 1),
          // vec4(0.5,  0.5,  0.5, 1)

          ];


var normalsArray = [
  //bottom, leftmost tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom, 3rd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom, 4th tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom, 5th tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom, 6th tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //floor, leftmost tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //floor, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //floor, 3rd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //floor, 4th tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //floor, 5th tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //floor, 6th tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //left outside wall, 1st tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  //left outside wall, 2nd tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),

  //top outside wall, 1st tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  //top outside wall, 2nd tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),

  //right outside wall, 1st tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  //right outside wall, 2nd tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),

  //bottom-right outside wall, 1st tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  //bottom-right outside wall, 2nd tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),

  //right inlet outside wall, 1st tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  //right inlet outside wall, 2nd tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),

  //bottom inlet outside wall, 1st tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  //bottom inlet outside wall, 2nd tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),

  //left inlet outside wall, 1st tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  //left inlet outside wall, 2nd tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),

  //bottom-left outside wall, 1st tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  //bottom-left outside wall, 2nd tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),

  //left inside wall, 1st tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  //left inside wall, 2nd tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),

  //top inside wall, 1st tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  //top inside wall, 2nd tri
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),
  vec4(0, 0, -1, 0),

  //right inside wall, 1st tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  //right inside wall, 2nd tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),

  //bottom-right inside wall, 1st tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  //bottom-right inside wall, 2nd tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),

  //right inlet inside wall, 1st tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  //right inlet inside wall, 2nd tri
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),
  vec4(1, 0, 0, 0),

  //bottom inlet inside wall, 1st tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  //bottom inlet inside wall, 2nd tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),

  //left inlet inside wall, 1st tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  //left inlet inside wall, 2nd tri
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),
  vec4(-1, 0, 0, 0),

  //bottom-left inside wall, 1st tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  //bottom-left inside wall, 2nd tri
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),
  vec4(0, 0, 1, 0),

  //left wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //left wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //top wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //top wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //right wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //right wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //bottom-right wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom-right wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //right inlet wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //right inlet wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //bottom inlet wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom inlet wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //left inlet wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //left inlet wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),

  //bottom-left inlet wall top, 1st tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  //bottom-left inlet wall top, 2nd tri
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0),
  vec4(0, 1, 0, 0)

            // //front
            // vec4(0, 0, -1, 0),
            // vec4(0, 0, -1, 0),
            // vec4(0, 0, -1, 0),
            // vec4(0, 0, -1, 0),
            // vec4(0, 0, -1, 0),
            // vec4(0, 0, -1, 0),
            //
            // //top
            // vec4(0, -1, 0, 0),
            // vec4(0, -1, 0, 0),
            // vec4(0, -1, 0, 0),
            // vec4(0, -1, 0, 0),
            // vec4(0, -1, 0, 0),
            // vec4(0, -1, 0, 0),
            //
            // //back
            // vec4(0, 0, 1, 0),
            // vec4(0, 0, 1, 0),
            // vec4(0, 0, 1, 0),
            // vec4(0, 0, 1, 0),
            // vec4(0, 0, 1, 0),
            // vec4(0, 0, 1, 0),
            //
            // //bottom
            // vec4(0, 1, 0, 0),
            // vec4(0, 1, 0, 0),
            // vec4(0, 1, 0, 0),
            // vec4(0, 1, 0, 0),
            // vec4(0, 1, 0, 0),
            // vec4(0, 1, 0, 0),
            //
            // //left
            // vec4(1, 0, 0, 0),
            // vec4(1, 0, 0, 0),
            // vec4(1, 0, 0, 0),
            // vec4(1, 0, 0, 0),
            // vec4(1, 0, 0, 0),
            // vec4(1, 0, 0, 0),
            //
            // //right
            // vec4(-1, 0, 0, 0),
            // vec4(-1, 0, 0, 0),
            // vec4(-1, 0, 0, 0),
            // vec4(-1, 0, 0, 0),
            // vec4(-1, 0, 0, 0),
            // vec4(-1, 0, 0, 0)

          ];


var near = -10;
var far = 10;
var radius = 1.5;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = -3.0;
var right = 3.0;
var ytop =3.0;
var bottom = -3.0;

var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);

var lightPosition = vec4(0.5, 1.0, 0.5, 1.0 ); //in model/world space
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var lightX = 0.0;
var lightY = -1.0;
var lightZ = 0.3;
var lightDirection = vec3(lightX, lightY, lightZ);
var cutoffAngle = 10; //in degrees

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 20.0;

var ctm;
var ambientColor, diffuseColor, specularColor;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var normalMatrix, normalMatrixLoc;

var eye = vec3(-0.5, 1.0, 2.5);
var at = vec3(0.5, 0.0, 1.5);
var up = vec3(0.0, 1.0, 0.0);

function degToRad(angle) {
  return angle * (Math.PI/180);
}

// function triangle(a, b, c) {
//
//      var t1 = subtract(b, a);
//      var t2 = subtract(c, a);
//      var normal = normalize(cross(t2, t1));
//      normal = vec4(normal);
//      normal[3]  = 0.0;
//
//      normalsArray.push(normal);
//      normalsArray.push(normal);
//      normalsArray.push(normal);
//
//
//      pointsArray.push(a);
//      pointsArray.push(b);
//      pointsArray.push(c);
//
//      index += 3;
// }
//
//
// function divideTriangle(a, b, c, count) {
//     if ( count > 0 ) {
//
//         var ab = mix( a, b, 0.5);
//         var ac = mix( a, c, 0.5);
//         var bc = mix( b, c, 0.5);
//
//         ab = normalize(ab, true);
//         ac = normalize(ac, true);
//         bc = normalize(bc, true);
//
//         divideTriangle( a, ab, ac, count - 1 );
//         divideTriangle( ab, b, bc, count - 1 );
//         divideTriangle( bc, c, ac, count - 1 );
//         divideTriangle( ab, bc, ac, count - 1 );
//     }
//     else {
//         triangle( a, b, c );
//     }
// }
//
//
// function tetrahedron(a, b, c, d, n) {
//     divideTriangle(a, b, c, n);
//     divideTriangle(d, c, b, n);
//     divideTriangle(a, d, b, n);
//     divideTriangle(a, c, d, n);
// }

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);


//    tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);


    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );

    // document.getElementById("Button0").onclick = function(){radius *= 2.0;};
    // document.getElementById("Button1").onclick = function(){radius *= 0.5;};
    // document.getElementById("Button2").onclick = function(){theta += dr;};
    // document.getElementById("Button3").onclick = function(){theta -= dr;};
    // document.getElementById("Button4").onclick = function(){phi += dr;};
    // document.getElementById("Button5").onclick = function(){phi -= dr;};
    document.getElementById("cameraPos").onchange = function() {
      if(document.getElementById("cameraPos").value == "A") {
        eye = vec3(-0.5, 1.0, 2.5);
        at = vec3(0.5, 0.0, 1.5);
      }
      if(document.getElementById("cameraPos").value == "B") {
        eye = vec3(1.5, 1.0, 2.5);
        at = vec3(1.5, 0.0, 1.5);
      }
      if(document.getElementById("cameraPos").value == "C") {
        eye = vec3(3.5, 1.0, 2.5);
        at = vec3(2.5, 0.0, 1.5);
      }
      if(document.getElementById("cameraPos").value == "D") {
        eye = vec3(-0.5, 1.0, -0.5);
        at = vec3(0.5, 0.0, 0.5);
      }
      if(document.getElementById("cameraPos").value == "E") {
        eye = vec3(1.5, 1.0, -0.5);
        at = vec3(1.5, 0.0, 0.5);
      }
      if(document.getElementById("cameraPos").value == "F") {
        eye = vec3(3.5, 1.0, -0.5);
        at = vec3(2.5, 0.0, 0.5);
      }
    }

    document.getElementById("lightPos").onchange = function() {
      if(document.getElementById("lightPos").value == "1") {
        lightPosition = vec4(0.5, 1.0, 0.5, 1.0 );
        init();
      }
      if(document.getElementById("lightPos").value == "2") {
        lightPosition = vec4(0.5, 1.0, 1.5, 1.0 );
        init();
      }
      if(document.getElementById("lightPos").value == "3") {
        lightPosition = vec4(1.5, 1.0, 1.5, 1.0 );
        init();
      }
      if(document.getElementById("lightPos").value == "4") {
        lightPosition = vec4(2.5, 1.0, 1.5, 1.0 );
        init();
      }
      if(document.getElementById("lightPos").value == "5") {
        lightPosition = vec4(2.5, 1.0, 0.5, 1.0 );
        init();
      }
    }

    document.getElementById("increaseAngle").onclick = function() {
      cutoffAngle += 5;
      init();
    }

    document.getElementById("decreaseAngle").onclick = function() {
      cutoffAngle -= 5;
      init();
    }

    document.getElementById("moveUp").onclick = function() {
      lightZ += 0.1;
      init();
    }

    document.getElementById("moveDown").onclick = function() {
      lightZ -= 0.1;
      init();
    }

    document.getElementById("moveLeft").onclick = function() {
      lightX -= 0.1;
      init();
    }

    document.getElementById("moveRight").onclick = function() {
      lightX += 0.1;
      init();
    }

    // document.getElementById("Button6").onclick = function(){
    //     numTimesToSubdivide++;
    //     index = 0;
    //     pointsArray = [];
    //     normalsArray = [];
    //     init();
    // };
    // document.getElementById("Button7").onclick = function(){
    //     if(numTimesToSubdivide) numTimesToSubdivide--;
    //     index = 0;
    //     pointsArray = [];
    //     normalsArray = [];
    //     init();
    // };


    gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );

    gl.uniform3fv(gl.getUniformLocation(program, "lightDirection"), vec3(lightX, lightY, lightZ));

    gl.uniform1f(gl.getUniformLocation(program, "cutoffAngle"), Math.cos(degToRad(cutoffAngle)));

    gl.uniform3fv(gl.getUniformLocation(program, "eyeWorldPosition"), flatten(eye));

    render();
}


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
    //     radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];


    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );

    for( var i=0; i<pointsArray.length; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3);

    window.requestAnimFrame(render);
}
