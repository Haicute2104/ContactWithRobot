const Cart = require("../../model/cart.model");
const sendMail = require("../../helper/sendMail");

module.exports.index = async (req, res) => {
  // console.log(req.body.products);
  // console.log(req.body)
  const cart = new Cart({
    ...req.body,
    date_delivery: new Date(req.body.date_delivery),
    time_received: new Date(`2000-01-01T${req.body.time_received}`),
    timestamp: new Date(),

  });
  await cart.save();
  await sendMail({
    email: req.body.email,
    subject: "Cảm ơn bạn đã đặt hàng (^-^)",
    html: `
      <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8" />
          <title>Đặt bánh thành công - QBBy</title>
          <style>
           body {
              margin: 0;
              padding: 0;
              font-family: "Fraunces", serif;;
              background: url('https://i.pinimg.com/736x/55/a4/c8/55a4c8f1c97109510f3181dbd416168d.jpg') no-repeat center center;
              background-size: cover;
            }
            .overlay {
              background-color: rgba(255, 255, 255, 0.9);
              min-height: 100vh;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              background-color: #fff7ef;
              border: 2px solid #ffb3b3;
              border-radius: 10px;
              padding: 30px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .header {
              text-align: center;
              color: #d94f4f;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 14px;
              color: #888;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #ff6b6b;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="overplay">
            <div class="container">
              <h2 class="header">🎂 Đặt bánh thành công!</h2>
              <p>Xin chào <strong>${cart.fullName}</strong>,</p>
              <p>Cảm ơn bạn đã tin tưởng và đặt bánh tại <strong>tiệm bánh QBBy</strong> 💕.</p>
              <p>Chúng tôi đã nhận được đơn hàng của bạn và đang chuẩn bị chiếc bánh thật xinh xắn cho bạn đây!</p>

              <p><strong>Thông tin đơn hàng:</strong></p>
              <ul>
                <li>Mã đơn hàng: <strong>${cart._id}</strong></li>
                <li>Địa chỉ: <strong>${cart.address}</strong></li>
                <li>Ngày giao dự kiến: <strong>${cart.date_delivery.toLocaleDateString('vi-VN')}</strong></li>
                <li>Tổng cộng: <strong>${cart.totalPrice.toLocaleString('vi-VN')} VNĐ</strong></li>
              </ul>

              <a href=${`/order-status/${cart.email}/${cart._id}`} class="btn">Xem đơn hàng</a>

              <p>Chúc bạn có một ngày ngọt ngào như chiếc bánh bạn chọn 🍰!</p>

              <div class="footer">
                ❤️ Tiệm bánh QBBy <br />
                Địa chỉ: 123 Đường Bánh Ngọt, Quận 5, TP.HCM <br />
                Hotline: 0123 456 789 <br />
                Email: qbbakery@example.com
              </div>
            </div>
          </div>
          
        </body>
        </html>

    `
  })
  return res.status(200).json({
    success: true,
    message: "Tiến tới thanh toán",
    orderId: cart._id
  });

}