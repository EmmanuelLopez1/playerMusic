import { FuncionesGenerales } from './funcionesGenerales.js'
import { contenidoItems } from './items.js'
import { reproductor } from '../reproductor/reproductor.js'
const funciones = new FuncionesGenerales()
const player = new reproductor()

const carousel = class Carousel {
    constructor() {
        this.carousel = document.querySelectorAll('.carousel')
        this.buttonsLeft = document.querySelectorAll('.caruosel__btn-left')
        this.buttonsRight = document.querySelectorAll('.caruosel__btn-right')
        this.items = document.querySelectorAll('.carousel__container')
        this.miLista = document.querySelector('#mi-lista')
        this.screenWidth = document.body.clientWidth
        this.agregarItems(this.miLista, contenidoItems)
        this.resize()
        this.listenButtons(this.buttonsLeft, this.buttonsRight)
        this.playerButtonItem()
    }

    listenButtons(buttonsL, buttonsR) {
        for (let i = 0; i < this.items.length; i++) {
            const items = this.items[i].childNodes
            const itemSize = 210
            const margenLateral = .10
            let carouselLimit = 0
            let position = 0

            funciones.elimindarNodosText(items)

            buttonsL[i].addEventListener('click', () => {
                const itemsEnPantalla = this.itemsEnPantlla(this.screenWidth - (this.screenWidth * margenLateral), itemSize)
                if (carouselLimit > 0) {
                    const desplazamiento = itemsEnPantalla * itemSize
                    carouselLimit -= itemsEnPantalla
                    position += desplazamiento
                    this.moverItems(items, position)
                }
            })

            buttonsR[i].addEventListener('click', () => {
                const itemsEnPantalla = this.itemsEnPantlla(this.screenWidth - (this.screenWidth * margenLateral), itemSize)

                if (carouselLimit < this.items[i].childNodes.length - itemsEnPantalla) {
                    const desplazamiento = itemsEnPantalla * itemSize 
                    carouselLimit += itemsEnPantalla
                    position -= desplazamiento
                    this.moverItems(items, position)

                }
            })
        }
    }

    moverItems(items, position) {
        for (const item of items) {
            item.style.transform = `translate(${position}px, 0)`
        }
    }

    limiteCarousel(noItems, itemWidth) {
        return noItems * itemWidth
    }

    itemsEnPantlla(carouselVisible, itemWidth) {
        let itemsEnPantalla = carouselVisible / itemWidth
        let decimal = itemsEnPantalla
        decimal = decimal.toString()
        decimal = decimal.substr(2, 2)
        decimal = parseInt(decimal)

        if (decimal < 64) {
            itemsEnPantalla = Math.floor(itemsEnPantalla)
        }
        else {
            itemsEnPantalla = Math.ceil(itemsEnPantalla)
        }
        return itemsEnPantalla
    }

    resize() {
        window.addEventListener('resize', () => {
            this.screenWidth = document.body.clientWidth
        })
    }

    agregarItems(id, items) {
        for (const item of items) {
            id.innerHTML += `
            <div class="carousel-item-move">
            <div class="carousel-item">
            <img class="carousel-item__img"
                src="${item.src}"
                alt="">
            <div class="carousel-item__details">
                <div class="carousel-item__icons">
                    <img src="./images/play-icon.png" alt="Play" class="carousel-item__icon">
                    <img src="https://img.icons8.com/ios/100/000000/plus--v1.png" class="carousel-item__icon" />
                </div>
            </div>

            <p class="carousel-item__details--text">
                ${item.name}
            </p>
            <p class="carousel-item__details--text">
               ${item.autor}
            </p>
        </div>
        </div>
        `
        }
    }

    playerButtonItem(){
        for (let i = 0; i < this.items.length; i++) {
            const items = this.items[i].childNodes
            for (let i = 0; i < items.length; i++) {
                items[i].addEventListener('click', ()=>{
                    player.reproducirCancion(contenidoItems[i])  
                })
            }
        }
    }    
}


new carousel()