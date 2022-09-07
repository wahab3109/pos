import Pagination from 'react-bootstrap/Pagination';
// import PageItem from 'react-bootstrap/PageItem';
import "./pagination.css"
const PaginateItems = (props)=>{
  let active = Math.floor(props.startIndex/props.itemsPerPage)+1;
let items = [];
for (let number = 1; number <=(Math.ceil((props.total__items)/props.itemsPerPage)); number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} onClick={()=>{props.paginate(number)}}>
      {number}
    </Pagination.Item>
  );
}
    return(<>
      <Pagination size="lg" className='cart__pagination'>{items}</Pagination>
    </>)
}
export default PaginateItems;

