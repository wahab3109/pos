import React,{useState,useEffect,useCallback} from "react";
import "./items.css"
import Table from 'react-bootstrap/Table';
import { useDispatch,useSelector } from "react-redux";
import AddStockModel from "./addstockmodel";
import axios from "axios";
import PaginateItems from "../ui/pagination/pagination";
import AddItems from "./addItem";
import { itemActions } from "../../store/item-slice";
const Items = ()=>{
    const [showItemStock,setShowItemStock]=useState(false);
    const [stockId,setStockId]=useState("")
    const [currentPage,setCurrentPage]=useState(1);  
    const [searchItem,setSearchItems]=useState("")
    const [showAddItemDiv,setShowAddItemDiv]=useState(false);
    const [check,setCheck]=useState(false)
    const [itemData,setItemData]=useState([{
      title:"",
      price:"",
      description:"",
      stock:"",
      img:"",
      type:"",
      _id:""
    }])
    const itemsPerPage=6;
    const endIndex=itemsPerPage*currentPage;
    const startIndex=endIndex-itemsPerPage;
    var total__items=15;
    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const updateStockhandler=(userid)=>{
      setShowItemStock(true);
     setStockId(userid)
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
    const seachChangeHandler =(e)=>{
      setSearchItems(e.target.value)
    }
    const getItemsData = async ()=>{
      const res = await axios.get("http://localhost:5000/api/getItems")
      .catch(err=>{
        console.log(err)
      })
      const data = await res.data
        return data;
    }   
    useEffect(()=>{
        getItemsData()
        .then((data)=>setItemData(data.item))

  
    },[check])


    // const deleteItemHandler= async (id)=>{
     

    // }

    return (<>
   { showAddItemDiv && <AddItems onClose={hideAddItemHandler} setCheck={setCheck} check={check} />}
    {showItemStock && <AddStockModel setCheck={setCheck} check={check} onClose={hideItemStock} data={stockId}/>}
    <div className="Items__bgdiv">
        <div className="items__maindiv">
            <h1>List of all the items in the store</h1>
        <div className="items__searchandbtndiv">
          <input type="text" placeholder="Search for items" onChange={seachChangeHandler}></input>
          <div className="addItembtndiv">
          <button onClick={addItemHandler}>Add Items</button>
          </div>
        </div>
            <Table responsive striped bordered hover >
      <thead>
        <tr >
        <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock Amount</th>
          <th>Update Stock</th>
          <th>Delte Item</th>
        </tr>
      </thead>

      { itemData.filter(val=>{
        if(searchItem ===""){
          return val
        } 
        else if(val.title.toLowerCase().includes(searchItem?.toLowerCase())){
            return val
        }
      }).map((x,index)=>{
        var base64String
        if(x.img){
         base64String = btoa(
          String.fromCharCode(...new Uint8Array(x.img.data.data))
        )}
        var stockClass=(x.stock<20)?"stock__column":"";
     return (

      <tbody key={x._id}>
        <tr>
            <td><img width={50}  src={`data:image/jpg;base64,${base64String}`} className="items__tableimg"></img></td>
          <td>{x.title}</td>
          <td>${x.price}</td>
          <td className={stockClass}>{x.stock}</td>
          <td><button className="items__addstockbtn" onClick={()=>{updateStockhandler(x._id)}}> Update Stock</button></td>
          <td><button className="items__deltebutton" onClick={async ()=>{
 try{
        console.log("id is ",x._id)
    const res= await axios.delete("http://localhost:5000/api/deleteItem/"+x._id)
    console.log("res is",res)
     setCheck(!check)}
     catch(err){
      console.log(err)
     }
          }}> Delete</button></td>

        </tr>
        </tbody>

       ) }
      )
      }

     
        </Table>
      

        {/* <div className="shop__paginationdiv"><PaginateItems itemsPerPage={itemsPerPage} paginate={paginate} total__items={total__items} startIndex={startIndex}/></div> */}
       
        <div className="items__additemsdiv">
        </div>
        </div>

    </div>
    </>)
}
export default Items;