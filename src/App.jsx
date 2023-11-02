import datas from "./data/data.json";
import ImageCard from "./components/ImageCard";
import { useState } from "react";

function App() {
  const [data, setData] = useState(datas);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectionChange = (isSelected, imageURL) => {
    setSelectedImages((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, imageURL];
      } else {
        return prevSelected.filter((image) => image !== imageURL);
      }
    });
  };
  const handleDelete = () => {
    setData(data.filter((imgData) => !selectedImages.includes(imgData.image)));
    setSelectedImages([]);
  };

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[600px]">
          <div>
            <div className="flex justify-between mx-5 py-3">
              <div>
                {selectedImages.length > 0 ? (
                  <h1>{selectedImages.length} File Selected</h1>
                ) : (
                  <h1>Gallery</h1>
                )}
              </div>
              {selectedImages.length > 0 && (
                <button onClick={handleDelete}>
                  {selectedImages.length > 1 ? (
                    <span>Delete Files</span>
                  ) : (
                    <span>Delete File</span>
                  )}
                </button>
              )}
            </div>
            <hr />
            <div className="grid grid-cols-5 gap-2 p-6">
              {data.map((imgData, index) => (
                <ImageCard
                  key={imgData.id}
                  image={imgData.image}
                  index={index}
                  handleSelection={handleSelectionChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
