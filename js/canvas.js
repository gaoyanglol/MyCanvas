var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")
var eraser = document.getElementById("eraser")
var lineWidth = 5
var spotRadius = 2.5

autoSetCanvasSize(canvas)
listenToUser(canvas)

var eraserOn = false
pen.onclick = function () {
  eraserOn = false
  pen.classList.add("active")
  eraser.classList.remove("active")
}
eraser.onclick = function () {
  eraserOn = true
  eraser.classList.add("active")
  pen.classList.remove("active")
}

red.onclick = function() {
  context.fillStyle = "red"
  context.strokeStyle = "red"
  red.classList.add("active")
  blue.classList.remove("active")
  green.classList.remove("active")
}
green.onclick = function() {
  context.fillStyle = "green"
  context.strokeStyle = "green"
  red.classList.remove("active")
  blue.classList.remove("active")
  green.classList.add("active")
}
blue.onclick = function() {
  context.fillStyle = "blue"
  context.strokeStyle = "blue"
  red.classList.remove("active")
  blue.classList.add("active")
  green.classList.remove("active")
}
thin.onclick = function() {
  lineWidth = 5
  spotRadius = 2.5
}
thick.onclick = function() {
  lineWidth = 10
  spotRadius = 5
}
clear.onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}
download.onclick = function() {
  var url = canvas.toDataURL("image/png")
  var a = document.createElement('a')
  a.href = url
  a.download = 'xxx'
  a.target = "_blank"
  a.click()
}
/**********/
function autoSetCanvasSize(canvas) {
  resize()
  window.onresize = resize
  function resize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
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
  context.lineWidth = lineWidth
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
        drawSpot(x, y, spotRadius)
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
        drawSpot(x, y, spotRadius)
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
        drawSpot(x, y, spotRadius)
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
        drawSpot(x, y, spotRadius)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (e) {
      using = false
    }
  }

}

