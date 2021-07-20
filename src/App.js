import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';


function App() {
  const [selected,setSelected] = useState([])
  const finalSpaceCharacters = [
    {
      id: 'pass',
      name: <input placeholder="password" className="ip"/>,
    },
    {
      id: 'phone',
      name: <input placeholder="phone number" className="ip" />,
    },
    
  ]
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  const handlePass =()=>{
    if(selected.includes("pass")){
      setSelected(selected.filter(v=>v!=="pass"))
    }else{
      setSelected([...selected,"pass"])
    }
  }

  const handlePhone =()=>{
    if(selected.includes("phone")){
      setSelected(selected.filter(v=>v!=="phone"))
    }else{
      setSelected([...selected,"phone"])
    }
  }
console.log(selected)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag {"&"} Drop</h1>

        <div className="flexed">
        <div className="checkbox" onClick={handlePass}>
        <input type="checkbox" id="pass" name="pass" value="password" checked={selected.includes("pass")} />
        <label for="vehicle1"> Password</label><br/>
        </div>
        <div className="checkbox" onClick={handlePhone}>
        <input type="checkbox" id="phone" name="phone" value="phone" checked={selected.includes("phone")} />
        <label for="vehicle1"> Contact </label><br/>
        </div>
        </div>

       {selected.length>0 && <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                          <p >
                            {selected.includes(id) && name }
                          </p>
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
      }
      </header>
      <p>
        Creator Club
      </p>
    </div>
  );
}

export default App;