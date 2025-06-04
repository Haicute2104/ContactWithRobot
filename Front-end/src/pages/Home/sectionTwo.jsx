import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

function SectionTwo(){
    return(
        <>
            <div className="section__two">
                <div className="section__two--top-content">
                    <div className="section__two--title">
                        <h3>Mang tới trải nghiệm <br></br>
                            đặt bánh ngọt cao cấp trực tuyến
                        </h3>
                    </div>
                    <div className="section__two--desc">
                        <p>QQBy có mặt ở đây để mang tới cho bạn trải nghiệm thưởng thức bánh ngọt
                            hiện đại dành cho người Việt.
                        </p>
                    </div>
                    <div className="section__two--btn">
                        <Link to="/product">
                            <Button color='default' variant='solid' className=''>Khám phá ngay</Button>
                        </Link>
                    </div>
                </div>
                
                <div className="section__two--image">
                    <div className="section__two--list" data-aos="fade-left">
                        <div className="section__two--item">
                            <img src="/image/Z7fzWZ7c43Q3gClG_The-Spring-Day-01.png" alt="" width="400" height="400"/>
                            <div className="section__two--name">
                                <p>Lily's Valley</p>
                            </div>
                        </div>
                        <div className="section__two--item">
                            <img src="image/ZqcFKB5LeNNTxjJn_SecretGarden2.png" alt="" width="400" height="400"/>
                            <div className="section__two--name">
                                <p>Secret Garden</p>
                            </div>
                        </div>
                        <div className="section__two--item">
                            <img src="/image/aC3wcCdWJ-7kSZ5g_Beyond-Infinity-01.png" alt="" width="400" height="400"/>
                            <div className="section__two--name">
                                <p>Beyord Infinity</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default SectionTwo;