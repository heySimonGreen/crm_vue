const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.username,
  adminid: state => state.adminid,
  url: state => state.url,
  uuid: state => state.uuid
}
export default getters
