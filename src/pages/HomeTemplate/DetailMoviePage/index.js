import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actFetchDetailMovie } from "./duck/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "components/Loader";

function DetailMoviePage(props) {
  const params = useParams();
  const loading = useSelector((state) => state.detailMovieReducer.loading);
  const data = useSelector((state) => state.detailMovieReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // props.fecthData(params.id);
    dispatch(actFetchDetailMovie(params.id));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h3>DetailMoviePage</h3>
      <table className="table">
        <tbody>
          <tr>
            <td>Tên Phim</td>
            <td>{data && data.tenPhim}</td>
          </tr>
          <tr>
            <td>Mô tả</td>
            <td>{data && data.moTa}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailMoviePage;

// const mapStateToProps = (state) => {
//   return {
//     loading: state.detailMovieReducer.loading,
//     data: state.detailMovieReducer.data,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fecthData: (id) => {
//       dispatch(actFetchDetailMovie(id));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DetailMoviePage);
