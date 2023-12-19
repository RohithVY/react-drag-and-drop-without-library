import { useState } from "react";
import "./App.css";
import PlainContainer from "./components/PlainContainer";

export type ContainerElement = {
  color: string;
  shape: string;
};

function App() {
  const [containerOneElements, setContainerOneElements] = useState<
    ContainerElement[]
  >([
    { color: "orange", shape: "box" },
    { color: "blue", shape: "circle" },
    { color: "green", shape: "rectangle" },
    { color: "pink", shape: "triangle" },
  ]);

  const [containerTwoElements, setContainerTwoElements] = useState<
    ContainerElement[]
  >([]);

  const handleDrop = (
    e: React.DragEvent,
    setElements: React.Dispatch<React.SetStateAction<ContainerElement[]>>,
    removeElement: React.Dispatch<React.SetStateAction<ContainerElement[]>>
  ) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const element =
      containerOneElements.find((el) => `${el.color}-${el.shape}` === id) ||
      containerTwoElements.find((el) => `${el.color}-${el.shape}` === id);
    if (element) {
      setElements((prev) => {
        // Check if the element already exists in the container
        if (!prev.find((el) => el === element)) {
          // If it doesn't exist, add it
          return [...prev, element];
        }
        // If it does exist, return the previous state
        return prev;
      });
      // Always remove the element from the original container
      removeElement((prev) => prev.filter((el) => el !== element));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <main>
      <div
        className="container__one"
        onDrop={(e) =>
          handleDrop(e, setContainerOneElements, setContainerTwoElements)
        }
        onDragOver={handleDragOver}
      >
        {containerOneElements.length > 0 &&
          containerOneElements.map((eachObj) => (
            <PlainContainer
              key={eachObj.color + eachObj.shape}
              color={eachObj.color}
              shape={eachObj.shape}
              containerOneElements={containerOneElements}
              containerTwoElements={containerTwoElements}
              removeElement={setContainerTwoElements}
            />
          ))}
        {/* <PlainContainer color="orange" shape="box" />
        <PlainContainer color="blue" shape="circle" />
        <PlainContainer color="green" shape="rectangle" /> */}
      </div>
      <div
        className="container__two"
        onDrop={(e) =>
          handleDrop(e, setContainerTwoElements, setContainerOneElements)
        }
        onDragOver={handleDragOver}
      >
        {containerTwoElements.length > 0 &&
          containerTwoElements.map((eachObj) => (
            <PlainContainer
              key={eachObj.color + eachObj.shape}
              color={eachObj.color}
              shape={eachObj.shape}
              containerOneElements={containerOneElements}
              containerTwoElements={containerTwoElements}
              removeElement={setContainerOneElements}
            />
          ))}
      </div>
    </main>
  );
}

export default App;
