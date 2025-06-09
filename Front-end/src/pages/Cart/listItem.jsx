import { Button, InputNumber, Table, Typography, Image, Popconfirm, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity, removeProductFromCart, updateQuantity } from "../../actions/cart";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListItem({ items }) {
  const { Text } = Typography;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [totalPrice, setToltalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  const handleQuantityChange = (value, info) => {
    console.log(info._id);
    dispatch(updateQuantity(info._id, value));
    const updatedSelectedItems = selectedItems.map(item => {
      if (item.info._id === info._id) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setSelectedItems(updatedSelectedItems);
  };



  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (text, record) => (
        <Image
          src={record.info.image?.[0]}
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text, record) => <p>{record.info.name}</p>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (text, record) => (
        <p>{record.info.price?.toLocaleString('vi-VN')} đ</p>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(value, record.info)}
          style={{ width: 80 }}
        />
      ),
    },
    {
      title: 'Tổng cộng',
      key: 'totalItem',
      width: 150,
      render: (text, record) => (
        <Text strong>
          {(record.info.price * record.quantity).toLocaleString('vi-VN')} đ
        </Text>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <Popconfirm title="Bạn có muốn xóa sản phẩm này không?" onConfirm={() => handleDelete(record)} onCancel={cancel} okText="Đồng ý" cancelText="Không">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </Popconfirm>

      ),
    },
  ];

  const handleDelete = (values) => {
    console.log("Xóa nè", values);
    dispatch(removeProductFromCart(values.info._id))
    setSelectedItems([]);
    setSelectedRowKeys([])
  }

  const cancel = () => {

  }

  // console.log(items);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedItems(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
  }

  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => sum + item.info.price * item.quantity, 0)
    setToltalPrice(total);
  }, [selectedItems])

  const handleAddress = () => {
    console.log("Nó chọn bánh này: ", selectedItems, "Với giá: ", totalPrice);
    navigate('/checkout', {
      state: {
        selectedItems: selectedItems,
        totalPrice: totalPrice
      }
    })
  };



  return (
    <>
      <Table
        columns={columns}
        dataSource={items}
        rowKey={(record) => record.info._id}
        pagination={false}
        rowSelection={rowSelection}

      />
      <Card title={`Tổng tiền: ${totalPrice.toLocaleString('vi-VN')} đ`}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {
            selectedItems.length > 0 ? (
              <Button
                type="primary"
                style={{ backgroundColor: 'green', borderColor: 'green' }}
                onClick={handleAddress}
              >
                Thanh toán
              </Button>
            ) : (
              <Button
                type="primary"
                style={{ backgroundColor: 'green', borderColor: 'green' }}
                disabled
              >
                Thanh toán
              </Button>
            )
          }
        </div>
      </Card>


    </>

  );
}

export default ListItem;
