import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Button from '../../../components/UI/Button/Button';
import {connect} from 'react-redux';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import classes from "../../../components/Navigations/SideDrawer/SideDrawer.module.css";
import { withRouter } from 'react-router-dom';

const CustomerCategory =props=>{
    const[categories,setCategories]=useState([]);
    const [sidebar,setSidebar]=useState({display:"none"});
    const [backdrop,setBackdrop]=useState(false);
    const [latestId,setLatestId]=useState("");

    useEffect(()=>{
        axios
        .get("http://localhost:8080/ecommerce/customer/categories", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(response=>{
            console.log(response.data);
            
            setCategories(response.data)
        }).catch(error=>{
            console.log(error.response.data);
        });
    },[]);



    const onFetchCategories=()=>{

        axios
        .get("http://localhost:8080/ecommerce/customer/categories", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(response=>{
            console.log("my data",response.data.id);
            console.log(response.data);
            setLatestId(response.data.id)
            setCategories(response.data)
        }).catch(error=>{
            console.log(error.response.data);
        });
    }
    const sidebarClose=()=>{
        setSidebar({display:"none"});
        setBackdrop(false);
    }

    const sidebarOpen=()=>{
        setSidebar({
            backgroundColor:"#66DAC7",
            display:'inline',
            width:"300px",
            height:"1000px",
            marginTop:"22%",
        });
        setBackdrop(true);
        onFetchCategories();
    }


    const categoryHandler=(categoryId)=>{
        childCategoryHandler(categoryId);
    };

    
    const redirectHandler=()=>{
        props.history.replace('auth');
        sidebarClose();
        
    }
    const productViewHandler=(id)=>{
        console.log("categoryProduct "+id)
        props.history.push({
            pathname: "/productById",
            state: { id: id },
          });
        sidebarClose();
    }

    const childCategoryHandler=(latestId)=>{
        console.log("latestid",latestId)
        let query='';
        if(latestId){
            query=`?categoryId=${latestId}`;

        }setLatestId(latestId)
        console.log("child category lastest prev id", latestId)
        axios
        .get("http://localhost:8080/ecommerce/customer/categories"+query, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response)=>{
            console.log("child category ",response.data)
         
           console.log("child catgeory lastes id ",response.data.id)
            setCategories(response.data)
            

        })
        .catch((error)=>{
            console.log(error);
        });
    }


    let sidebarClass=["w3-sidebar w3-bar-block",classes.SideDrawer]
    console.log(categories.length)
    return(
        <div>
        <Backdrop show={backdrop} clicked={sidebarClose}/>
            <span className="w3-button w3-slarge" style={{border:"solid #225E62",backgroundColor:"#66DAC7", cursor:"pointer"}} onClick={sidebarOpen}>
                Categories
            </span>
            <div className={sidebarClass.join(' ')} style={{...sidebar,overflowY:"scroll"}}id="one">
            <Button btnType="Success" clicked={sidebarClose}>close</Button>


            {!props.isAuthenticated ? (
            <span className="btn btn-danger" onClick={redirectHandler}> Signin </span>) : 
            (<ul className="list-group">
            {categories.map((category)=>(
            <li key={category.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                    {category.categoryName}
                    <span onClick={()=>categoryHandler(category.id)}>

                        <i className="fa fa-angle-right"></i>

                    </span>

            </li>
            ))}
            </ul>
                )}
            {categories.length===0 && props.isAuthenticated ? (
                <span onClick={()=>productViewHandler(latestId)}>                    
                <i className="fa fa eye" aria-hidden="true" style={{cursor:"pointer"}}>View Product</i></span>
            ):null}

            {props.isAuthenticated && latestId && categories.length!==0?(
            <span  onClick={childCategoryHandler}>

                </span>
            ):null}
            </div>
     </div>
       
    )
};
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null,
        access_token:state.auth.token
    }
}
export default  withRouter(connect(mapStateToProps)(CustomerCategory));
