import './style.css'
import p5 from 'p5'
import { Snake } from './snake'

/**
 *
 * @param {p5.p5InstanceExtensions} s
 */
const sketch = (s) => {
	const canvasSize = 600
	const rows = 20

	const squareSize = canvasSize / rows
	const snake = new Snake(canvasSize, squareSize, rows)

	let foodX = 0
	let foodY = 0

	const makeNewFood = () => {
		const parts = snake.getBody()
		const possibles = []

		for (let i = 1; i <= rows; i++) {
			const x = i * squareSize
			if (x >= canvasSize) {
				break
			}
			possibles.push(x)
		}
		let x = 0
		let y = 0
		do {
			x = possibles[Math.floor(Math.random() * possibles.length)]
			y = possibles[Math.floor(Math.random() * possibles.length)]
		} while (parts.findIndex((part) => part.x === x && part.y === y) !== -1)

		foodX = x
		foodY = y
	}

	s.setup = () => {
		s.createCanvas(canvasSize, canvasSize)
		s.textSize(32)
		s.frameRate(10)
		makeNewFood()
	}

	s.draw = () => {
		s.background(0)

		document.getElementById('points').innerText = snake.getBody().length - 3

		s.fill('red')
		s.square(foodX, foodY, squareSize)

		let parts = snake.getBody()

		parts.forEach(({ x, y }, index) => {
			if (index == 0) {
				s.fill('yellow')
			} else {
				s.fill('green')
			}
			s.square(x, y, squareSize)

			if (index !== 0) return

			if (foodX === x && foodY == y) {
				snake.eat()
				makeNewFood()
			}
		})

		snake.updateBody()

		if (snake.hasEnded()) {
			s.noLoop()
		}
	}

	s.keyPressed = () => {
		if (s.key === 'r') {
			window.location.reload()
		}
		if (snake.hasEnded()) return

		if (s.key === 'p') {
			s.noLoop()
			return
		}

		if (s.key === 'a') {
			s.loop()
			return
		}

		switch (s.key) {
			case 'ArrowDown':
				snake.changeDirection('DOWN')
				break
			case 'ArrowUp':
				snake.changeDirection('UP')
				break
			case 'ArrowLeft':
				snake.changeDirection('LEFT')
				break
			case 'ArrowRight':
				snake.changeDirection('RIGHT')
				break

			default:
				break
		}
	}
}

const sketchInstance = new p5(sketch, document.getElementById('app'))
