import { Card, Radio, Space, Button, notification, Empty } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCopy } from "react-icons/ai";
import { notificationSuccess } from "../../components/UI/notification";
import { deleteAll } from "../../actions/cart";
import { useDispatch } from "react-redux";

function Pay() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loadings, setLoadings] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const localtion = useLocation();

  const orderId = localtion.state?.orderId;
  const totalPrice = localtion.state?.totalPrice;

  console.log(orderId);

  const handleChange = (e) => {
    setSelectedMethod(e.target.value);
  };

   const content = () => {
    switch (selectedMethod) {
      case "mbbank":
        return (
          <div style={{ marginTop: 16 }}>
            <h3>Thanh toán qua MB Bank</h3>
            <p>Số tài khoản: 123456789</p>
            <p>Số tiền {totalPrice.toLocaleString('vi-VN')}đ</p>
            <p>Chủ tài khoản: Nguyễn Thị Quỳnh</p>
            <span>
              Nội dung thanh toán:
              <p>Thanh toán đơn hàng #{orderId}</p>
            </span>
          </div>
        );
      case "momo":
        return (
          <div style={{ marginTop: 16 }}>
            <h3>Thanh toán qua ví điện tử Momo</h3>
            <p>Số tài khoản: 123456789</p>
            <p>Số tiền {totalPrice.toLocaleString('vi-VN')}đ</p>
            <p>Chủ tài khoản: Nguyễn Thị Quỳnh</p>
            <span>
              Nội dung thanh toán:
              <p>Thanh toán đơn hàng #{orderId}</p>
            </span>
          </div>
        );
      case "visa":
        return (
          <div style={{ marginTop: 16 }}>
            <h3>Thanh toán quốc tế Visa Card</h3>
            <p>Số tài khoản: 12345678910111213</p>
            <p>Số tiền: {totalPrice.toLocaleString('vi-VN')}đ</p>
            <p>Chủ tài khoản: Trần Văn Hải</p>
            <span>
              Nội dung thanh toán:
              <p>Thanh toán đơn hàng #{orderId}</p>
            </span>
          </div>
        );
    
      default:
        break;
    }
  }

  const enterLoading = index => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      console.log("Thanh toán thành công");      
      dispatch(deleteAll());
      notificationSuccess(api, "Thanh toán thành công");
      setTimeout(() => {
      navigate(`/pay/${orderId}`);
    }, 3000);
      
    }, 3000);
  };

  return (
    <>
      {orderId ? (<div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        fontFamily: "sans-serif"
      }}
    >
      {contextHolder}
      <h2 style={{ textAlign: "center", marginBottom: 8 }}>QBBy</h2>
      <h3 style={{ textAlign: "center", marginBottom: 12 }}>Thanh toán</h3>
      <p style={{ textAlign: "center", color: "#666", fontSize: 14 }}>
        Xin vui lòng chuyển khoản thanh toán vào tài khoản sau và ấn nút hoàn tất đơn hàng.
        Cửa hàng QBBY sẽ gọi điện xác nhận đơn hàng của bạn trong thời gian sớm nhất.
      </p>

      <div style={{ marginTop: 24 }}>
        <Radio.Group onChange={handleChange} value={selectedMethod}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Radio value="mbbank" style={{ width: "100%" }}>
              <Space>
                <img
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-MB-Bank-MBB.png"
                  alt=""
                  width={40}
                />
                Ngân hàng MB bank (Ngân hàng quân đội)
              </Space>
            </Radio>
            <Radio value="momo" style={{ width: "100%" }}>
              <Space>
                <img
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                  alt=""
                  width={30}
                />
                Ví điện tử MoMo
              </Space>
            </Radio>
            <Radio value="visa" style={{ width: "100%" }}>
              <Space>
                <img
                  src="https://www.svgrepo.com/show/354518/visa.svg"
                  alt=""
                  width={40}
                />
                Visa Card
              </Space>
            </Radio>
          </Space>
        </Radio.Group>
      </div>

      <div style={{ borderTop:"1px solid #000" }}>
        {content()}
      </div>
      <Button loading={loadings[2]}
          onClick={() => enterLoading(2)} 
          iconPosition="end"
          style={{ background:"black", color:"#ffffff", width:"100%" }}>Hoàn tất đơn hàng</Button>
    </div>) : (
      <Empty/>
    )}
    </>
    
  );
}

export default Pay;
