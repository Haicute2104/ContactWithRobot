export const notificationSuccess = (api, desc) => {
  api.open({
    message: 'Thông báo',
    description:
      `${desc}`,
    showProgress: true,
    placement: 'top',
  });
}
