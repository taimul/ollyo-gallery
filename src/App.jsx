import datas from "./data/data.json";
import ImageCard from "./components/ImageCard";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

function App() {
  const [data, setData] = useState(datas);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectionChange = (isSelected, imageId) => {
    setSelectedImages((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, imageId];
      } else {
        return prevSelected.filter((image) => image !== imageId);
      }
    });
  };
  const handleUncheckAll = () => {
    setSelectedImages([]);
  };
  const handleDelete = () => {
    setData(data.filter((imgData) => !selectedImages.includes(imgData.id)));
    setSelectedImages([]);
  };

  // Handle drag and drop

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData((items) => {
        const preIndex = items.findIndex((item) => item.id === active.id);
        const nextIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, preIndex, nextIndex);
      });
    }
  };

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[800px]">
          <div>
            <div className="flex justify-between mx-5 py-3">
              <div>
                {selectedImages.length > 0 ? (
                  <h1 className="flex items-center font-bold">
                    <span className="mr-2">
                      <input
                        type="checkbox"
                        checked={selectedImages.length > 0}
                        onChange={handleUncheckAll}
                      />
                    </span>{" "}
                    <span className="mr-1">{selectedImages.length}</span>
                    Files Selected
                  </h1>
                ) : (
                  <h1>Gallery</h1>
                )}
              </div>
              {selectedImages.length > 0 && (
                <button
                  onClick={handleDelete}
                  className="text-red-600 font-bold text-xs"
                >
                  {selectedImages.length > 1 ? (
                    <span>Delete files</span>
                  ) : (
                    <span>Delete file</span>
                  )}
                </button>
              )}
            </div>
            <hr />

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={data} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-5 gap-2 p-6">
                  {data.map((imgData, index) => (
                    <ImageCard
                      key={imgData.id}
                      id={imgData.id}
                      image={imgData.image}
                      index={index}
                      handleSelection={handleSelectionChange}
                      selected={selectedImages.includes(imgData.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
