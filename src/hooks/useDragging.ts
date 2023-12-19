import { useEffect, useState } from "react";
import { ContainerElement } from "../App";

// using mouse events : https://github.com/diveindev/dragme/blob/main/src/App.tsx
export default function useDragging(
  id: string,
  containerOneElements: ContainerElement[],
  containerTwoElements: ContainerElement[],
  removeElement: React.Dispatch<React.SetStateAction<ContainerElement[]>>
): void {
  const [isClicked, setIsClicked] = useState<Boolean>(false);
  const [initialCoordinates, setInitialCoordinates] = useState<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error(`Element with id: ${id} doesn't exist`);

    const container = target.parentElement;
    if (!container)
      throw new Error(`Element with id: ${id} doesn't have parent element`);

    const item =
      containerOneElements.find((el) => `${el.color}-${el.shape}` === id) ||
      containerTwoElements.find((el) => `${el.color}-${el.shape}` === id);

    const onDragStart = (e: DragEvent) => {
      e.dataTransfer?.setData("text/plain", id);
      setIsClicked(true);
      setInitialCoordinates({
        ...initialCoordinates,
        startX: e.clientX,
        startY: e.clientY,
      });
    };

    const onDragEnd = (e: DragEvent) => {
      setIsClicked(false);
      if (item) {
        removeElement((prev) => prev.filter((el) => el !== item));
      }
      if (
        e.clientX > container.offsetLeft &&
        e.clientX < container.offsetLeft + container.offsetWidth &&
        e.clientY > container.offsetTop &&
        e.clientY < container.offsetTop + container.offsetHeight
      ) {
        setInitialCoordinates({
          ...initialCoordinates,
          lastX: target.offsetLeft,
          lastY: target.offsetTop,
        });
      } else {
        target.style.top = `${initialCoordinates.lastY}px`;
        target.style.left = `${initialCoordinates.lastX}px`;
      }
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const onDrag = (e: DragEvent) => {
      if (!isClicked) return;

      const nextX =
        e.clientX - initialCoordinates.startX + initialCoordinates.lastX;
      const nextY =
        e.clientY - initialCoordinates.startY + initialCoordinates.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    };

    target.addEventListener("dragstart", onDragStart);
    target.addEventListener("dragend", onDragEnd);
    container.addEventListener("dragover", onDragOver);
    container.addEventListener("drag", onDrag);

    const cleanup = () => {
      target.removeEventListener("dragstart", onDragStart);
      target.removeEventListener("dragend", onDragEnd);
      container.removeEventListener("dragover", onDragOver);
      container.removeEventListener("drag", onDrag);
    };
    return cleanup;
  }, [isClicked, initialCoordinates, id]);
}
