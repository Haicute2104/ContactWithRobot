import { Button, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function SectionOne(){
    const slides = [
        {
            image: '/image/aC309ydWJ-7kSZ7y_LAFUONG_1.6_Cover_01.jpg',
            title: 'Món quà đặc biệt dành cho các bé',
            subtitle: 'BTS Colection',
        },
        {
            image: '/image/ZsrShEaF0TcGJYEZ_LF-webcover-02.jpg',
            title: 'Đơn giản không vì dịp gì',
            subtitle: 'Một nửa Entremet',
        },
        {
            image: '/image/aCVgJCdWJ-7kSIfN_LF_Website_cover_orchid.jpg',
            title: 'Món quà tuyệt vời cho người con gái bạn thương',
            subtitle: 'Mẫu bánh mới',
        },
        {
            image: '/image/659b70c2531ac2845a273377_L1000281.jpg',
            title: 'Chạm tới cảm xúc',
            subtitle: 'Cho mọi dịp đặc biệt',
        }
    ];



    // Gọi refresh AOS khi slide đổi
    const handleAfterChange = () => {
        AOS.refresh();
    };

    return(
        <div className="section__one">
            <Carousel autoplay afterChange={handleAfterChange}>
                {slides.map((item, index) => (
                    <div key={index}>
                        <div
                            className="slide"
                            style={{ backgroundImage: `url(${item.image})` }}
                        >
                            <div className="slide__content" data-aos="fade-up">
                                <p>{item.subtitle}</p>
                                <h1>{item.title}</h1>
                                <Link>
                                    <Button color="default" variant="outlined">
                                        Khám phá ngay
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default SectionOne;
