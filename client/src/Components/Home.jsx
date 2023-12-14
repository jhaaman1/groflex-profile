import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/App/Action";

const Home = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [rowData, setRowData] = useState([]);

  const dispatch = useDispatch();
  const { data, isLoding, isError } = useSelector((state) => state.app);

  const frameworkComponents = {
    imageRenderer: (params) => {
      console.log("base64 image: ", params);
      const base64Image = params?.data?.profilePicture?.docBase;
      // Check if base64Image is available before rendering the image
      if (base64Image) {
        return (
          <img
            src={`data:image/jpeg;base64, ${base64Image}`}
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
        );
      } else {
        return <div>No Image</div>; // or render a placeholder image or message
      }
    },
  };
  const handlePage = (page) => {
    setPage(page);
  };

  const handleTotalData = (data) => {
    setTotalData(data);
  };

  useEffect(() => {
    dispatch(getData(page)).then((data) => {
      if (data) {
        setRowData(data.SecondArray);
        setTotalPage(data.pageNumber);
        setTotalData(data.allIntroDataLength);
      }
    });
  }, [dispatch, page]);

  console.log("rowdata", rowData);
  const columnDefs = [
    {
      headerName: "Profile",
      field: "profileName",
      cellRenderer: frameworkComponents.imageRenderer,
    },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Email", field: "email" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Date of Birth", field: "dob" },
    { headerName: "Country", field: "country" },
    { headerName: "State", field: "state" },
    { headerName: "City", field: "city" },
    { headerName: "Zip", field: "zip" },
    { headerName: "Interests", field: "interest" },
  ];
  //   <img
  //   src={`data:image/jpeg;base64, ${song.image}`}
  //   alt={song.songName}
  //   className="thumbnail-image thumbnail"
  // />

  // function formatInterests(params) {
  //   return params.value.join(', ');
  // }

  // useEffect(() => {
  //   frameworkComponents.imageRenderer()
  // })
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout="autoHeight"
        loadingOverlay={isLoding}
        noRowsOverlay={isError ? "Error loading data" : "No data available"}
        frameworkComponents={frameworkComponents}
      />
      {rowData.length > 0 && (
        <Pagination
          handlePage={handlePage}
          page={page}
          totalPage={totalPage}
          totalData={totalData}
          perPagePagination={5}
        />
      )}
    </div>
  );
};

export default Home;
