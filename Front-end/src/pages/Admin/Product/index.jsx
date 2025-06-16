import { useEffect, useState } from "react";
import {
  changeMultiAction,
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
  const [refresh, setRefresh] = useState(false);
  const [selectedRowProduct, setSelectRowProduct] = useState([]);
  const [sort, setSort] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchApi = async () => {

      const result = await getProductList(sort); // ✅ truyền sort
      if (sort === 'default') {
        setProduct([...result].reverse());
      } else {
        setProduct(result);
      }
    };

    const createMsg = sessionStorage.getItem("productCreateSuccess");
    const deleteMsg = sessionStorage.getItem("productDeleteSuccess");

    if (createMsg || deleteMsg) {
      setRefresh(prev => !prev);
      notificationSuccess(api, createMsg || deleteMsg);
      sessionStorage.removeItem('productCreateSuccess');
      sessionStorage.removeItem('productDeleteSuccess');
    }

    fetchApi();
  }, [refresh, sort]);

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
    selectedRowKeys: selectedRowProduct,
    onChange: (selectedRowKeys) => {
      setSelectRowProduct(selectedRowKeys);
    },
  };

  const handleChangeStatus = async (product) => {
    const id = product._id;
    const newStatus = product.status === "active" ? "inactive" : "active";
    const result = await changeStatus(newStatus, id);
    if (result.success) {
      notificationSuccess(api, result.message);
      setRefresh(prev => !prev);
    }
  };

  const handleDetail = (product) => {
    navigate(`/admin/product/${product._id}`);
  };

  const handleDelete = async (values) => {
    const id = values._id;
    const result = await deleteProduct(id);
    if (result.success) {
      notificationSuccess(api, result.message);
      setRefresh(prev => !prev);
    }
  };

  const cancel = () => { };

  const handleEdit = (values) => {
    navigate(`/admin/product/edit/${values._id}`);
  };

  const handleAction = async (values) => {
    const data = {
      ids: selectedRowProduct,
      action: values.action
    };
    const result = await changeMultiAction(data);
    if (result.success) {
      notificationSuccess(api, result.message);
      setRefresh(prev => !prev);
      setSelectRowProduct([]);
    }
  };

  const handleChangeArrange = (value) => {
    setSort(value);
    console.log(products);
  };

  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      {contextHolder}
      <Card title="Danh sách">
        <div className="card__menu">
          <Link to='create'>
            <Button type="primary">+ Thêm mới</Button>
          </Link>
          <Form onFinish={handleAction} style={{ display:"flex" }}>
            <Form.Item
              name="action"
              initialValue=""
              rules={[{ required: true, message: 'Vui lòng chọn hành động!' }]}
            >
              <Select
                style={{ width: 160, marginRight:20 }}
                options={[
                  { value: "", label: "--Chọn hành động", disabled: true },
                  { value: "active", label: "Hoạt động" },
                  { value: "inactive", label: "Dừng hoạt động" },
                  { value: "delete-all", label: "Xóa tất cả" },
                ]}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">Áp dụng</Button>
          </Form>

          <Select
            style={{ width: 160 }}
            onChange={handleChangeArrange}
            allowClear
            defaultValue="default"
            options={[
              { value: 'default', label: 'Mặc định' },
              { value: 'price-desc', label: 'Giá từ lớn đến bé' },
              { value: 'price-asc', label: 'Giá từ bé đến lớn' },
              { value: 'title-asc', label: 'Tiêu đề A - Z' },
              { value: 'title-desc', label: 'Tiêu đề Z - A' },
            ]}
            placeholder="Chọn sắp xếp"
          />
        </div>
      </Card>
      <Divider />
      <Table
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        dataSource={products}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}

export default ProductAdmin;
