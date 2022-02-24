export class Snake {
	/**
	 *
	 * @param {Number} canvasSize
	 * @param {Number} squareSize
	 * @param {Number} rows
	 */
	constructor(canvasSize, squareSize, rows) {
		const half = canvasSize / 2
		this._body = [
			{
				x: half,
				y: half
			},
			{
				x: half - squareSize,
				y: half
			},
			{
				x: half - squareSize * 2,
				y: half
			}
		]

		this.direction = 'RIGHT'
		this.squareSize = squareSize
		this.canvasSize = canvasSize
		this.rows = rows
		this.last = this._body[this._body.length - 1]
		this._ended = false
		this.lockDirection = false
	}

	/**
	 * @returns {Void}
	 */
	eat() {
		this._body.push(this.last)
	}

	/**
	 *
	 * @param {String} direction
	 * @returns {Void}
	 */
	changeDirection(direction) {
		direction = direction.toLocaleUpperCase()

		if (this.lockDirection) return

		if (direction === 'LEFT' && this.direction === 'RIGHT') return
		if (direction === 'RIGHT' && this.direction === 'LEFT') return
		if (direction === 'UP' && this.direction === 'DOWN') return
		if (direction === 'DOWN' && this.direction === 'UP') return
		this.direction = direction

		this.lockDirection = true
	}

	/**
	 * @returns {Void}
	 */
	updateBody() {
		let newBody = []
		this.last = this._body[this._body.length - 1]
		for (let i = this.getBody().length - 1; i > 0; i--) {
			let part = this.getBody()[i - 1]
			newBody.unshift(part)
		}
		let { x, y } = this.getBody()[0]
		if (this.direction === 'UP') {
			y -= this.squareSize
		} else if (this.direction === 'DOWN') {
			y += this.squareSize
		} else if (this.direction === 'LEFT') {
			x -= this.squareSize
		} else {
			x += this.squareSize
		}

		if (x < 0) {
			x = this.canvasSize - this.squareSize
		} else if (x >= this.canvasSize) {
			x = 0
		}

		if (y < 0) {
			y = this.canvasSize - this.squareSize
		} else if (y >= this.canvasSize) {
			y = 0
		}

		// Check if part of the body is already there.
		if (newBody.findIndex((part) => part.x === x && part.y === y) !== -1) {
			this._ended = true
		}

		newBody.unshift({ x, y })

		this._body = newBody

		this.lockDirection = false
	}

	/**
	 *
	 * @returns {Array} body
	 */
	getBody() {
		return this._body
	}

	/**
	 *
	 * @returns {Boolean}
	 */
	hasEnded() {
		return this._ended
	}
}
