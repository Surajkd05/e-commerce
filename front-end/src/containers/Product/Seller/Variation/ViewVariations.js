import React, { useEffect, useState } from "react"
import axios from "axios"
import VariationView from "./VariationView"

const ViewVariation = props => {

    const productId = props.history.location.state.id
    const productName = props.history.location.state.productName
    const description = props.history.location.state.description
    const brand = props.history.location.state.brand
    const [variations, setVariations] = useState()

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios
        .get("http://localhost:8080/ecommerce/seller/product/"+productId+"/variation", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }).then(response => {
            console.log(response.data)
            setVariations(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error.response.data.message)
            setLoading(false)
        })
    },[])

    let allVariations = null;

    if (!loading) {
      allVariations = variations.map((variation) => (
        <VariationView passedVariation ={variation} passedId ={productId} passedName = {productName} passedProps = {props} description = {description} brand = {brand}/>
      ));
    }
    return <div className="card-columns">{allVariations}</div>;
}

export default ViewVariation