import { Form, Input, InputNumber, Select, Button, Upload, Row, Col, Checkbox, Space, notification, Radio } from 'antd'; // Import message cho thông báo
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import MyEditor from '../../../components/UI/tinyMce';
import { createProduct } from '../../../components/services/ProductService';
import { useState } from 'react';
import { notificationSuccess } from '../../../components/UI/notification';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function CreateProductAdmin() {
  const [imageUrls, setImageUrls] = useState([]);
  const [form] = Form.useForm(); // Thêm hook useForm để có thể reset form và hiển thị thông báo
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const fullData = {
        ...values,
        image: imageUrls, // Giờ đã có thể truy cập imageUrls từ state
      };
      // console.log('Received values of form: ', fullData); // Log fullData để kiểm tra
      const result = await createProduct(fullData); // Gửi fullData đi
      if(result.success){
        navigate(-1);
        sessionStorage.setItem("productCreateSuccess", result.message )
      }
      form.resetFields(); 
      setImageUrls([]); // Reset imageUrls sau khi gửi thành công
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      message.error('Có lỗi xảy ra khi thêm sản phẩm!');
    }
  };

  const handleChange = ({ fileList }) => {
    const urls = fileList
      .filter(file => file.status === 'done')
      .map(file => file.response?.urls && file.response.urls[0]) // Đảm bảo lấy đúng URL từ response.urls
      .filter(Boolean); // Lọc bỏ các giá trị null/undefined
    setImageUrls(urls);
  };
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Button onClick={handleBack}>Trở về</Button>
      <h1>Thêm mới sản phẩm</h1>
      <Form
        form={form} // Gắn form instance vào Form component
        name="add_product_form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          accessories: {
            dao: 0,
            dia: 0,
            nen: 0,
          },
          status: 'active',
          deleted: false,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select placeholder="Chọn danh mục">
                <Option value="Bánh Kem">Bánh Kem</Option>
                <Option value="Bánh sinh nhật">Bánh sinh nhật</Option>
                <Option value="Bánh Pháp">Bánh Pháp</Option>
                <Option value="Bánh Ngọt">Bánh ngọt</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
        >
          <MyEditor />
        </Form.Item>

        <Form.List name="flavors">
          {(fields, { add, remove }) => (
            <>
              <Form.Item label="Hương vị">
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[{ required: true, message: 'Vui lòng nhập hương vị!' }]}
                      style={{ flexGrow: 1 }}
                    >
                      <Input placeholder="Hương vị" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm hương vị
                  </Button>
                </Form.Item>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="size_cm"
              label="Kích thước (cm)"
              rules={[{ required: true, message: 'Vui lòng nhập kích thước!' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="serving"
              label="Số người phục vụ"
              rules={[{ required: true, message: 'Vui lòng nhập số người!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="price"
          label="Giá (VNĐ)"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
          rules={[{ required: true, message: 'Vui lòng chọn tối đa 3 ảnh!' }]}
        >
          <Upload
            name="image"
            action="http://localhost:3000/api/upload-image"
            listType="picture"
            multiple
            maxCount={3}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Phụ kiện">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={['accessories', 'dao']} label="Dao">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['accessories', 'dia']} label="Đĩa">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['accessories', 'nen']} label="Nến">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="sensation" label="Cảm nhận (mô tả ngắn)">
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          {/* <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select> */}
          <Radio.Group>
            <Radio value="active" defaultChecked={true}>Hoạt động</Radio>
            <Radio value="inactive">Dừng hoạt động</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="deleted" valuePropName="checked">
          <Checkbox>Đã xóa</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateProductAdmin;