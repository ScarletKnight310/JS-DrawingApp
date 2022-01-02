const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

let prevX = null
let prevY = null

ctx.lineWidth=5
ctx.globalAlpha=1
document.getElementById("thick").value = ctx.lineWidth
document.getElementById("opacity").value = ctx.globalAlpha
let draw = false

// Draw Actions
window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let currentX = e.clientX
    let currentY = e.clientY

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

// App Buttons
//----- Colors
let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

//---- Brush Thickness
let thickBtn = document.querySelector(".thickBtn")
thickBtn.addEventListener("click", () => {
    ctx.lineWidth = document.getElementById("thick").value
})

//---- Brush Opacity
let opaBtn = document.querySelector(".opaBtn")
opaBtn.addEventListener("click", function(){
    ctx.globalAlpha = document.getElementById("opacity").value
})

//---- Clear
let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    // Clearning the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

//---- Save
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
})
