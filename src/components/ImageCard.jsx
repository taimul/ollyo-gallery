const ImageCard = ({ id, selected, image, index, handleSelection }) => {
  const toggleSelected = () => {
    handleSelection(!selected, id);
  };

  return (
    <div
      className={` relative group overflow-hidden ${
        index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
    >
      <img
        src={image}
        alt=""
        className={`border rounded-lg ${selected ? "opacity-50" : ""}`}
      />
      <input
        onChange={toggleSelected}
        type="checkbox"
        className="absolute top-3 left-3 z-20"
        checked={selected}
      />
      <div className="h-80 w-80 bg-gray-900 opacity-0 group-hover:opacity-50 absolute top-0"></div>
    </div>
  );
};

export default ImageCard;
