import React, { useState, useEffect } from "react";
import axios from "axios";
export const HeaderLoai = () => {
  const [userData, setUserData] = useState([]);
  const renderData = localStorage.getItem("getDangNhap");
  useEffect(() => {
    if (renderData) {
      axios
        .get("https://wlp.howizbiz.com/api/me", {
          headers: {
            Authorization: `bearer ${renderData}`,
          },
        })
        .then((response) => {
          if (response.data.user) {
            setUserData(response.data.user);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [renderData]);
  return (
    <div className="tasbar">
      <div className="header_left">
        <i className="fa-solid fa-bars"></i>
        <img
          src="https://wlp.howizbiz.com/static/img/logo.png"
          height="40px"
          alt=""
        />
        <h2>
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
          BẢO VỆ
        </h2>
      </div>
      <div>
        <div id="photo" style={{ display: "flex" }}>
          {userData && (
            <div className="header_right" id={userData.id}>
              <button className="button_slot">
                {userData.name?.slice(0, 1)}
              </button>
              <br />
              <p
                typeof="button"
                className="rounded-circle"
                data-bs-toggle="modal"
              >
                <strong>{userData.name}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
