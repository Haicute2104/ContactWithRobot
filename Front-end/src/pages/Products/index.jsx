import { Link } from 'react-router-dom';
import './index.scss'
import { Card, Col, Image, Row } from 'antd';
import { AiOutlineArrowRight } from "react-icons/ai";

function Products (){
  const products = [
    {
      title: "Bee In Bloom",
      ingredient: "Vải, Nhãn, Ngonnn",
      price: "880.000 đ",
      image: "image/Z7fzWZ7c43Q3gClG_The-Spring-Day-01.png",
    },
    {
      title: "Orient Scent",
      ingredient: "Vải, Nhãn, Ngonnn",
      price: "880.000 đ",
      image: "image/ZqZ8tx5LeNNTxi9h_OrientScent2.png",
    },
    {
      title: "A Little Grace",
      ingredient: "Vải, Nhãn, Ngonnn",
      price: "880.000 đ",
      image: "image/ZqcF9R5LeNNTxjJr_ALittleGrace2.png",
    },
  ];
  return(
    <>
      <div className="top-content" style={{ textAlign:"center", padding: "50px" }} data-aos="fade-up">
        <h2 >Bánh sinh nhật</h2>
        <p style={{ fontSize:"24px", fontWeight:"200" }}>Sản phẩm đặc trưng của QBBy là bánh sinh nhật  dòng bánh cao cấp của Pháp.<br/> Dành cho tiệc sinh nhật, hoặc bất kỳ khoảnh khắc nào quan trọng của bạn.</p>
      </div>

      <div className="product">
        <div className="product__list">
          <Link to="/detail">
            <Row gutter={[24, 32]} justify="center">
              {products.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    className='product--card'
                    hoverable
                    cover={
                      <Image
                        data-aos="fade-up"
                        alt={item.title}
                        src={item.image}
                        width="100%"
                        height="auto"
                        style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                        preview={false}
                      />
                    }
                  >
                    <div className="product--overplay">
                      <h3 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.title}</h3>
                      <p style={{ color: '#555' }}>{item.ingredient}</p>
                      <p style={{ fontWeight: 500 }}>{item.price}</p>
                    </div>
                    
                    <div className="product--icon">
                      Xem chi tiết <AiOutlineArrowRight/>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Link>
          
        </div>
      </div>
    </>
  )
}
export default Products;