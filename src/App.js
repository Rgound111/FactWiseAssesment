import React, { useState } from "react";
import CelebrityAccordion from "./components/CelebrityAccordion";
import jsonData from "./data.json"; 
import "./App.css";
import { IoIosSearch } from "react-icons/io";
import DeleteDialog from "./components/DeleteDialog"; 

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAccordion, setSelectedAccordion] = useState(null);
  const [celebrities, setCelebrities] = useState(jsonData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [celebrityToDelete, setCelebrityToDelete] = useState(null);

  const handleAccordionClick = (id) => {
    if (selectedAccordion === id) {
      setSelectedAccordion(null); 
    } else {
      setSelectedAccordion(id);
    }
  };

  const handleDeleteCelebrity = (id) => {
    setCelebrityToDelete(id);
    setIsDialogOpen(true); 
  };

  const confirmDelete = () => {
    const updatedCelebrities = celebrities.filter((celebrity) => celebrity.id !== celebrityToDelete);
    setCelebrities(updatedCelebrities);
    setSelectedAccordion(null); 
    setIsDialogOpen(false); 
  };

  const cancelDelete = () => {
    setIsDialogOpen(false); 
  };

  const handleSaveCelebrity = (updatedCelebrity) => {
    const updatedCelebrities = celebrities.map((celebrity) =>
      celebrity.id === updatedCelebrity.id ? updatedCelebrity : celebrity
    );
    setCelebrities(updatedCelebrities);
  };

  const filteredCelebrities = celebrities.filter((celebrity) =>
    celebrity.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
    celebrity.last.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <span className="SearchIcon"><IoIosSearch /></span>
      </div>
      
      <div className="accordion-container">
        {filteredCelebrities.map((celebrity) => (
          <CelebrityAccordion
            key={celebrity.id}
            celebrity={celebrity}
            isOpen={selectedAccordion === celebrity.id}
            onClick={() => handleAccordionClick(celebrity.id)} 
            onDelete={() => handleDeleteCelebrity(celebrity.id)}
            onSave={handleSaveCelebrity}
            isEditMode={selectedAccordion === celebrity.id} 
          />
        ))}
      </div>

      {isDialogOpen && (
        <DeleteDialog onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
};

export default App;
