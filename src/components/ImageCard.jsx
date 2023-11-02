import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ImageCard = (props) => {
  const { id, selected, image, index, handleSelection } = props;

  const sortable = useSortable({ id });

  const { attributes, listeners, setNodeRef, transform, transition } = sortable;
  const style = {
    // transform: transform ? `translate(${transform.x}px, ${transform.y}px` : "",
    transform: CSS.Transform.toString(transform),

    transition,
  };

  const toggleSelected = () => {
    handleSelection(!selected, id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={` relative group z-30 overflow-auto ${
        index === 0 ? "col-span-2 row-span-2" : null
      }`}
    >
      <div {...listeners} className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt=""
          className={`border-2 ${selected ? "opacity-50" : ""}`}
        />
        <div
          className={`${
            selected
              ? ""
              : "h-80 w-80 bg-gray-900 opacity-0 group-hover:opacity-50 absolute top-0 "
          }`}
        ></div>
      </div>
      <input
        onChange={toggleSelected}
        type="checkbox"
        className={`absolute top-3 left-3  opacity-0 group-hover:opacity-100 ${
          selected ? "opacity-100" : ""
        }`}
        checked={selected}
      />
    </div>
  );
};

export default ImageCard;
