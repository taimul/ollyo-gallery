const ImageCard = ({ image, index }) => {
  return (
    <div
      className={` ${
        index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
    >
      <img src={image} alt="" className="border rounded-lg" />
    </div>
  );
};

export default ImageCard;
