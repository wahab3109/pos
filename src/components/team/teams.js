import React,{useState,useEffect} from "react";
import "./team.css"
import axios from "axios"
import Table from 'react-bootstrap/Table';
import PaginateItems from "../ui/pagination/pagination";
import UpdateTeams from "./updateTeam";
import AddTeam from "./addteam";
const Team = ()=>{
  const [check,setCheck]=useState(false)
  const [searchValue,setSearchValue]=useState("")

  const [userData,setUserData]=useState([{
    _id:"",
    fname:"",
    lname:"",
    email:"",
    phone:"",
    role:""
  }])
  const [updatedUser,setUpdatedUser]=useState([{
    _id:"",
    fname:"",
    lname:"",
    email:"",
    phone:"",
    role:""
  }])
  const [updatedUserId,setUpdatedUserId]=useState();
    const [showItemStock,setShowItemStock]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);  
    const [showAddItemDiv,setShowAddItemDiv]=useState(false);
    const itemsPerPage=6;
    const endIndex=itemsPerPage*currentPage;
    const startIndex=endIndex-itemsPerPage;
  
    var total__items=15;
    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const addItemStock= (id)=>{
      setUpdatedUserId(id)
      setUpdatedUser(prevValue=>{
        return ({
          ...prevValue,
          _id:id
        })
      }
      )
      setShowItemStock(true)

    }
    const hideItemStock = ()=>{
        setShowItemStock(false);
    }
    const addItemHandler=()=>{
        setShowAddItemDiv(true)
    }
    const hideAddItemHandler=()=>{
        setShowAddItemDiv(false)
    }
    const searchChangeHandler=(e)=>{
      setSearchValue(e.target.value)
    }

    //fetching user data
    const fetchUserData = async()=>{
      const res = await axios.get("http://localhost:5000/api/viewAllUsers",{
        withCredentials:true
      }).catch(err=>{
        console.log(err)
      })
      const data = await res.data;
      return data;
    }

    useEffect(()=>{
      fetchUserData().then((data)=>{
        setUserData(data.users)
      })
     
   
    },[check])
    console.log("user da tis",userData)
    //delete user
    const deleteUserHandler=(id)=>{
      try{
      axios.delete("http://localhost:5000/api/deleteUser/" +id)
    setCheck(!check)}
      catch(err){
        console.log(err)
      }
    }
    return (<>
{ showAddItemDiv && <AddTeam onClose={hideAddItemHandler} check={check} setCheck={setCheck}/>
} 
    {showItemStock && <UpdateTeams onClose={hideItemStock} updatedUserId={updatedUserId} updatedUser={updatedUser} userData={userData} check={check} setCheck={setCheck} />} 
    <div className="Items__bgdiv">
        <div className="items__maindiv">
            <h1>Our Team members</h1>
            <div className="items__searchandbtndiv">
          <input type="text" placeholder="Search members by email" onChange={searchChangeHandler}></input>
          <button onClick={addItemHandler}>Add New member</button>
        </div>
            <Table responsive striped bordered hover>
      <thead>
        <tr>
        <th>Index</th>
          <th>F.Name</th>
          <th>L.Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>role</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      { userData.filter(val=>{
        if (searchValue===""){
            return val
        }
        else if(val.email.toLowerCase().includes(searchValue.toLowerCase()))
        {
            return val
        }
    }).map((x,index)=>{
        return (
          <tbody key={x._id}>
        <tr>
            <td>{index}</td>
          <td>{x.fname}</td>
          <td>{x.lname}</td>
          <td>{x.email}</td>
          <td>{x.phone}</td>
          <td>{x.role}</td>
          <td><button className="items__addstockbtn" onClick={()=>addItemStock(x._id)}> Update</button></td>
          <td><button onClick={()=>{deleteUserHandler(x._id)}}className="items__deltebutton"> Delete</button></td>

        </tr>
                </tbody>
        )
      })}
   
        </Table>
      

      
        </div>

    </div>
    </>)
}
export default Team;