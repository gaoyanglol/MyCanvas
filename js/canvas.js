var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")
var eraser = document.getElementById("eraser")

autoSetCanvasSize(canvas)
listenToUser(canvas)

var eraserOn = false
pen.onclick = function () {
  eraserOn = false
}
eraser.onclick = function () {
  eraserOn = true
}
/**********/
function autoSetCanvasSize(canvas) {
  resize()
  window.onresize = resize
  function resize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth*0.9
    canvas.height = pageHeight*0.9
  }
}
function drawSpot(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.closePath()
  context.fill()
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.lineWidth = 6
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
}

/*********/
function listenToUser(canvas) {
  var using = false
  var lastPoint = { x: undefined, y: undefined }

  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      using = true
      if (eraserOn) {
        context.clearRect(x, y, 10, 10)
      } else {
        drawSpot(x, y, 3)
        lastPoint = { x: x, y: y }
      }
    }
    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if (!using) { return }
      if (eraserOn) {
        context.clearRect(x, y, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawSpot(x, y, 3)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (e) {
      using = false
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (e) {
      var x = e.clientX
      var y = e.clientY
      using = true
      if (eraserOn) {
        context.clearRect(x, y, 10, 10)
      } else {
        drawSpot(x, y, 3)
        lastPoint = { x: x, y: y }
      }
    }
    canvas.onmousemove = function (e) {
      var x = e.clientX
      var y = e.clientY
      if (!using) { return }
      if (eraserOn) {
        context.clearRect(x, y, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawSpot(x, y, 3)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (e) {
      using = false
    }
  }

}

