
const imgCarouse = document.getElementById('carousel')
const carouselWrapper = document.getElementById('carousel-wrapper')
const imgList = document.getElementsByClassName("c1_img")

const dotContainer = document.createElement('div')
dotContainer.style.position= 'absolute'
dotContainer.style.bottom = '10px'
dotContainer.style.display = 'flex'
dotContainer.style.width = '100%'
dotContainer.style.justifyContent = 'center'
imgCarouse.appendChild(dotContainer)

let toPx = n =>{
    return `${n}px`
}

class Carousel {
    constructor(imgList, cWidth, holdTime, speed){
        this.imgList = imgList
        this.imgListLen = imgList.length
        this.currentIdx = 0
        this.holdTime = holdTime
        this.speed = speed
        this.dir = 'right'
        this.moving = false
        this.currentPos = 0
        this.cWidth = cWidth
        this.autoSlideId
        this.createToggleBtns()
        this.indicatorDots()
        this.autoSlide()
    }

    createToggleBtns() {
        const prev = document.createElement('img')
        const next = document.createElement('img')
        prev.innerHTML = '<'
        // prev.style.padding = '10px 10px'
        prev.style.backgroundColor = 'grey'
        prev.style.position = 'absolute'
        prev.style.left = '2%'
        prev.style.top = `40%`
        prev.style.cursor = 'pointer'
        prev.style.borderRadius = '50%'
        prev.style.width = "25px"
        prev.style.height = "25px"
        prev.src  = './assets/images/prev.png'
        prev.style.margin = "0 auto"
        prev.style.opacity = '0.8'
        prev.addEventListener('click', () => this.moveImg(-1))

        next.innerHTML = '>'
        // next.style.padding = '10px 10px'
        next.style.backgroundColor = 'grey'
        next.style.position = 'absolute'
        next.style.left = '90%'
        next.style.top = `40%`
        next.style.cursor = 'pointer'
        next.style.borderRadius = '50%'
        next.style.width = "25px"
        next.style.height = "25px"
        next.src  = './assets/images/next.png'
        next.style.margin = "0 auto"
        // next.style.opacity = '0.8'
        next.addEventListener('click', () => this.moveImg(1))

        imgCarouse.appendChild(prev)
        imgCarouse.appendChild(next)
    }

    indicatorDots(){
        for (let i=0; i<this.imgList.length; i++){
            let dot = document.createElement('div')
            dot.style.padding = '10px'
            dot.style.border = '2px solid #87CEEB'
            dot.style.borderRadius = '50%'
            dot.id = `dot${i}`
            dot.className += 'dot'
            dot.style.marginLeft = '20px'
            dot.style.cursor = 'pointer'
            dot.addEventListener('click', () => { this.handleDot(i)})
            dotContainer.appendChild(dot)

            if (i==0){
                dot.className += ' active'
            }
        }
    }

    handleDot(dotId) {
        if (dotId < this.currentIdx) {
            this.dir = 'right'
            
        }else if (dotId > this.currentIdx) {
            this.dir = 'left'
        }
        this.currentIdx = dotId
        let newLeft = (this.currentIdx) * (-this.cWidth) 

        this.animateImgSlide(newLeft, 5)
    }

    dotActiveEffect(dId){
        let oldActiveClass = document.getElementsByClassName('active')[0]
        
        oldActiveClass.classList.remove('active')

        let Activeclass = document.getElementById(`dot${dId}`)
        Activeclass.className += ' active'

    }

    moveImg(d) {
        
        if (d==1){
            this.dir='left'
        }
        else{
            this.dir = 'right'
        }

        // console.log(this.currentIdx, this.imgListLen)

        if ((d == 1) && (this.currentIdx >= this.imgListLen-1)){
            this.currentIdx = 0
            this.dir = 'right'

        }else if ((d == -1) &&(this.currentIdx <=  0)){
            this.currentIdx = this.imgListLen -1
            this.dir = 'left'
        }
        else{
            this.currentIdx += d
        }
        
        let newLeft = (this.currentIdx) * (-this.cWidth) 

        this.animateImgSlide(newLeft)
    }


    animateImgSlide(newLeft, incSpeed=1){

        let posInc
        // let incSpeed = 1
        if (this.dir=='left'){
            posInc=-1 *5
        }
        else{
            posInc=1 *5
        }
        if (Math.abs(this.currentPos-newLeft) > this.cWidth){
            incSpeed = 10
        }
        let a = setInterval(() => {
                this.moving = true
                clearInterval(this.autoSlideId)
                this.currentPos += posInc * incSpeed
                carouselWrapper.style.left = toPx(this.currentPos)
                // console.log(this.dir,this.currentPos, newLeft)
                

            if (this.dir=='left' && newLeft >= this.currentPos) {
                clearInterval(a)
                this.dotActiveEffect(this.currentIdx)
                this.moving = false
                this.autoSlide()
                
            }
            else if (this.dir=='right' && newLeft <= this.currentPos) {
                clearInterval(a)
                this.moving = false
                this.dotActiveEffect(this.currentIdx)
                this.autoSlide()
                // this.autoSlideId = setInterval(this.autoSlide(), this.holdTime);
                
            }

        }, this.speed)
    }

    autoSlide(){

        this.autoSlideId = setInterval(() =>{
            if(!this.moving){
                this.moving = true;
                
                if (this.currentIdx >= this.imgListLen-1){
                    this.currentIdx = 0
                    this.dir = 'right'
                    let newLeft = (this.currentIdx) * (-this.cWidth) 

                    this.animateImgSlide(newLeft, 10)
                }
                else{
                    this.currentIdx += 1
                    this.dir = 'left';
                    let newLeft = (this.currentIdx) * (-this.cWidth) 

                    this.animateImgSlide(newLeft)
                }

                if (Math.abs(this.currentPos) % this.cWidth == 0){
                    clearInterval(this.autoSlideId)
                    setTimeout(this.autoSlide(), this.holdTime)
                }
            }
        }, this.holdTime)        
    }
}

let carousel1 = new Carousel(imgList, 500, 2000, 20)

