import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProductList, updateProduct } from "../../../components/services/ProductService";
import { Form, Input, InputNumber, Select, Button, Upload, Row, Col, Checkbox, Space, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import MyEditor from '../../../components/UI/tinyMce';
import { notificationSuccess } from "../../../components/UI/notification";

const { Option } = Select;

function EditProductAdmin() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [form] = Form.useForm();
  const [imgUrls, setImgUrls] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getDetailProductList(id);
        const formData = {
          ...result,
          image: result.image.map((url, index) => ({
            uid: url + index,
            name: `image-${index}.png`,
            status: 'done',
            url: url,
            response: { urls: [url] }
          })),
          flavors: result.flavors || [],
          accessories: result.accessories || { dao: 0, dia: 0, nen: 0 }
        };
        form.setFieldsValue(formData);
        setImgUrls(result.image);
      } catch (error) {
        notification.error({
          message: 'Lỗi khi tải sản phẩm!',
          description: error.message || 'Không thể tải dữ liệu sản phẩm.'
        });
      }
    };
    fetchApi();
  }, [form, id]);

  const handleChange = ({ fileList }) => {
    const urls = fileList
      .filter(file => file.status === 'done')
      .map(file => file.response?.urls && file.response.urls[0])
      .filter(Boolean);
    setImgUrls(urls);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const onFinish = async (values) => {
    const data = {
      ...values,
      image: imgUrls
    };

    console.log(data);
    const result = await updateProduct(id, data);
    if(result.success){
      notificationSuccess(api, result.message)
    }
  };

  return (
    <>
      <Button onClick={handleBack}>Trở về</Button>
      <h1>Chỉnh sửa sản phẩm</h1>
      {contextHolder}
      <Form
        form={form}
        name="edit_product_form"
        onFinish={onFinish}
        layout="vertical"
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
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item name="deleted" valuePropName="checked">
          <Checkbox>Đã xóa</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default EditProductAdmin;
