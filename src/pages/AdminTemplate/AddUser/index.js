import React, { useState } from "react";
import { actAddUser } from "./duck/actions";
import { useDispatch } from "react-redux";

export default function AddUser() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(actAddUser(state));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h3>Add User</h3>
          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label>Tài khoản</label>
              <input
                type="text"
                className="form-control"
                name="taiKhoan"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="text"
                className="form-control"
                name="matKhau"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label>SDT</label>
              <input
                type="number"
                className="form-control"
                name="soDt"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label>Ma Loai nguoi dung</label>
              <select
                className="form-control"
                name="maLoaiNguoiDung"
                onChange={handleOnchange}
              >
                <option value="KhachHang">Khach Hang</option>
                <option value="QuanTri">Quan Tri</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ho ten</label>
              <input
                type="text"
                className="form-control"
                name="hoTen"
                onChange={handleOnchange}
              />
            </div>
            <button className="btn btn-success">Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
}
