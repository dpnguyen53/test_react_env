import React from "react";

export default function Nhanvien() {
  return (
    <>
      <div className="form-group">
        <label>MaNV</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>TenNv</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" />
      </div>
    </>
  );
}
