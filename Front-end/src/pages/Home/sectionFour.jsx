import { Button } from "antd";
import { Link } from "react-router-dom";

function SectionFour(){
    return(
        <>
           <div className="section__four">
                <div className="section__four--blog">
                    <div className="section__four--image" data-aos="fade-up">
                        <img src="/image/Zt6-hxoQrfVKl2Ch_LF_Illustration_Quizz (1).png" alt="quizz" />
                    </div>
                    <div className="section__four--content" data-aos="fade-up">
                        <div className="section__four--title">
                            <h4>Lạc lối?</h4>
                            <p>Cùng QBBy tìm vị bánh dành riêng cho bạn</p>
                        </div>
                        <div className="section__four--desc">
                            Xin chào, bạn có cần QBBy giúp bạn lựa chọn vị bánh không? Tại đây, QBBy có một hệ thống chăm sóc khách hàng chuyên giải đáp mọi thắc mắc giành cho bạn đó!!!
                        </div>
                        <div className="section__four--btn">
                            <Link>
                                <Button color="default" variant="outlined">
                                    Khám phá ngay
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
           </div>
        </>
    )
}
export default SectionFour;