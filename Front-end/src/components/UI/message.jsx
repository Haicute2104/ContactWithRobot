export const messageSuccess = (messageApi, text) => {
  messageApi.open({
    type: 'success',
    content: `${text}`,
  });
}
export const messageWarning = (messageApi, text) => {
  messageApi.open({
    type: 'warning',
    content: `${text}`,
  });
}
export const messageError = (messageApi, text) => {
  messageApi.open({
    type: 'error',
    content: `${text}`,
  });
}