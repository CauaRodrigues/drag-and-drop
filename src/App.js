import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const finalSpaceCharacters = [
	{
		id: "gary",
		name: "Gary Goodspeed",
		thumb: "/drag-and-drop/images/gary.png",
	},
	{
		id: "cato",
		name: "Little Cato",
		thumb: "/drag-and-drop/images/cato.png",
	},
	{
		id: "kvn",
		name: "KVN",
		thumb: "/drag-and-drop/images/kvn.png",
	},
	{
		id: "mooncake",
		name: "Mooncake",
		thumb: "/drag-and-drop/images/mooncake.png",
	},
	{
		id: "quinn",
		name: "Quinn Ergon",
		thumb: "/drag-and-drop/images/quinn.png",
	},
];

function App() {
	const [characters, updateCharacters] = useState(finalSpaceCharacters);

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(characters);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateCharacters(items);
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>Final Space Characters</h1>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="characters">
						{(provided) => (
							<ul
								className="characters"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{characters.map(({ id, name, thumb }, index) => {
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{(provided) => (
												<li
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													<div className="characters-thumb">
														<img src={thumb} alt={`${name} Thumb`} />
													</div>
													<p>{name}</p>
												</li>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			</header>
			<p>
				Images from{" "}
				<a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
					Final Space Wiki
				</a>
			</p>
		</div>
	);
}

export default App;
