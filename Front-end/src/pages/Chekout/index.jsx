import { Col, DatePicker, Empty, Form, Input, Row, Button, message, TimePicker, notification, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import MyEditor from "../../components/UI/tinyMce";
import { notificationSuccess } from "../../components/UI/notification";
import { checkoutProduct } from "../../components/services/CheckoutService";
import { useState } from "react";

function Checkout() {
  const location = useLocation();
  const selectedItems = location?.state?.selectedItems || [];
  const totalPrice = location?.state?.totalPrice || 0;

  const [api, contexHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    //xoay tròn đợi gửi dữ liệu.
    setSpinning(true);
    // Destructure các giá trị từ đối tượng `values`
    const { fullName, phone, address, email, note, date_delivery, time_received } = values;

    console.log("Dữ liệu đặt hàng:", values); // `values` đã chứa tất cả dữ liệu bạn cần
    console.log("Sản phẩm:", selectedItems);
    console.log("Tổng tiền:", totalPrice);

    const formData = {
      fullName: fullName,
      phone: phone,
      address: address,
      email: email,
      note: note,
      date_delivery: date_delivery?.format("YYYY-MM-DD"), // Format ngày
      time_received: time_received?.format("HH:mm:ss"), // Format thời gian
      products: selectedItems, // Đảm bảo selectedItems là một mảng các đối tượng sản phẩm phù hợp với schema backend
      totalPrice: totalPrice
    };


    const result = await checkoutProduct(formData);
    // Xử lý kết quả từ backend
    if(result){
      setSpinning(false)
      navigate('/pay', {
        state: {
          orderId: result.orderId,
          totalPrice: totalPrice
        }
      });

    }

    console.log("Kết quả checkout:", result);
    // notificationSuccess(api, "Đặt hàng thành công!");


  };

  const handleChangeDate = (value) => {
    console.log("Ngày giao:", value?.format("YYYY-MM-DD"));
  };

  const PickerWithType = ({ onChange, disabledHours }) => {
        return (
            <TimePicker
                onChange={onChange}
                placeholder="Chọn thời gian"
                style={{ width: "50%" }}
                format="HH:mm" // Added format for clarity
                disabledHours={disabledHours} // Passed disabledHours prop
            />
        );
    };

    const disabledHours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            if (i < 6 || i > 21) {
                hours.push(i);
            }
        }
        return hours;
    };
    const disabledDate = (current) => {
        return current && current < dayjs().startOf('day');
    };



  return (
    <>
      {contexHolder}
      {totalPrice > 0 ? (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f5f5f5',
        }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              date_delivery: dayjs(),
            }}
            style={{
              width: '100%',
              maxWidth: 600,
              background: 'white',
              padding: 24,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                  data-aos="fade-up"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    {
                      pattern: /^(0|\+84)[1-9][0-9]{8}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                  data-aos="fade-up"
                >
                  <Input type="tel" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng nhập email" }]}
                  data-aos="fade-up"
                >
                  <Input type="email" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                  data-aos="fade-up"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Ngày giao hàng"
                  name="date_delivery"
                  rules={[{ required: true, message: "Vui lòng chọn ngày giao" }]}
                  data-aos="fade-up"
                >
                  <DatePicker
                    onChange={handleChangeDate}
                    disabledDate={disabledDate}
                    placeholder="Chọn ngày giao hàng"
                    style={{ width: "50%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Thời gian nhận"
                  name="time_received"
                  rules={[{ required: true, message: "Vui lòng nhập thời gian" }]}
                  data-aos="fade-up"
                >
                  <PickerWithType disabledHours={disabledHours} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Ghi chú và lời chúc"
                  name="note"
                  rules={[{ required: true, message: "Vui lòng nhập lời chúc" }]}
                  data-aos="fade-up"
                >
                  <MyEditor />
                </Form.Item>
              </Col>

              <Col span={24} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đặt hàng ({totalPrice.toLocaleString('vi-VN')} đ)
                  </Button>

                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Spin spinning={spinning} tip="Đang xử lý đơn hàng..." fullscreen />

        </div>
      ) : (
        <div
          style={{
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
          }}
        >
          <Empty description="Chưa có sản phẩm được chọn" />
        </div>
      )}
    </>
  );
}

export default Checkout;