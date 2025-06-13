import { AiOutlineCheck } from "react-icons/ai";

export const notificationSuccess = (api, desc) => {
  api.open({
    message: 'Thông báo',
    description:
      `${desc}`,
    showProgress: true,
    placement: 'topRight',
    icon: <AiOutlineCheck style={{ color:"green", borderRadius:"50%", border:"1px solid green" }}/>
  });
}
