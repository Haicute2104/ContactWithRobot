import { Button } from "antd";
import { GoArrowRight } from "react-icons/go";

function SectionThree(){
    return(
        <>
            <div className="section__three">
                <div className="section__three--list">
                    <div className="section__three--item" data-aos="fade-up">
                        <div className="section__three--image">
                            <img src="/image/banh-sinh-nhat.jpg" alt="" width="500" height="600" />
                        </div>
                        <div className="section__three--content">
                            <Button>
                                <div className="section__three--title">
                                    <h4>Bánh sinh nhât</h4>
                                    <p>Dành cho mọi độ tuổi</p>
                                </div>
                                <div className="section__three--icon">
                                    <GoArrowRight/>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className="section__three--item" data-aos="fade-up">
                        <div className="section__three--image">
                            <img src="/image/banh-nua-entremet.jpg" alt=""  width="500" height="600"/>
                        </div>
                        <div className="section__three--content">
                            <Button>
                                <div className="section__three--title">
                                    <h4>Bánh nửa Entremet</h4>
                                    <p>Dành cho mọi độ tuổi</p>
                                </div>
                                <div className="section__three--icon">
                                    <GoArrowRight/>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className="section__three--item" data-aos="fade-up">
                        <div className="section__three--image">
                            <img src="/image/phu-kien-banh.jpg" alt="" width="500" height="600"/>
                        </div>
                        <div className="section__three--content">
                            <Button>
                                <div className="section__three--title">
                                    <h4>Phụ kiện bánh</h4>
                                    <p>Dành cho mọi độ tuổi</p>
                                </div>
                                <div className="section__three--icon">
                                    <GoArrowRight/>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SectionThree;