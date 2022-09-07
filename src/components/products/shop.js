import React,{useState,useEffect} from "react";
import axios from "axios"
import ItemCard from "../ui/card/itemcard";
import kid from "../../images/categoryimages/kidcategory.jpg"
import men from "../../images/categoryimages/mencategory.png"
import women from "../../images/categoryimages/womencategory.png"
import Cart from "./cart";
import kid1 from "../../images/itemsimages/trouser1.jpg"
import kid2 from "../../images/itemsimages/trouser2..jpg"
import men1 from "../../images/itemsimages/men1.jpg"
import men2 from "../../images/itemsimages/men3.jpg"
import PaginateItems from "../ui/pagination/pagination";
import women1 from "../../images/itemsimages/women1.jpg"
import "./shop.css"
import women2 from "../../images/itemsimages/women2.jpg"


const Shop = ()=>{
    const [currentPage,setCurrentPage]=useState(1);
    const [searchValue,setSearchValue]=useState("")
    const itemsPerPage=6;
    const endIndex=itemsPerPage*currentPage;
    const startIndex=endIndex-itemsPerPage;
    const [kidFilter,setKidFilter]=useState(false)
    const [menFilter,setMenFilter]=useState(false)
    const [womenFilter,setWomenFilter]=useState(false)
    const [searchFilter,setSearchFilter]=useState(false);
    const [menuText,setMenuText]=useState("All Items")
    const [itemData,setItemData]=useState([{
        title:"",
        price:"",
        description:"",
        stock:"",
        type:"",
        img:"",
        _id:""
      }])
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
  
    
      },[])
      var dataItems=itemData;
      if (kidFilter){
        
        dataItems=itemData;
        dataItems=dataItems.filter(x=>x.type==="kid")
       
        

      }
      if (menFilter){
        
        dataItems=itemData;
        dataItems=dataItems.filter(x=>x.type==="men")
        


      }
      if (womenFilter){
       
        dataItems=itemData;
        dataItems=dataItems.filter(x=>x.type==="women")
        

        
      }
      if (searchFilter){
        dataItems=itemData;
      }
      const kidfilterHandler=()=>{
        setMenuText("Kid Items")
      setKidFilter(true)     
      setMenFilter(false)
        setWomenFilter(false)  
     }

        const menfilterHandler=()=>{
            setMenuText("Men Items")
            setMenFilter(true)
            setKidFilter(false)     
        setWomenFilter(false)
            
        }
        const womenfilterHandler=()=>{
            setMenuText("Women Items")
          setWomenFilter(true)
          setMenFilter(false)
          setKidFilter(false)
        }
    const searchChangeHandler = (event)=>{
        // dataItems=itemData;
        // console.log("data item ha",dataItems)
        setSearchFilter(true)
           setSearchValue(event.target.value)
    }
    const item=dataItems.filter(val=>{
        if (searchValue===""){
            return val
        }
        else if(val.title.toLowerCase().includes(searchValue.toLowerCase())){
            return val
        }
    }).map((x,index)=>{
        return(
            <ItemCard 
            title={x.title}
            description={x.description}
            price={x.price}
            img={x.img}
            type={x.type}
            key={index}   
            id={x._id} 
            />

        )
    })
    var total__pets=dataItems.length;
    const pet__data=item.slice(startIndex,endIndex);
    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    
  

    return (<>
    <div className="shop__bgdiv">
    <div className="shop__maindiv">
        <div className="shop__leftshop">
            <div className="shop__categorysearchdiv">
                <h1>Choose Category</h1>
                <div className="Searchbar__shopdiv">
                   <input className="searchbar__shop" type="text" placeholder="Search here" onChange={searchChangeHandler}></input> 
                </div>
            </div>
          
            <div className="Category__div">
                <div className="percategory" onClick={kidfilterHandler} >
                    <img src={kid} /> 
                    <p>Kids</p>
                </div>
                <div className="percategory" onClick={menfilterHandler}>
                    <img src={men}/> 
                    <p>Men</p>
                </div>
                <div className="percategory" onClick={womenfilterHandler} >
                    <img src={women}/>
                    <p>Women</p>
                </div>
            </div>
            <h2 className="shop__categoryheading">{menuText}</h2>

           
            <div className="shop__items">
            {pet__data}
             </div>
             <div className="shop__paginationdiv"><PaginateItems itemsPerPage={itemsPerPage} paginate={paginate} total__items={total__pets} startIndex={startIndex}/ ></div>
        </div>
       
        <div className="shop__rightcart">
            <Cart/>
        </div>
    </div>
    </div>
    </>
    )
}
export default Shop;