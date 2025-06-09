import { Button, Form, Image, InputNumber, Tag, notification, message, Card, Space, Row, Col } from "antd";
import { useEffect, useState } from "react";
import './detail.scss';
import { useNavigate, useParams } from "react-router-dom";
import { notificationSuccess } from "../../components/UI/notification";
import { messageSuccess } from "../../components/UI/message";
import { getDetailProductList } from "../../components/services/ProductService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cart";

function ProductDetail() {
  const params = useParams();

  const id = params.id;
  // console.log(id);

  const [productDetail, setProductDetail] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getDetailProductList(id);
      setProductDetail(result);
    };
    fetchApi();
  }, [])
  // console.log(productDetail)


  const [loadings, setLoadings] = useState([]);

  // const [api, contextHolder] = notification.useNotification();

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate()

  const handleAddToCart = (values) => {
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

      dispatch(addToCart(productDetail, values.quantity))

      messageSuccess(messageApi, "Thêm sản phẩm thành công")
    }, 1000);

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
              {productDetail.image && productDetail.image.length > 0 ? (
                <>
                  <div className="detail__block--main" >
                    <Image.PreviewGroup items={productDetail.image}>
                      <Image
                        width={400}
                        src={productDetail.image[0]}
                      />
                    </Image.PreviewGroup>
                  </div>
                  <div className="detail__block--sp">
                    {productDetail.image[1] && (
                      <Image width={200} src={productDetail.image[1]} />
                    )}
                    {productDetail.image[2] && (
                      <Image width={200} src={productDetail.image[2]} />
                    )}
                  </div>
                </>
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>

          <div className="detail__block--content" data-aos="fade-up">
            <div className="detail__block--category">
              <p>{productDetail?.category}</p>
            </div>

            <div className="detail__block--title">
              <h4>{productDetail?.name}</h4>
            </div>

            <div className="detail__block--form">
              <Form onFinish={handleAddToCart}>
                <Form.Item name="quantity" initialValue={1}>
                  <InputNumber
                    min={1}
                    max={10}
                    changeOnWheel
                  />
                </Form.Item>
                <p>Giá: {productDetail?.price?.toLocaleString('vi-VN')} đ</p>

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
              {productDetail.sensation && productDetail.sensation.length > 0 ? (
                productDetail.sensation.split(',').map((sensation, index) => (
                  <Tag color="green" key={index}>
                    {sensation.trim()}
                  </Tag>
                ))
              ) : (
                <p style={{ color: "#999" }}>Không có thông tin cảm nhận.</p>
              )}
            </div>
            <div className="detail__block--flavor">
              <span>Hương vị: </span>
              {productDetail.flavors && productDetail.flavors.length > 0 ? (
                productDetail.flavors.map((item, index) => (
                  <Tag key={index} color="pink">{item}</Tag>
                ))
              ) : (
                <span>Không có</span>
              )}
            </div>
            <div className="detail__block--desc" >
              <span>Mô tả bánh :           <span dangerouslySetInnerHTML={{ __html: productDetail.description }}>
              </span></span>
            </div>

          </div>

        </div>
        <Row gutter={[16, 16]} justify="space-between" style={{ height: "300px" }}>
          <Col xs={24} md={8}>
            <Card title="Dụng cụ đi kèm" style={{ height: "100%" }}>
              <p>Nến: {productDetail.accessories?.nen}</p>
              <p>Dao: {productDetail.accessories?.dao}</p>
              <p>Dĩa: {productDetail.accessories?.dia}</p>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Kích thước" style={{ height: "100%" }}>
              <p>Đường kính: {productDetail.size_cm} cm</p>
              <p>Dành cho: {productDetail.serving}</p>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Hướng dẫn sử dụng" style={{ height: "100%" }}>
              <p>Luôn giữ bánh trong hộp kín & bảo quản trong ngăn mát tủ lạnh</p>
              <p>Không nên để bánh ở nhiệt độ phòng quá 30 phút (Bánh sẽ bị chảy)</p>
              <p>Sử dụng trong vòng 03 ngày</p>
            </Card>
          </Col>
        </Row>

      </div>

    </>

  );
}

export default ProductDetail;
