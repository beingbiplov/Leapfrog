let toPx = (n) => {
    return `${n}px`
}


let getRandomFromList = (list) =>  {
    return list[Math.floor(Math.random() * list.length)];
  }

const carList = ['car1.png', 'car2.png', 'car3.png']

// generate random int 
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

class CarGame{
    constructor(carGameClass, lanes, speed, carSpeed, carList){
        this.carGameClass = carGameClass
        this.lanes = lanes
        this.game
        this.score = 0
        this.highscore = 0

        this.userCarDiv
        this.userCar
        this.userCarYPos = 470
        this.carHeight = 115
        this.userCarLane = 1
        this.speed = speed
        this.carList = carList
        this.carSpeed = carSpeed
        this.enemyCarSpeed = 1.2
        this.enemyCarList = []

        this.enemyCarMoveInterval
        this.enemyCarCreateInterval
        this.collisionInterval
        this.scoreInterval
        this.gameSpeedInterval

        this.carControls()
        this.userCarCreate()
        this.enemyCarCreate()
        this.enemyCarMove()
        this.detectCollision()
    }

    getPosX(lane){
        return (lane * (600 / (this.lanes)))
    }

    userCarCreate(){
        this.game = document.getElementsByClassName('car_game')[0]

        this.userCarDiv = document.createElement('div')
        this.userCarDiv.style.width = toPx(600 / (this.lanes)) 
        this.userCarDiv.style.height = toPx(this.carHeight)
        this.userCarDiv.style.position = 'absolute'
        this.userCarDiv.style.top = toPx(this.userCarYPos)

        this.game.appendChild(this.userCarDiv)

        this.userCar = document.createElement('img')
        
        this.userCar.src = './assets/images/Black_viper.png'
        this.userCar.style.width = '55%'
        this.userCar.style.display = 'block'
        this.userCar.style.margin = '0 auto'

        this.userCarDiv.style.left = toPx(this.getPosX(1))

        this.userCarDiv.appendChild(this.userCar)
        
    }

    carControls() {

        document.addEventListener("keydown", function (evt) {
            if (evt.key === "a" || evt.key === "ArrowLeft") {
                this.moveCar(-1);
            } else if (evt.key === "d" || evt.key === "ArrowRight") {
                this.moveCar(1);
            }
            }.bind(this));
    }

    moveCar(dir) {
        if ((this.userCarLane == 0 && dir == -1) || (this.userCarLane == this.lanes-1 && dir == +1)){
            // pass
        }
        else {
            // console.log(this.userCarLane)
            this.userCarLane += dir
            let newPos = this.getPosX(this.userCarLane) // * (600 / (this.lanes))
            this.userCarDiv.style.left = toPx(newPos)
            
        }
    }

    enemyCarCreate(){
        this.game = document.getElementsByClassName(this.carGameClass)[0]

        this.enemyCarCreateInterval = setInterval(() =>{
            // console.log(this.enemyCarList.length)
            
            
            if(this.enemyCarList.length <=2){
                let lane = getRandomInt(0,3)
                const checkEnemyCarSpawn = this.checkEnemyCarSpawnPositon(lane)
                // console.log(checkEnemyCarSpawn)
                if (checkEnemyCarSpawn == true){
                    const enemyCarDiv = document.createElement('div')
                    enemyCarDiv.style.width = toPx(600 / (this.lanes)) 
                    enemyCarDiv.style.position = 'absolute'
                    enemyCarDiv.style.top = '2%'
                    enemyCarDiv.style.height = toPx(this.carHeight)

                    this.game.appendChild(enemyCarDiv)

                    const enemyCar = document.createElement('img')
                    
                    enemyCar.src = `./assets/images/${getRandomFromList(this.carList)}`
                    enemyCar.style.width = '55%'
                    enemyCar.style.display = 'block'
                    enemyCar.style.margin = '0 auto'
                    enemyCar.style.transform = "rotate(180deg)";

                    enemyCarDiv.style.left = toPx(this.getPosX(lane))
                    enemyCarDiv.appendChild(enemyCar)

                    this.enemyCarList.push({'car':enemyCarDiv, 'pos': 0, 'lane':lane})
                    // this.enemyCarMove()
                }
                
            }
            // else if (this.enemyCarList.length > 3){
            //     console.log('clear')
            //     clearInterval(this.enemyCarCreateInterval)
            //     setTimeout(this.enemyCarCreate(), 2000)
            // }
            }, this.speed * 135)
        
    }

    checkEnemyCarSpawnPositon(lane){
            // check conditions
            return true
        }
    
    enemyCarMove(){

        this.enemyCarMoveInterval = setInterval(() => {
            if (this.enemyCarList.length > 0){
                    // console.log(`speed: ${this.speed}`)
                    this.enemyCarList.forEach((carDict, i) => {
                        
                        const newCarPos = carDict.pos + this.enemyCarSpeed
                        this.enemyCarList[i]['pos'] = newCarPos
                        carDict.car.style.top = toPx(newCarPos)

                        if (this.enemyCarList[i]['pos'] > 580){
                            this.updateScore()
                            this.enemyCarList[i]['car'].remove()
                            this.enemyCarList.splice(i, 1)
                        
                        }
                    })     
            }
            }, this.carSpeed )         
    }

    detectCollision(){
        this.collisionInterval = setInterval(() => {
            for (const car of this.enemyCarList){
                var dim1 = {x: this.getPosX(this.userCarLane), y: this.userCarYPos, w: (600 / (this.lanes)), h: this.carHeight}
                var dim2 = {x: this.getPosX(car['lane']), y: car['pos'], w: (600 / (this.lanes)), h: this.carHeight}

                if (dim1.x < dim2.x + dim2.w &&
                    dim1.x + dim1.w > dim2.x &&
                    dim1.y < dim2.y + dim2.h &&
                    dim1.h + dim1.y > dim2.y) {
                    // collision detected!
                        clearInterval(this.enemyCarMoveInterval)
                        clearInterval(this.enemyCarCreateInterval)
                        clearInterval(this.collisionInterval)
                        clearInterval(this.scoreInterval)
                        this.handleCollision() 
                } 
            }
        }, 1)
    }

    checkGameSpeed() {
        
        if (this.score % 2 ==0 ){
            if (this.carSpeed >=2){
                this.carSpeed -= 1
                clearInterval(this.enemyCarMoveInterval)
                this.enemyCarMove()
            }
            if (this.enemyCarSpeed < 5) {
                this.enemyCarSpeed += 0.2
            } 
        }

        if (this.score % 3 == 0){
            if (this.speed >= 4){
                this.speed -= 3
                clearInterval(this.enemyCarCreateInterval)
                this.enemyCarCreate()
            }
        }
        
        // console.log(this.speed) 
    }

    updateScore() {
        this.score += 1
        this.checkGameSpeed()
    }

    handleCollision(){
        if (this.score > this.highscore){
            this.highscore = this.score
        }
        console.log(this.score)
    }

}


let carGameClass = 'car_game'

const game1 = new CarGame(carGameClass, 3, 18, 7, carList)