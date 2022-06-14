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
        this.userCarDiv
        this.userCar
        this.carHeight = 115
        this.userCarLane = 1
        this.speed = speed
        this.carList = carList
        this.carSpeed = carSpeed
        this.enemyCarList = []

        this.enemyCarMoveInterval
        this.enemyCarCreateInterval

        this.carControls()
        this.userCarCreate()
        this.enemyCarCreate()
        this.enemyCarMove()
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
        this.userCarDiv.style.bottom = '2%'

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
            }, this.speed * 150)
        
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
                        
                        const newCarPos = carDict.pos + this.carSpeed
                        this.enemyCarList[i]['pos'] = newCarPos
                        carDict.car.style.top = toPx(newCarPos)

                        if (this.enemyCarList[i]['pos'] > 580){
                            this.enemyCarList[i]['car'].remove()
                            this.enemyCarList.splice(i, 1)
                        
                        }
                    })
            
                
            }
            }, this.speed )         
    }
}


let carGameClass = 'car_game'

const game1 = new CarGame(carGameClass, 3, 30, 2, carList)