import React from 'react'
import "./UploadProfile.css"
const 
UploadProfile = ({
    setHandleName,
    setHandleDatatype,
    setHandleData,
    setHandleDoc,
    handleDoc,
    handleName,
    handleDataType,
    handleAllowedTypes,
    handleinput,
    handleClass,
    profile,
}) => {

    const handleOnchange = (e) => {
        const file = e.target.files[0];
        setHandleDatatype(file.type);
        const allowedTypes = handleAllowedTypes;
        if (!allowedTypes.includes(file.type)) {
            setHandleDoc("");
            alert("Only PDF or JPEG files are allowed");
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setHandleDoc(URL.createObjectURL(file));
                const base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");
                console.log(base64String);
                setHandleData(base64String);
                setHandleName(file.name);
                alert("Added succesfully");
            };
        }
    };

    return (
        <div>
            <form
                className="form"
                // onClick={() => document.querySelector(handleinput).click()}
                onClick={() => {
                    const inputField = document.querySelector(handleinput);
                    if (inputField) {
                        inputField.click();
                    }
                }}

                onDragOver={(e) => {
                    e.preventDefault();
                    window.close();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    setHandleDatatype(file.type);
                    const allowedTypes = handleAllowedTypes;
                    if (!allowedTypes.includes(file.type)) {
                        setHandleDoc("");
                        alert("Only PDF or JPEG files are allowed");
                    } else {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                            setHandleDoc(URL.createObjectURL(file));
                            const base64String = reader.result
                                .replace("data:", "")
                                .replace(/^.+,/, "");
                            console.log(base64String);
                            setHandleData(base64String);
                            setHandleName(file.name);
                            window.close();
                            alert("Added succesfully");
                        };
                    }
                }}
            >
                {handleDoc ? (
                    handleDataType === "image/jpeg" ||
                        handleDataType === "image/jpg" ||
                        handleDataType === "image/png" ? (
                        <img src={handleDoc || profile} width={150} height={150} alt="" />
                    ) : (
                        <></>
                    )
                ) : (
                    <>
                        <div className="profile-img mt-5">
                            <p className="mb-2" role="button">
                                Click here to Upload Thumbnail
                            </p>
                            <i className="fa-solid fa-user-pen"></i>
                            <input
                                className={handleClass}
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleOnchange}
                            />
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}

export default UploadProfile