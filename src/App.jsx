import datas from "./data/data.json";
import ImageCard from "./components/ImageCard";
import { useState } from "react";

function App() {
  const [data, setData] = useState(datas);
  const [selectedImages, setSelectedImages] = useState([]);

  console.log(selectedImages.length);

  const handleSelectionChange = (isSelected, imageURL) => {
    setSelectedImages((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, imageURL];
      } else {
        return prevSelected.filter((image) => image !== imageURL);
      }
    });
  };

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[600px]">
          <div>
            <div className="flex justify-between mx-5 py-3">
              <div>
                {selectedImages.length > 0 ? (
                  <h1>{selectedImages.length} File Selecter</h1>
                ) : (
                  <h1>Gallery</h1>
                )}
              </div>
              <h2>Delete Image</h2>
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
