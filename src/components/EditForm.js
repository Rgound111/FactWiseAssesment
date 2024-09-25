import React, { useState, useEffect } from "react";

const EditForm = ({ celebrity, setIsEditMode, onSave }) => {
  const [firstName, setFirstName] = useState(celebrity.first);
  const [lastName, setLastName] = useState(celebrity.last);
  const [gender, setGender] = useState(celebrity.gender);
  const [country, setCountry] = useState(celebrity.country);
  const [description, setDescription] = useState(celebrity.description);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    setIsSaveEnabled(
      firstName !== celebrity.first ||
      lastName !== celebrity.last ||
      gender !== celebrity.gender ||
      country !== celebrity.country ||
      description !== celebrity.description
    );
  }, [firstName, lastName, gender, country, description, celebrity]);

  const handleSave = () => {
    const updatedCelebrity = {
      id: celebrity.id,
      first: firstName,
      last: lastName,
      gender,
      country,
      description,
    };
    onSave(updatedCelebrity); 
    setIsEditMode(false); 
  };


  const handleCancel = () => {
    setFirstName(celebrity.first);
    setLastName(celebrity.last);
    setGender(celebrity.gender);
    setCountry(celebrity.country);
    setDescription(celebrity.description);
    setIsEditMode(false);
  };

  return (
    <div className="edit-form" onClick={(e) => e.stopPropagation()}>
      <div className="form-group">
        <div>
          <label htmlFor="firstName-one">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div >
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group-two">
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Rather not say">Rather not say</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group-three">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button
          onClick={handleSave}
          disabled={!isSaveEnabled}
          className={isSaveEnabled ? "enabled" : "disabled"}
        >
          Save
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;