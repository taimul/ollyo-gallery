import datas from "./data/data.json";
import ImageCard from "./components/ImageCard";
import { useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

function App() {
  const [data, setData] = useState(datas);
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeId, setActiveId] = useState(null);

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

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData((items) => {
        const preIndex = items.findIndex((item) => item.id === active.id);
        const nextIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, preIndex, nextIndex);
      });
    }
    setActiveId(null);
  };
  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <div className="bg-slate-200 h-full">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[450px] sm:w-[600px] lg:w-[800px] mx-4">
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
                  <h1 className="font-semibold">Gallery</h1>
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
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext items={data} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-6">
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
                  <div className="w-auto h-auto border"></div>
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
