import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getDetailProductList } from "../../../components/services/ProductService";
import { Button, Card, Form, Image, InputNumber, Popconfirm, Space, Tag } from "antd";
import './detail.scss'

function ProductDetailAdmin() {
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getDetailProductList(id)
      setProductDetail(result);
    }
    fetchApi();
  }, [id])

  // console.log(productDetail.accessories)
  const handleDelete = async () => {
    console.log("xóa cái này");
    const result = await deleteProduct(id);
    if(result.success){
      sessionStorage.setItem("productDeleteSuccess", result.message);
      navigate(-1);
    }

  }

  const cancel = () => {

  }


  const handleBack = () => {
    navigate(-1)
  }
  return (
    <>
      <Button onClick={handleBack} color="default">Trở về</Button>
      <h1>Trang chi tiết sản phẩm</h1>
      <div className="detail">
        <div className="detail__block">
          <div className="detail__block--img" data-aos="fade-up">
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

          <div className="detail__block--content" data-aos="fade-up">
            <div className="detail__block--category">
              <p>{productDetail.category}</p>
            </div>

            <div className="detail__block--title">
              <h4>{productDetail.name}</h4>
            </div>

            <div className="detail__block--form">
              <p>Giá: {productDetail.price?.toLocaleString('vi-VN')} đ</p>
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
            <div className="detail__block--accessorie">
              <Card title="Dụng cụ đi kèm">
                <p>Nến: {productDetail.accessories?.nen}</p>
                <p>Dao: {productDetail.accessories?.dao}</p>
                <p>Dĩa: {productDetail.accessories?.dia}</p>
              </Card>
            </div>
            <div className="detail__block--size">
              <p>Kích thước bánh: {productDetail.size_cm} cm</p>
            </div>
            <div className="detail__block--status">
              <p>Trạng thái: 
                {(productDetail.status === "active") ? (
                  <>
                    <Tag color="green"> Hoạt động</Tag>
                  </>
                ) : (
                  <>
                    <Tag color="red"> Dừng hoạt động</Tag>
                  </>
                )}
              </p>
            </div>
            <div>
              <Space>
                <Link to={`/admin/product/edit/${id}`}>
                  <Button style={{ background: "#B89706", color: "#ffffff" }}>Sửa</Button>
                </Link>
                <Popconfirm
                  title="Bạn muốn xóa bản ghi này???"
                  onConfirm={() => handleDelete()}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>Xóa</Button>
                </Popconfirm>
              </Space>
            </div>
            
          </div>
        </div>
      </div>
      <div className="detail__block--desc" >
        <p>
          Mô tả bánh: 
          <span dangerouslySetInnerHTML={{ __html: productDetail.description }}>
          </span>
        </p>      
      </div>
    </>
  )
}
export default ProductDetailAdmin;