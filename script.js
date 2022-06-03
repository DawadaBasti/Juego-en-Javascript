import gsap from 'gsap'
const axios = require('axios')
window.$ = window.JQuery = require('jquery')

import './style.css'
var key = 0
let game = {

    init: async () => {

        let world = document.createElement('div')
        world.style.position = 'absolute'
        world.style.width = '100vw'
        world.style.height = '100vh'
        world.style.overflow = 'hidden'
        world.setAttribute('id', 'world')
        document.body.appendChild(world)

       let textos = document.createElement('div')
        textos.style.position = 'absolute'
        textos.style.top = '0px'
        textos.style.left = '0px'
        textos.innerText = 'Izquierda 1 --- derecha 3  ////  dispario barra espaciadora'
        document.body.appendChild(textos)

        await game.personaje()
        await game.moverPersonaje()
        await game.levelStage()
        

    },
    personaje: async () => {
        let point = document.createElement('div')
        point.style.width = '25px'
        point.style.height = '25px'
        point.style.borderRadius = '50%'
        point.style.backgroundColor = '#235689'
        point.style.position = 'absolute'
        point.style.left = (window.innerWidth / 2).toString() + 'px'
        point.style.top = (window.innerHeight - 50).toString() + 'px'
        point.setAttribute('id', 'personaje')

        const world = document.getElementById('world')
        world.appendChild(point)
    },
    moverPersonaje: async () => {

        document.addEventListener('keypress', function (e) {
            console.log(e.keyCode)

            if (e.keyCode == 49) {

                gsap.to("#personaje", { duration: 0.2, left: "-=55" });
            }
            if (e.keyCode == 51) {

                gsap.to("#personaje", { duration: 0.2, left: "+=55" });
            }
            if (e.keyCode == 32) {
                game.bala()
         
            }

        })
    },
    randomColor: function () {
        const randColor = Math.floor(Math.random() * 16777215).toString(16)
        return randColor
    },
    enemigos: async (max, min, key, positionX) => {

        const aleatorio = game.radomNumer(max, min).toString() + 'px'

        let point = document.createElement('div')
        point.style.width = aleatorio
        point.style.height = aleatorio
       // point.style.borderRadius = '50%'
        point.style.backgroundColor = '#' + game.randomColor()
        point.style.position = 'absolute'
        point.style.left = positionX + 'px'
        point.style.top = '-100px'
        point.setAttribute('class', 'enemigo')
        point.setAttribute('id', 'eny' + key)

        const world = document.getElementById('world')
        world.appendChild(point)

    },
    radomNumer: (max, min) => {
        return Math.round(Math.random() * (max - min) + min)
    },
    levelStage: async () => {
        setTimeout(async function () {
            let max = window.innerWidth - 100
            let min = 0
            const positionX = game.radomNumer(max, min)
            await game.enemigos(30, 100, key, positionX)
            const delay = game.radomNumer(5, 0.2) / 6
            let name = 'eny' + key.toString()

            let worldHeight = window.innerHeight + 100
            gsap.set('#' + name, { opacity: 0.8, scale: 0.2 });
            gsap.to('#' + name, {
                opacity: 1,
                scale: 1,
                rotation:960,
                delay: delay,
                duration: 1.5,
                y: worldHeight,
                ease: "sine.out",
                onComplete: function () {
                    document.getElementById(name).remove()
                }
            })
            key++
            game.levelStage()
        }, 200);

    },
    bala: async () => {
        console.log('ss')
        let perso = document.getElementById('personaje')
        let point = document.createElement('div')
        point.style.width = '10px'
        point.style.height = '10px'
        point.style.borderRadius = '50%'
        point.style.backgroundColor = '#784512'
        point.style.position = 'absolute'
        point.style.left = perso.style.left
        point.style.top = perso.style.top
        point.setAttribute('class', 'bala')
        point.setAttribute('id', 'choque')


        const world = document.getElementById('world')
        world.appendChild(point)

        gsap.to('.bala', { duration: 10.5, y: -window.innerHeight },);

        point = document.getElementById('choque')
        point.addEventListener('click', e => {
            let x = e.pageX
            let y = e.pageY
            console.log(x, y)

        })


    },
    killObstaculos: async () => {
        
    }
};
(async () => {
    game.init()
})();
