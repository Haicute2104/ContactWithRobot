import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
import './header.scss'
import { Badge } from "antd"
import SearchInput from "../../components/UI/search"
import CartBadge from "../../components/UI/CartBadge"

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "SẢN PHẨM", href: "product" },
    { name: "CÁCH MUA", href: "instruct" },
    { name: "VỀ QBBy", href: "introduce" },
  ];

  return (
    <>
      <nav className="header">
        <div className="header-container">
          {/* Mobile menu toggle */}
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <RxCross2 size={24} /> : <AiOutlineMenu size={24} />}
          </button>

          {/* Menu trái */}
          <div className="menu-left">
            {menuItems.map((item) => (
              <NavLink key={item.name} to={item.href} className="menu-link" end>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Logo */}
          <NavLink to="/" className="header-logo" end>
            <h1>QBBy</h1>
          </NavLink>

          {/* Menu phải */}
          <div className="menu-right">
            <SearchInput />
            <CartBadge/>
          </div>

          {/* Giỏ hàng mobile */}
          <div className="mobile-cart">
            <Link to="/cart">
              <AiOutlineShoppingCart size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-list">
            {menuItems.map((item) => (
              <NavLink key={item.name} to={item.href} className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)} end>
                {item.name}
              </NavLink>
            ))}
            <SearchInput />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;