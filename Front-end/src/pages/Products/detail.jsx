import { Button, Form, Image, InputNumber, Tag, notification, message } from "antd";
import { useState } from "react";
import './detail.scss';
import { useNavigate } from "react-router-dom";
import { notificationSuccess } from "../../components/UI/notification";
import { messageSuccess } from "../../components/UI/message";

function ProductDetail() {
  const images = [
    "image/aC3wcCdWJ-7kSZ5g_Beyond-Infinity-01.png",
    "image/aC3wcidWJ-7kSZ5j_Beyond-Infinity-02 (1).png",
    "image/aC3xSSdWJ-7kSZ6C_Beyond-Infinity-03 (1).png",
  ];

  const [loadings, setLoadings] = useState([]);

  // const [api, contextHolder] = notification.useNotification();

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate()

  const handleFinish = (values) => {
    // Bắt đầu loading
    setLoadings((prev) => {
      const newLoadings = [...prev];
      newLoadings[3] = true;
      return newLoadings;
    });

    // Delay 1.5s rồi xử lý dữ liệu
    setTimeout(() => {
      setLoadings((prev) => {
        const newLoadings = [...prev];
        newLoadings[3] = false;
        return newLoadings;
      });

      // Gửi dữ liệu ở đây
      console.log("Dữ liệu gửi đi:", values);
      messageSuccess(messageApi, "Thêm sản phẩm thành công")
    }, 1500);

  };

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Button onClick={handleBack} color="default">Trở về</Button>

      <div className="detail">
        {contextHolder}
        <div className="detail__block">
          <div className="detail__block--img">
            <div className="detail__block--main">
              <Image.PreviewGroup items={images}>
                <Image width={400} src={images[0]} data-aos="fade-up" />
              </Image.PreviewGroup>
            </div>
            <div className="detail__block--sp">
              <Image width={200} src={images[1]} data-aos="fade-up" />
              <Image width={200} src={images[2]} data-aos="fade-up"/>
            </div>
          </div>

          <div className="detail__block--content" data-aos="fade-up">
            <div className="detail__block--category">
              <p>Bánh sinh nhật</p>
            </div>

            <div className="detail__block--title">
              <h4>Beyond Infinity</h4>
            </div>

            <div className="detail__block--form">
              <Form onFinish={handleFinish}>
                <Form.Item name="quantity" initialValue={1}>
                  <InputNumber
                    min={1}
                    max={10}
                    changeOnWheel
                  />
                </Form.Item>
                <p>Giá: 880.000 đ</p>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadings[3]}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Form>
            </div>

            <div className="detail__block--sensation">
              <span>Mô tả: </span>
              <Tag color="green">Thanh mát</Tag>
              <Tag color="green">Ngọt dịu</Tag>
              <Tag color="green">Đậm đà</Tag>
            </div>
            <div className="detail__block--desc" >
              <p>Bộ sưu tập Pretty Little Baby – Bánh cho Em Bé Iu 🧸 LaFuong tạo nên Beyond Infinity như là một món quà đầu đời Ba Mẹ cùng bé lưu lại khoảnh khắc mà con bắt đầu tưởng tượng và mơ mộng về thế giới riêng của mình. Dành cho những cậu bé muốn làm phi hành gia bay đến tận cùng dải ngân hà 👨🏼‍🚀 ☁️

                Với vị bánh cũng hoàn toàn mới được LaFuong nghiên cứu đặc biệt để khiến cho các bé cực hào hứng: Kem mousse vani Madagascar nguyên chất, kết hợp với lớp kem ngậy sô-cô-la và bạt bánh sô-cô-la xốp mềm.</p>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default ProductDetail;
