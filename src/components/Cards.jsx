import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useEffect, useRef, useState } from "react";

export default function Cards(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOption = Object.keys(options);
  const priceRef=useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let data = useCart();

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food);
    console.log(new Date());
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        return
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size});
        console.log("Size different so simply ADD one more to the list");
        return
      }
      return
    }
  
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
  };
  
  let finalPrice=qty* parseInt(options[size]);


  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  
  return (
    <Card className="m-1" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={props.foodItem.img}
        style={{ height: "150px", objectFit: "fill" }}
      />
      <Card.Body>
        <Card.Title>{props.foodItem.name}</Card.Title>
        <div>
          <select
            name="number"
            id="number"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 rounded"
            ref={priceRef }
            onChange={(e) => setSize(e.target.value)}

          >
            {priceOption.map((data) => {
              return <option key={data} value={data}>{data}</option>;
            })}
          </select>
          <div>Price:₹{finalPrice}/-</div>
        </div>
        <hr />
        <Button variant="primary" onClick={handleAddToCart}>
          Put in Bag
        </Button>
      </Card.Body>
    </Card>
  );
}
