import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";

const CelebrityAccordion = ({ celebrity, onDelete, onSave, isOpen, isEditMode, onClick }) => {
  const [isInternalEditMode, setIsInternalEditMode] = useState(false);
  const [age, setAge] = useState(null);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    return calculatedAge;
  };

  useEffect(() => {
    if (celebrity.dob) {
      const calculatedAge = calculateAge(celebrity.dob);
      setAge(calculatedAge);
    }
  }, [celebrity.dob]);

  useEffect(() => {
    if (!isOpen) {
      setIsInternalEditMode(false);
    }
  }, [isOpen]);

  const handleEdit = (e) => {
    e.stopPropagation(); 
    setIsInternalEditMode(true);
  };

  const handleSave = (updatedCelebrityData) => {
    const updatedCelebrity = {
      ...celebrity,
      ...updatedCelebrityData, 
    };

    onSave(updatedCelebrity);
    setIsInternalEditMode(false);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onClick}>
        <h3 className="toggle-icon">
          <span>
            <img
              src={celebrity.picture}
              style={{ borderRadius: "50%" }}
              alt="CelebrityProfile"
            />{" "}
            {celebrity.first} {celebrity.last}
          </span>
          <span>{isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}</span>
        </h3>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {isInternalEditMode ? (
            <EditForm
              celebrity={celebrity}
              setIsEditMode={setIsInternalEditMode}
              onSave={handleSave}
            />
          ) : (
            <div style={{ padding: "0px 30px" }}>
              <div className="Edit-container" style={{ marginBottom: "30px" }}>
                <p>Age: {age !== null ? age : "N/A"}</p>
                <p>Gender: {celebrity.gender}</p>
                <p>Country: {celebrity.country}</p>
              </div>
              <p>Description: {celebrity.description}</p>
              <div className="actions">
                {
                  age > 18 ? (
                    <button onClick={handleEdit}>
                      <VscEdit />
                    </button>
                  ) : (
                    <button style={{ textDecoration: "line-through" }}>Edit</button>
                  )
                }
                <button onClick={() => onDelete(celebrity.id)}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CelebrityAccordion;
