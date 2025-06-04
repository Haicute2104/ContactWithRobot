import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
import './header.scss'
import { Badge } from "antd"

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { name: "SẢN PHẨM", href: "product" },
    { name: "CÁCH MUA", href: "instruct" },
    { name: "VỀ QBBy", href: "introduce" },
    { name: "HỎI ĐÁP", href: "question" },
    { name: "TIN MỚI", href: "news" },
  ]

  return (
    <>
      <nav className="header">
        <div className="header-container">
          {/* Nút menu mobile */}
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <RxCross2 size={24} /> : <AiOutlineMenu size={24} />}
          </button>

          {/* Menu trái (desktop) */}
          <div className="menu-left">
            {menuItems.slice(0, 3).map((item) => (
              <NavLink key={item.name} to={item.href} className="menu-link" end> {/* THÊM 'end' Ở ĐÂY */}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Logo */}
          <NavLink to="/" className="header-logo" end> {/* VÀ Ở ĐÂY, ĐẶC BIỆT VỚI "/" */}
            <h1>QBBy</h1>
          </NavLink>

          {/* Menu phải (desktop) */}
          <div className="menu-right">
            {menuItems.slice(3).map((item) => (
              <NavLink key={item.name} to={item.href} className="menu-link" end> {/* THÊM 'end' Ở ĐÂY */}
                {item.name}
              </NavLink>
            ))}
            <Badge count={2}>
              <Link to="/cart" className="cart-icon">
                <AiOutlineShoppingCart size={24} /> Giỏ hàng
              </Link>
            </Badge>
           
          </div>

          {/* Icon giỏ hàng mobile */}
          <div className="mobile-cart">
            <Link to="/cart">
              <AiOutlineShoppingCart size={20} />
            </Link>
          </div>
        </div>

        {/* Menu mobile */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-list">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
                end // THÊM 'end' Ở ĐÂY
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header