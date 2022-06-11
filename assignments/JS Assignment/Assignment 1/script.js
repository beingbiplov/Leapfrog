const container = document.getElementById('container')

container.style.paddingTop = '3%'
 
const canvas = document.createElement('div')
const canvasHeight = 500
const canvasWidth  = 1000
canvas.style.height= toPx(canvasHeight)
canvas.style.width = toPx(canvasWidth)
canvas.style.margin = `0 auto`
canvas.style.border='2px solid #00cb5b'
canvas.style.backgroundColor = '#F0F0F0'
canvas.style.position = 'relative'
canvas.style.boxShadow= '1px 1px 10px #00cb5b'
container.appendChild(canvas)

// generate random color hex 
let randomColor = () => {return Math.floor(Math.random()*16777215).toString(16);}

// convert int to px value 
function toPx(x){
    return `${x}px`
}

// convert int to % 
function toPer(x){
    return `${x}%`
}


const DEFEAULT_x = 1
const DEFEAULT_y = 1
const DEFEAULT_sx = 5
const DEFEAULT_sy = 7
const DEFEAULT_dx = 1
const DEFEAULT_dy = 1
const DEFEAULT_w = 30
const DEFEAULT_h = 30
const DEFEAULT_col = '#ec2'


class ball {
    constructor(
        x = DEFEAULT_x,
        y = DEFEAULT_y,
        sx = DEFEAULT_sx,
        sy = DEFEAULT_sy,
        dx = DEFEAULT_dx,
        dy = DEFEAULT_dy,
        w = DEFEAULT_w,
        h = DEFEAULT_h,
        col = DEFEAULT_col
    )
    {
        this.x = x
        this.y = y
        this.sx = sx
        this.sy = sy
        this.dx = dx
        this.dy = dy
        this.w = w
        this.h = h
        this.col = col
    }
        
    // to create ball 
    draw(){
        this.ball = document.createElement('div')
        this.ball.style.width = toPx(this.w)
        this.ball.style.height = toPx(this.w)
        this.ball.style.borderRadius = '50%'
        this.ball.style.position = 'absolute'
        this.ball.style.top = toPx(this.y)
        this.ball.style.left = toPx(this.x)
        this.ball.style.backgroundColor = `#${randomColor()}`
        canvas.appendChild(this.ball)
    }

    // for ball movement 
    move() {
        this.x += this.sx * this.dx
        this.y += this.sy * this.dy

        this.ball.style.left = toPx(this.x)
        this.ball.style.top = toPx(this.y)
    }

    // to check for wall collision 
    wallCollisionDetection() {
        if (this.x >= (canvasWidth - this.w * 1.01)){this.dx=-1}
        if (this.y > (canvasHeight - this.h * 1.01)){this.dy=-1}
        

        if (this.x <= 0){this.dx=1}
        if (this.y <= 0){this.dy=1}

    }

    // to check for ball collisions 
    ballCollisionDetection(ballArray, i) {
        ballArray.forEach((b2, j) => {
            if (i == j){
                // pass
            }
            else {
                let DX = (this.x + (this.w/2)) - (b2.x + (b2.w/2))
                let DY = (this.y +(this.h/2)) - (b2.y + (b2.h/2))

                const distance = Math.sqrt(DX*DX + DY*DY)

                const radiusSum = this.w/2 + b2.h/2

                if (distance <= radiusSum){

                    // let new_sx1 = (this.sx * (this.w/2 - b2.w/2) + (2 * b2.w/2 * b2.sx)) / (this.w/2 + b2.w/2);
                    // let new_sy1 = (this.sy * (this.w/2 - b2.w/2) + (2 * b2.w/2 * b2.sy)) / (this.w/2 + b2.w/2);

                    // let new_sx2 = (b2.sx * (b2.w/2 - this.w/2) + (2 * this.w/2 * this.sx)) / (b2.w/2 + this.w/2);
                    // let new_sy2 = (b2.sy * (b2.w/2 - this.w/2) + (2 * this.w/2 * this.sy)) / (b2.w/2 + this.w/2);
                    // this.sx = new_sx1;
                    // this.sy = new_sy1;
                    // b2.sx = new_sx2;
                    // b2.sy = new_sy2;

                    this.dx = -this.dx
                    this.dy = -this.dy
                }
            }             
        })          
    }
}


ballArr = []
ballData =[]


// generate random balls on ball box that doesnot collide initially
let generateBalls = (n) =>{
    for (i=0; ballData.length<n; i++){
        let ballX = getRandomInt(0, canvasWidth-1)
        let ballY = getRandomInt(0, canvasHeight -1)
        let ballSx =  getRandomInt(1,3)
        let ballSy = getRandomInt(1,3)
        let ballDx = Math.random()>0.5? 1: -1
        let ballDy = Math.random()>0.5? 1: -1
        let ballW = getRandomInt(20,40)
        let ballH = ballW
        let collision = 0

        // to check all balls are placed in unique position and do not collide on create 
        ballData.forEach((b2) => {
                        let DX = (ballX + (ballW/2)) - (b2.ballX + (b2.ballW/2))
                    let DY = (ballY +(ballH/2)) - (b2.ballY + (b2.ballH/2))

                    let distance = Math.sqrt(DX*DX + DY*DY)

                    let radiusSum = ballW/2 + b2.ballW/2

                    if (distance <= radiusSum){
                        collision = 1
                    }
                })

        if (collision == 0){
            ballData.push(
                {
                    'ballX' : ballX,
                    'ballY' : ballY,
                    'ballSx': ballSx,
                    'ballSy' : ballSy,
                    'ballDx' : ballDx,
                    'ballDy' : ballDy,
                    'ballW' : ballW,
                    'ballH' : ballH,
                }
            )
        }

    }

    return ballData

}

// add balls to canvas container 
const AddBallsToCanvas = (()=>{
    let balls = generateBalls(17)

    balls.forEach((b) => {
        const newBall = new ball(b.ballX, b.ballY, b.ballSx, b.ballSy, b.ballDx, b.ballDy, b.ballW, b.ballH)
        newBall.draw()
        ballArr.push(newBall)
    })
})

// for (i=0; i< 15; i++){
//     // console.log(getRandomInt(0, canvasWidth), getRandomInt(0, canvasHeight), getRandomInt(0,10), getRandomInt(0,10), 10, 10)
//     let b = new ball(getRandomInt(50, canvasWidth-50), getRandomInt(50, canvasHeight-50), getRandomInt(0,3), getRandomInt(0,3), Math.random()>0.5? 1: -1, Math.random()>0.5? 1: -1, getRandomInt(10,50), 10)
//     // const b = new ball(50,50, 1, 1,)
//     b.draw()
//     ballArr.push(b)
// }



function play() {

    ballArr.forEach((ball, i) =>{
        ball.move()
        ball.wallCollisionDetection()
        
        ball.ballCollisionDetection(ballArr, i)
    })
    

    window.requestAnimationFrame(() => {
        play()
    })
}

play()
AddBallsToCanvas()


// generate random int 
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const resetButton = document.getElementById('reset')

// rest canvas and generate new balls 
resetButton.addEventListener("click", () => {
    console.log('asdasd')
    canvas.replaceChildren()
    ballArr = []
    ballData = []
    AddBallsToCanvas()
})