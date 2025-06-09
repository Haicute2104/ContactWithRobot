import { Input } from "antd";
import { useNavigate } from "react-router-dom"; 

const { Search } = Input;

function SearchInput({ placeholder = "Nhập từ khóa...", width = 200 }) { // Removed onSearch prop if you want to handle navigation internally
  const navigate = useNavigate(); 

  const handleSearch = (value) => {
    if (value) {
      navigate(`/product?query=${encodeURIComponent(value)}`);
    } else {
      navigate('/product');
    }
  };

  return (
    <Search
      placeholder={placeholder}
      onSearch={handleSearch} 
      style={{ width, border: "none" }}
      allowClear
    />
  );
}

export default SearchInput;