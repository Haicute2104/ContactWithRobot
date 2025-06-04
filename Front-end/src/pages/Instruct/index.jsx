import { Steps } from "antd"
import './index.scss'
function Instruct(){
  const steps = [
  {
    title: 'Chọn sản phẩm',
    description: 'Chọn chiếc bánh và phụ kiện bạn thích vào giỏ hàng.',
    image: 'image/LF_Illustration_Pick.png',
  },
  {
    title: 'Lời chúc',
    description: 'Nhập lời chúc mà bạn muốn chúng tôi viết kèm với bánh.',
    image: 'image/LF_Illustration_Write.png',
  },
  {
    title: 'Thông tin',
    description: 'Điền đầy đủ thông tin giao hàng.',
    image: 'image/LF_Illustration_Fill_Out.png',
  },
  {
    title: 'Thanh toán',
    description: 'Hoàn tất thanh toán bằng phương pháp chuyển khoản nhanh 24/7.',
    image: 'image/LF_Thanh-toan_Illustration.png',
  },
  {
    title: 'Xác nhận',
    description: 'Đơn hàng của bạn sẽ được nhân viên của chúng tôi liên hệ qua điện thoại để xác nhận.',
    image: 'image/LF_Illustration_Call.png',
  },
  {
    title: 'Giao hàng',
    description: 'Đơn hàng của bạn sẽ được nhân viên giao đến bạn một cách chỉn chu nhất',
    image: 'image/LF_Illustration_Delivery.png',
  },
];
  return(
    <>
      <h2 style={{ textAlign:"center", padding: "50px" }} data-aos="fade-up">Hướng dẫn đặt hàng</h2>
      <div className="step-guide">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <div className={`step-content ${index % 2 === 0 ? 'left' : 'right'}`} data-aos="fade-up">
              <div className="step-image" data-aos="fade-up">
                <img src={step.image} alt={step.title} />
              </div>
              <div className="step-text" data-aos="fade-up">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
            <div className="step-number">{index + 1}</div>
          </div>
        ))}
      </div>
    </>
  )
}
export default Instruct