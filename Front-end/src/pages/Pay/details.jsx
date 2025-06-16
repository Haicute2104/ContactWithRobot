import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailsCart } from "../../components/services/CartService";

function PayDetail() {
  const { id } = useParams();
  const [cartDetails, setCartDetails] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      const result = await getDetailsCart(id);
      setCartDetails(result);
    };
    fetchCart();
  }, [id]);

  return (
    <>
      <h1 style={{ textAlign: "center" }} data-aos="fade-up">
        Chi tiết đơn hàng
      </h1>

      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          padding: 24,
          border: "1px solid #ddd",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          className="info__detail"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 0",
          }}
          data-aos="fade-up"
        >
          <div className="info__detail--sender">
            <p><strong>Người gửi</strong></p>
            <p>Shop bánh QBBy</p>
            <p>SĐT: 0123456789</p>
          </div>
          <div className="info__detail--receiver">
            <p><strong>Người nhận</strong></p>
            <p>{cartDetails.fullName}</p>
            <p>SĐT: {cartDetails.phone}</p>
          </div>
        </div>

        <div className="info__order">
          <p><strong>Địa chỉ giao hàng:</strong></p>
          <p>{cartDetails.address}</p>

          <p><strong>Ngày giao:</strong></p>
          <p>{new Date(cartDetails.date_delivery).toLocaleDateString("vi-VN")}</p>

          <div
            className="info__order--name"
            style={{
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              padding: "10px 0",
            }}
          >
            <p><strong>Đơn hàng:</strong></p>
            {Array.isArray(cartDetails.products) && cartDetails.products.length > 0 ? (
              cartDetails.products.map((item, index) => (
                <div key={index} style={{ marginBottom: "10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p>{item.info?.name || "Không rõ"}</p>
                  <p>x{item.quantity}</p>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nào.</p>
            )}
          </div>

          <div className="info__order--price" style={{ marginTop: 20 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <strong>Tổng sản phẩm:</strong>
              <p> {cartDetails.totalPrice?.toLocaleString("vi-VN")} đ</p>

            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <p>Phí vận chuyển: </p>
              <span style={{ textAlign:"end" }}>Chưa tính</span>

            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <strong>Tổng thanh toán:</strong>
              <p> {cartDetails.totalPrice?.toLocaleString("vi-VN")} đ</p>

            </div>
          </div>
        </div>

        <div className="info__order--btn" style={{ marginTop: 20 }}>
          <Link to="/">
            <Button style={{ background: "green", color: "#fff", width: "100%" }}>
              Trở về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PayDetail;
