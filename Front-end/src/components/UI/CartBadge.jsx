import { Badge } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartBadge() {
  // const [quantity, setQuantity] = useState(0);
  const cartItems = useSelector((state) => state.cart);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);



  return (
    <Badge count={itemCount}>
      <Link to="/cart" className="cart-icon">
        <AiOutlineShoppingCart size={24} /> Giỏ hàng
      </Link>
    </Badge>
  );
}
export default CartBadge