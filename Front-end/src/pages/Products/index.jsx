import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import { Card, Col, Image, Row, Spin, Alert } from 'antd'; // Import Spin và Alert
import { AiOutlineArrowRight } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { getProductList } from '../../components/services/ProductService';
import { search } from '../../components/services/SearchService';

function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [error, setError] = useState(null);   // Thêm trạng thái error
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("query"); 

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true); 
      setError(null);   
      try {
        let result;
        if (keyword) {
          result = await search(keyword);
        } else {
          result = await getProductList();
          result = result.reverse(); 
        }
        setProducts(result);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại."); 
      } finally {
        setLoading(false); 
      }
    };
    fetchApi();
  }, [keyword]);

  const handleDetails = (values) => {
    navigate(`/product/${values._id}`);
  }

  // --- Render phần Loading, Error, No results ---
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "50px" }}>
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const titleText = keyword ? `Kết quả tìm kiếm cho: "${keyword}"` : "Tất cả sản phẩm";

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2 style={{ marginBottom: "20px" }}>{titleText}</h2>
        <Alert
          message="Không tìm thấy sản phẩm"
          description={keyword ? `Không có sản phẩm nào khớp với từ khóa "${keyword}". Vui lòng thử từ khóa khác.` : "Hiện tại không có sản phẩm nào để hiển thị."}
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <>
      <div className="top-content" style={{ textAlign: "center", padding: "50px" }} data-aos="fade-up">
        <h2>{titleText}</h2> {/* Hiển thị tiêu đề động */}
        
        {!keyword && ( // Chỉ hiển thị mô tả này khi không có tìm kiếm
            <p style={{ fontSize: "24px", fontWeight: "200" }}>
              Sản phẩm đặc trưng của QBBy là bánh sinh nhật dòng bánh cao cấp của Pháp.<br />
              Dành cho tiệc sinh nhật, hoặc bất kỳ khoảnh khắc nào quan trọng của bạn.
            </p>
        )}
      </div>

      <div className="product">
        <div className="product__list">
          <Row gutter={[24, 32]} justify="center">
            {products.filter(item => item.status === "active").map((item, index) => (
              
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  onClick={() => handleDetails(item)}
                  className='product--card'
                  hoverable
                  cover={
                    <Image
                      data-aos="fade-up"
                      alt={item.title}
                      src={item.image?.[0]} 
                      width="100%"
                      height="auto"
                      style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                      preview={false}
                    />
                  }
                >
                  <div className="product--overplay">
                    <h3>{item.name}</h3>
                    <p className="flavor">
                      {item.flavors?.map((flavor, idx) => ( 
                        <span key={idx}>{flavor}{idx < item.flavors.length - 1 ? ', ' : ''}</span>
                      ))}
                    </p>
                    <p className="price">{item.price?.toLocaleString('vi-VN')} đ</p> 
                  </div>
                    <div className="product--icon">
                      Xem chi tiết <AiOutlineArrowRight />
                    </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Products;