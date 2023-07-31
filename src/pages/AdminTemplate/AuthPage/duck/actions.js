import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_CLEAR_DATA,
} from "./constants";
import api from "utils/apiUtil";

//Giả sử BE trả thời gian ex về (60 * 60 * 1000)
const TIME_EXP = 60000;

export const actAuth = (user, navigate) => {
  return (dispatch) => {
    dispatch(actAuthRequest());

    api
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        if (result.data.statusCode === 200) {
          console.log(result.data);
          const user = result.data.content;

          if (!(user.maLoaiNguoiDung === "QuanTri")) {
            //show error
            const error = {
              response: {
                data: {
                  content: "Bạn không có quyền truy cập!",
                },
              },
            };
            return Promise.reject(error);
          }

          //thời gian hết phiên làm việc
          const date = new Date().getTime();
          const exp = date + TIME_EXP;
          localStorage.setItem("exp", exp);
          dispatch(actSetTimeoutLogout(navigate, TIME_EXP));

          //QuanTri => lưu thông tin user
          dispatch(actAuthSuccess(user));

          //QuanTri => lưu trang thái login
          localStorage.setItem("UserAdmin", JSON.stringify(user));

          //QuanTri => redirect admin/dashboard
          navigate("/admin/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actAuthFail(error));
      });
  };
};

const actLogout = (navigate) => {
  //remove localStorage
  localStorage.removeItem("UserAdmin");
  localStorage.removeItem("exp");

  //redirect to /auth
  navigate("/auth", { replace: true });

  //clear data reducer
  return {
    type: AUTH_CLEAR_DATA,
  };
};

//Trường hợp reload lại trang web
export const actTryLogin = (navigate) => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("UserAdmin"));
    if (!user) return;

    //Tính toán thời gian exp
    const exp = localStorage.getItem("exp");
    const date = new Date().getTime();

    if (date > exp) {
      //logout
      dispatch(actLogout(navigate));
      return;
    }

    //re set time exp
    dispatch(actSetTimeoutLogout(navigate, exp - date));
    dispatch(actAuthSuccess(user));
  };
};

const actSetTimeoutLogout = (navigate, exp) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actLogout(navigate));
    }, exp);
  };
};

const actAuthRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};

const actAuthFail = (error) => {
  return {
    type: AUTH_FAIL,
    payload: error,
  };
};
