import { ContainerElement } from "../App";
import useDragging from "../hooks/useDragging";

type Props = {
  color: string;
  shape: string;
  removeElement: React.Dispatch<React.SetStateAction<ContainerElement[]>>;
  containerOneElements: ContainerElement[];
  containerTwoElements: ContainerElement[];
};

const PlainContainer = (props: Props) => {
  useDragging(
    `${props.color}-${props.shape}`,
    props.containerOneElements,
    props.containerTwoElements,
    props.removeElement
  );
  return (
    <div
      id={`${props.color}-${props.shape}`}
      className={`${props.shape}`}
      draggable
    />
  );
};

export default PlainContainer;
