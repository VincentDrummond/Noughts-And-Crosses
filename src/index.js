import { render } from "@testing-library/react";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./index.css";


	function Cell(props) {
//functional component because there is no state to manage
	return <button onClick={props.onClick}>
				{props.value}
			</button>;
	}

	function Grid(props) {
		return (
			<div className="game-grid">
					{props.cells.map((cell, index) => {
						return <Cell value={cell} onClick={() => props.onClick(index)} />;
					})}
			</div>
			);
	}

	class Game extends Component {
		static X = "X";
		static O = "O";
// static attaches these values to the CLASS OBJECT not the INSTANCE of the class
// they do not change each instance


		constructor(props) {
			super(props);

			this.state = {
				cells: new Array(9).fill(null),
				turn: Game.X
			};
		}

	render() {
		return (
			<>
				<Grid cells={this.state.cells} onClick={index => this.clickHandler(index)} />
					<div className="gameState">
						<div>
							Current player is <span className="boldText">{ this.state.turn }</span>
						</div>

						<div>
							The game is over.
						</div>

						<div>
							The winner was player <span className="boldText">{this.isWon()}</span>
						</div>
					</div>

			</>
		);
	}

	clickHandler(index) {
		const squares = this.state.cells.slice();
// slice copies the arry into a new array with a name squares

		if (squares[index] || this.isWon())
			return;

		squares[index] = this.state.turn === Game.X ? Game.X : Game.O;
		this.setState({
			turn: this.state.turn === Game.X ? Game.O : Game.X,
			cells: squares,

		});
	}

	isWon() {
		const winLines = [
//horizontal win lines
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
//vertical win lines
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
//diagonal win lines
			[0, 4, 8],
			[2, 4, 6],
		];

		const cells = this.state.cells.slice();

		for (const [a, b, c] of winLines) {
			if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c])
			return cells[a];
		}
		return null;
	}
}

ReactDOM.render(
	<Game />,
	document.getElementById("root")
	);
