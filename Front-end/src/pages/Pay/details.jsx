import { Button } from "antd";
import { Link } from "react-router-dom";

function PayDetail(){
  return(
    <>
      <h1 style={{ textAlign:"center" }}>Chi tiết đơn hàng</h1>
      <div style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        fontFamily: "sans-serif"
      }}>
        <div className="info__detail" style={{ display:"flex", justifyContent:"space-between", padding:"20px" }}>
          <div className="info__detail--sender">
            <p>Người gửi</p>
            <p>Shop bánh QBBy</p>
            <p>SĐT: 0123456789</p>
          </div>
          <div className="info__detail--receiver">
            <p>Người nhận</p>
            <p>Nguyễn Trung Đức</p>
            <p>SĐT: 0123456789</p>
          </div>
        </div>
        <div className="info__order">
          <span>Địa chỉ giao hàng:</span>
          <p>Tầng 3 khách sạn ABC</p>
          <span>Ngày giao:</span>
          <p>Ngày 17/8/2025 vào 15h</p>
          <div className="info__order--name" style={{ borderTop: "1px solid #000",borderBottom: "1px solid #000" }}>
            <p>Bánh ngonn</p>
            <p>Bánh ngonn</p>
          </div>
          <div className="info__order--price">
            <p>Tổng sản phẩm: </p>
            <p>Phí vận chuyển: </p>
            <p>Tổng thanh toán:  </p>
          </div>
        </div>
        <div className="info__order--btn">
          <Link to={"/"}>
            <Button style={{ background:"green", color:"#fff", width:"100%" }}>Trở về trang chủ</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default PayDetail;