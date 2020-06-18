import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

const ImageDownload = (props) => {
  const [image, setImage] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios({
    //     method: "GET",
    //     url: "http://localhost:8080/ecommerce/image/",
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    fetch("http://localhost:8080/ecommerce/image/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.blob())
      .then((image) => {
        let outside = URL.createObjectURL(image);
        setImage(outside);
        console.log()
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <img alt="Profile" src={image} />
    </div>
  );
};

export default ImageDownload;
