import { useEffect, useState } from "react";
import {
  changeStatus,
  deleteProduct,
  getProductList
} from "../../../components/services/ProductService";
import {
  Button,
  Divider,
  Image,
  Table,
  Tag,
  Space,
  notification,
  Card,
  Form,
  Select,
  Popconfirm
} from 'antd';
import { notificationSuccess } from "../../../components/UI/notification";
import './product.scss';
import { Link, useNavigate } from "react-router-dom";

function ProductAdmin() {
  const [products, setProduct] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [refresh, setRefresh] = useState(false); // ⬅️ trigger để cập nhật giao diện
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getProductList();
      setProduct(result.reverse());
    };

    const successNotification = sessionStorage.getItem("productCreateSuccess");
    if (successNotification) {
      setRefresh(prev => !prev); 
      notificationSuccess(api, successNotification);
      sessionStorage.removeItem('productCreateSuccess');
    }

    fetchApi();
  }, [refresh]); // ⬅️ chạy lại khi refresh thay đổi

  const columns = [
    {
      title: 'STT',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      render: text => {
        if (Array.isArray(text) && text.length > 0) {
          return (
            <Image
              src={text[0]}
              alt="Product Image"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
          );
        }
        return (
          <img
            src="placeholder-image-url.jpg"
            alt="No Image"
            style={{ width: 100, height: 100 }}
          />
        );
      }
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
        <Button type="text" onClick={() => handleChangeStatus(record)}>
          <Tag color={text === "active" ? "green" : "red"}>{text}</Tag>
        </Button>
      ),
    },
    {
      title: "Hành động",
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleDetail(record)}>Chi tiết</Button>
          <Button 
            style={{ background: "#B89706", color: "#ffffff" }}
            onClick={() => handleEdit(record)}
            >Sửa</Button>
          <Popconfirm
            title="Bạn muốn xóa bản ghi này???"
            onConfirm={() => handleDelete(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>Xóa</Button>
          </Popconfirm>
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
    const result = await changeStatus(newStatus, id);
    if (result.success) {
      notificationSuccess(api, result.message);
      setRefresh(prev => !prev); 
    }
  }

  const handleDetail = (product) => {
    navigate(`/admin/product/${product._id}`);
  }

  const handleDelete = async (values) => {
    const id = values._id;
    const result = await deleteProduct(id);
    if (result.success) {
      notificationSuccess(api, result.message);
      setRefresh(prev => !prev); 
    }
  }

  const cancel = () => {
    // Không cần xử lý gì nếu hủy xác nhận
  }

  const handleEdit = (values) => {
    navigate(`/admin/product/edit/${values._id}`);
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
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}

export default ProductAdmin;
