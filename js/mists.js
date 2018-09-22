//Animate Mists

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

/*
=================== Class Mists =================
        Animation move Mists left to right

 * initial Left or Right = -150% (this.initialStartInHidden)
 * please in your css dont add propety left or right to Element.
=================================================
*/

class Mists {

    constructor(mist, orientation = 'left') {

        this.mist = mist;                                       //Element container Img
        this.speed = 1;                                         //(1 - 1000) == (fast - low)
        this.startInitiality = false;                           //Start mists Left or Right > 0%, default
        this.orientation = orientation;                         //direction mist, default 'left'
        this._hide = false;                                     //true == hide mist and pause function start.
        this.speedMin = 700;
        this.speedMax = null;
        this.initialStartInHidden = 150;                        //value = (0 - this.value), when the mist is not inside the frame of the game

        this.mistIsArray = this.mist instanceof Array;          //development

    }

    start(speedMin = 700, speedMax = null){

        if(speedMin >= speedMax) {
            if(speedMax !== null){
                console.error("The speedMin attribute must not be greater than speedMax");
                return;
            }
        }

        this.speedMin = speedMin;
        this.speedMax = speedMax;

        const animation = timestamp => {

            this.speed =  Math.round( (this.speedMax === null) ? this.speedMin : Math.random() * (this.speedMin - this.speedMax) + this.speedMax );

            let start = timestamp;                            //Save time Start
            let random = Math.random() * (0 - 100) + 100;

            let step = _timestamp => {

                let progress = _timestamp - start;
                //console.log(progress)
                let value = (progress/this.speed + random) - ((this.startInitiality) ? this.initialStartInHidden : 0);

                if (this.orientation === 'right') {
                    this.mist.style.right = `${value}%`
                }else{
                    this.mist.style.left = `${value}%`
                }

                if (this._hide) return;                     //Hide

                if (value < 100) {
                    requestAnimationFrame(step)
                }else{
                    this.startInitiality = true;            //Start Left or Right < 0%
                    requestAnimationFrame(animation);       //Start again
                }

            }
            step(timestamp);
        }
        requestAnimationFrame(animation);

    }

    /*
     ================== Development =======================
     Objective:
     * animate multiple mists (array)
    */
    startAll(){
        if (this.mistIsArray) {
            //this.start(this.speedMin, this.speedMax)
        }else{
            console.info('Mist is not Array. Use start().')
        }
    }

    //=================================================//

    hide(){
        this._hide = true;
        this.mist.style.visibility = 'hidden';
    }

    visible(){
        this._hide = false;
        this.mist.style.visibility = 'visible';
        this.startInitiality = true;
        this.start(this.speedMin, this.speedMax);
    }

}

const mist1 = new Mists(document.getElementsByClassName("mists")[0].children[0], 'right');
const mist2 = new Mists(document.getElementsByClassName("mists")[0].children[1], 'left');
const mist3 = new Mists(document.getElementsByClassName("mists")[1].children[0], 'left');
const mist4 = new Mists(document.getElementsByClassName("mists")[1].children[1], 'right');

mist1.start();
mist2.start(100, 1000);
mist3.start(50, 900);
mist4.start(900, 1200);