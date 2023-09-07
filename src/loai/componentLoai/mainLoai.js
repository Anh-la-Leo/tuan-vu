import React from "react";
import { TableLoai } from "../MenuLoai/tableloai";
import { useNavigate } from "react-router-dom";
export const MainLoai = () => {
  const navigate = useNavigate();
  const handleAddNewClick = () => {
    navigate("/them-moi");
  };

  return (
    <div className="main_menu">
      <div className="avatar_loai">
        <button>
          <i className="fa-solid fa-paw" />
        </button>
        <h3>
          <strong>Loài nguy cấp quý hiếm</strong>
        </h3>
      </div>
      <button
        onClick={handleAddNewClick}
        style={{
          height: "36px",
          padding: "0 16px",
          backgroundColor: "#da2a1c",
          border: "none",
          color: "white",
        }}
      >
        <strong>+ Thêm mới</strong>
      </button>
      <TableLoai />
    </div>
  );
};
