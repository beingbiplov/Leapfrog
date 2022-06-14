let toPx = (n) => {
    return `${n}px`
}

class CarGame{
    constructor(carGameClass, lanes){
        this.carGameClass = carGameClass
        this.lanes = lanes
        this.game
        this.userCarDiv
        this.userCar
        this.userCarLane = 0
        this.carControls()
        this.userCarCreate()
    }

    userCarCreate(){
        this.game = document.getElementsByClassName('car_game')[0]

        this.userCarDiv = document.createElement('div')
        this.userCarDiv.style.width = toPx(600 / (this.lanes)) 
        this.userCarDiv.style.position = 'absolute'
        this.userCarDiv.style.bottom = '2%'

        this.game.appendChild(this.userCarDiv)

        this.userCar = document.createElement('img')
        
        this.userCar.src = './assets/images/Black_viper.png'
        this.userCar.style.width = '55%'
        this.userCar.style.display = 'block'
        this.userCar.style.margin = '0 auto'

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
            console.log('pass')
        }
        else {
            console.log(this.userCarLane)
            this.userCarLane += dir
            let newPos = this.userCarLane * (600 / (this.lanes))
            this.userCarDiv.style.left = toPx(newPos)
            
        }
    }
    
}


let carGameClass = 'car_game'

const game1 = new CarGame(carGameClass, 3)