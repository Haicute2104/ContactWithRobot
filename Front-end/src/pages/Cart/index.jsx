import { useSelector } from "react-redux";
import ListItem from "./listItem";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";

function Cart(){
    const cartItem = useSelector((state) => state.cart);

    const navigate = useNavigate();

    // console.log(cartItem)

    const handleBack = () => {
        navigate(-1);
    }

    return(
        <>
            <h1>Giỏ hàng</h1>
            <div className="container">
                <Space>
                    <Button onClick={handleBack}>Trở về</Button>
                </Space>
                <ListItem items={cartItem}/>
            </div>
        </>
    )
}

export default Cart;