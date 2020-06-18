import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import Spinner from "../../components/UI/Spinner/Spinner";

const UserProfile = (props) => {
  const [profile, setProfile] = useState(null);
  const [loaded, setLoaded] = useState();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    console.log("Uploaded imAGE Is : ", event.target.files[0]);
    setProfile(event.target.files[0]);
    setLoaded(0);
  };

//   const onnChangeHandler = (e) => {
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onloadend = function() {
//     setProfile(reader.result);
//     }
//     reader.readAsDataURL(file);
// };

  const onClickHandler = () => {
    const formData = new FormData();
    formData.append("image", profile);

    axios({
      method: "POST",
      url: "http://localhost:8080/ecommerce/image/",
      data: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setLoading(true);
        console.log("Profile image is : ", response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        console.log(error.response);
        setLoading(false);
      });
  };

  let profileImage = null;
  if (loading) {
    profileImage = <Spinner />;
  }

  if (!loading) {
    profileImage = (
      <form>
        <div>
          <label>Upload your profile image</label>
          <input type="file" name="file" onChange={onChangeHandler} />
        </div>
        <button type="button" onClick={onClickHandler}>
          Upload
        </button>
      </form>
    );
  }

  console.log("Profile is : ", profile);
  return <div>{profileImage}</div>;
};

export default UserProfile;
