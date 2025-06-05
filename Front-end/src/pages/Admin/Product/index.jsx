import { useEffect, useState } from "react";
import { changeStatus, getDetailProductList, getProductList } from "../../../components/services/ProductService";
import { Button, Divider, Image, Table, Tag, Space, notification, Card, Form, Select } from 'antd';
import { notificationSuccess } from "../../../components/UI/notification";
import './product.scss'
import { Link, useNavigate } from "react-router-dom";
function ProductAdmin() {
  const [products, setProduct] = useState([]);

  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getProductList();
      setProduct(result);
    }
    fetchApi()
  }, []);

  // console.log(products)

  const navigate = useNavigate();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      render: text => <img src={text} alt="Product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text, record) => (
        text === "active" ? (
          <Button type="text" onClick={() => handleChangeStatus(record)}>
            <Tag color="green">{text}</Tag>
          </Button>
        ) : text === "inactive" ? (
          <Button type="text" onClick={() => handleChangeStatus(record)} >

            <Tag color="red">{text}</Tag>
          </Button>

        ) : (
          <Button type="text" onClick={() => handleChangeStatus(record)} >
            <Tag>{text}</Tag>
          </Button>
        )
      ),
    },
    {
      title: "Hành động",
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleDetail(record)}>Chi tiết</Button>
          <Button style={{ background: "#B89706", color: "#ffffff" }}>Sửa</Button>
          <Button type="primary" danger>Xóa</Button>
        </Space>
      )
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const selectionType = 'checkbox';

  const handleChangeStatus = async (product) => {
    const id = product._id;
    const newStatus = product.status === "active" ? "inactive" : "active";
    console.log(newStatus);
    console.log(id);
    const result = await changeStatus(newStatus, id);
    console.log(result)
    if (result.success) {
      notificationSuccess(api, result.message);
      setProduct(prevProducts =>
        prevProducts.map(p =>
          p._id === id ? { ...p, status: newStatus } : p
        )
      );
    }
  }

  const handleDetail = async (product) => {
    navigate(`/admin/product/${product._id}`)

  }

  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      {contextHolder}
      <Card title="Danh sách">
        <div className="card__menu">
          <Link to='create'>
            <Button type="primary">+ Thêm mới</Button>
          </Link>
          <Form>
            <Select
              defaultValue="--Chọn hành động"
              style={{ width: 160 }}
              options={[
                { value: "", label: "--Chọn hành động", disabled: true },
                { value: "active", label: "Hoạt động" },
                { value: "inactive", label: "Dừng hoạt động" },
                { value: "delete-all", label: "Xóa tất cả" },
              ]}
            />
            <Button type="submit">Áp dụng</Button>
          </Form>
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </div>

      </Card>
      <Divider />
      <Table
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={products}
        rowKey="_id" // đảm bảo nếu dữ liệu có id, dùng id làm khóa
      />
    </>
  );
}

export default ProductAdmin;
