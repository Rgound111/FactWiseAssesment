import React from "react";
import "./DeleteDialog.css";
import { IoCloseOutline } from "react-icons/io5";

const DeleteDialog = ({ onConfirm, onCancel }) => {
    return (
        <div className="delete-dialog-overlay">
            <div className="delete-dialog-box">
                <div className="delete-dialog-box-head">
                    <p>Are you sure you want to delete?</p>
                    <span onClick={onCancel}><IoCloseOutline /></span>
                </div>

                <div className="delete-dialog-actions">
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="delete-button" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
