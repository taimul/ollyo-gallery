const ImageCard = ({ id, selected, image, index, handleSelection }) => {
  const toggleSelected = () => {
    handleSelection(!selected, id);
  };

  return (
    <div
      className={` relative group ${
        index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt=""
          className={`border-2  ${selected ? "opacity-50" : ""}`}
        />
        <div className="h-80 w-80 bg-gray-900 opacity-0 group-hover:opacity-50 absolute top-0 "></div>
      </div>
      <input
        onChange={toggleSelected}
        type="checkbox"
        className={`absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 ${
          selected ? "opacity-100" : ""
        }`}
        checked={selected}
      />
    </div>
  );
};

export default ImageCard;
