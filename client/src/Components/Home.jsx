import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getData } from "../Redux/App/Action";

const Home = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [rowData, setRowData] = useState([]);

  const dispatch = useDispatch();
  const { data, isLoding, isError } = useSelector((state) => state.app);

  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handlePage = (page) => {
    setPage(page);
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
  
  const handleDelete = (id) => {
    console.log('Deleting item with ID:', id);
    dispatch(deleteData(id));
  };

    
    const frameworkComponents = {
      imageRenderer: (params) => {
        // console.log("base64 image: ", params);
        const base64Image = params?.data?.profilePicture?.docBase;
  
        if (base64Image) {
          return (
            <img
              src={`data:image/jpeg;base64, ${base64Image}`}
              alt="Profile"
              style={{ width: "50px", height: "50px" }}
            />
          );
        } 
      },
      // deleteButtonRenderer: deleteButtonRenderer,
    };

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
    {
      headerName: "Date of Birth",
      field: "dob",
      valueFormatter: (params) => formatDate(params.value),
    },
    { headerName: "Country", field: "country" },
    { headerName: "State", field: "state" },
    { headerName: "City", field: "city" },
    { headerName: "Zip", field: "zip" },
    { headerName: "Interests", field: "interest" },
    {
      headerName: "Delete",
      field: 'Delete',
      cellRendererFramework: (params) => (
        <button onClick={() => handleDelete(params?.data?.id)}>`Delete`</button>
      ),
    }
    
  ];

  return (
    <div className="ag-theme-alpine" style={{ width: "100%" }}>
      <h1 className="text-center">Registration Data</h1>
      <div className="m-3">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          domLayout="autoHeight"
          loadingOverlay={isLoding}
          noRowsOverlay={isError ? "Error loading data" : "No data available"}
          frameworkComponents={frameworkComponents}
        />
      </div>
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
