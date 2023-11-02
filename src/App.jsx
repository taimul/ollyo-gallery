import { useState } from "react";
import datas from "./data/data.json";
import ImageCard from "./components/ImageCard";

function App() {
  const [data, setData] = useState(datas);

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[600px]">
          <div>
            <div className="flex justify-between mx-5 py-3">
              <h2>Gallery</h2>
              <h2>Delete Image</h2>
            </div>
            <hr />
            <div className="grid grid-cols-5 gap-2 p-6">
              {data.map((imgData, index) => (
                <ImageCard
                  key={imgData.id}
                  image={imgData.image}
                  index={index}
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
