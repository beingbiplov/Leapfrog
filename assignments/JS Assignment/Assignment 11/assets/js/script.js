let toPx = (n) => {
    return `${n}px`
}

let gameSectionDiv = document.getElementById('game_section')
const gameScreenHeight = 500
const baseHeight = 80
const activeGameWindow = gameScreenHeight - baseHeight

const birdImages = ['bluebird-downflap.png', 'bluebird-midflap.png', 'bluebird-upflap.png', 'bluebird-midflap.png']

class Game {
    constructor(gameSectionDiv, gameScreenHeight){
        this.gameSectionDiv = gameSectionDiv
        this.gameScreenHeight = gameScreenHeight

        // this.gravity = 20

        this.birdDiv
        this.birdImg

        this.birdPosY = 200
        this.birdImgIdx = 1
        this.birdHeight = 20
        this.birdWidth = 20
        this.birdDownCount = 0

        this.moveBirdDownInterval
        this.animateBirdInterval

        this.drawBird()
        this.moveBirdDown()
        this.animateBird()
        this.birdControls()
    }

    drawBird(){

        this.birdDiv = document.createElement('div')
        this.birdDiv.style.position = 'absolute'
        this.birdDiv.style.left = '20%'
        this.birdDiv.style.height = toPx(this.birdHeight)
        this.birdDiv.style.width = toPx(this.birdWidth)
        this.birdDiv.style.top = toPx(this.birdPosY)
        this.birdDiv.style.zIndex = '2'

        this.gameSectionDiv.appendChild(this.birdDiv)
        
        this.birdImg = document.createElement('img')
        this.birdImg.src = `./assets/images/${birdImages[this.birdImgIdx]}`
        this.birdImgIdx += 1

        this.birdDiv.appendChild(this.birdImg)

    }

    animateBird(){

        this.animateBirdInterval = setInterval(() => {
            this.birdImg.src = `./assets/images/${birdImages[this.birdImgIdx]}`
            if (this.birdImgIdx >= 2){
                this.birdImgIdx = 0
            }
            else{
                this.birdImgIdx += 1
            }
        }, 10000/60)
        
        
    }

    moveBirdDown(){
        this.moveBirdDownInterval = setInterval(() => {
            this.birdPosY += 1
            
            if (this.birdPosY <= 400 && this.birdPosY >= 0) {
                this.birdDiv.style.top = toPx(this.birdPosY)
                this.birdDownCount +=1
                this.manageBirdAngle()
                
            }
            else if(this.birdPosY >= 400){
                clearInterval(this.animateBirdInterval)
                clearInterval(this.moveBirdDownInterval)
            }
            
        }, 1000/60)
    }

    moveBirdUp() {
        if (this.birdPosY <= 400 && this.birdPosY >= 0) {
            this.birdPosY -= 20
            this.birdDiv.style.top = toPx(this.birdPosY)
            this.birdDownCount = 0
            this.manageBirdAngle()

            // clearInterval(this.moveBirdDownInterval)
            // setTimeout(()=>{this.moveBirdDown()}, 200)
        }
    }

    birdControls() {

        document.addEventListener("keydown", function (evt) {
            if (evt.key === "Space" || evt.key === "ArrowUp") {
                this.moveBirdUp()

            }}.bind(this));
    }

    manageBirdAngle(){
        console.log(this.birdDownCount)
        if (this.birdDownCount == 0){
            this.birdDiv.style.transform = "rotateZ(-20deg)"
        }
        else if (this.birdDownCount >= 20 && this.birdDownCount < 50){
            this.birdDiv.style.transform = "rotateZ(0deg)"
        }
        else if (this.birdDownCount >= 50){
            this.birdDiv.style.transform = "rotateZ(60deg)"
        }

    }


}

game1 = new Game(gameSectionDiv, gameScreenHeight)