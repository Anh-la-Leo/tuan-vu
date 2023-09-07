import React from "react";
import { HeaderLoai } from "./componentLoai/headerLoai";
import { MainLoai } from "./componentLoai/mainLoai";
function Loai() {
  return (
    <div className="AppUser">
      <HeaderLoai />
      <hr />
      <MainLoai />
    </div>
  );
}
export default Loai;
