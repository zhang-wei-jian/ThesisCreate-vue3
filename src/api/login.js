import myAxios from '../utils/myAxios'



// login
export const reqLogin = ({ username, password }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  return myAxios.post('/api/login', formData)
}
// login
export const reqSign = ({ username, password,code }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('code', code);

  return myAxios.post('/api/register', formData)
}


// qiandao
export const checkCome = () => {


  return myAxios.get('/api/check_come')
}

// getQiandao
export const reqGetDay = () => {


  return myAxios.get('/api/get_days')
}


// 修改密码
export const setUserPassword = ({ pw }) => {
  const formData = new FormData();
  formData.append('pw', pw);
  return myAxios.post('/api/user_set_pw', formData)
}

// 卡密充值
// /api/card_charge
export const setYue = ({ card_str }) => {
  const formData = new FormData();
  formData.append('card_str', card_str);
  return myAxios.post('/api/card_charge', formData)
}


// 获取个人信息

export const getUserInfo = () => {
  // /api/get_user_info
  // const formData = new FormData();
  // formData.append('card_str', card_str);
  return myAxios.get('/api/get_user_info')
}


// 获取用户订单
export const getOrderList = ({ limit, offset }) => {
  // return myAxios.get('/api/order')
  return myAxios.get(`api/order?${limit ? 'limit='+limit:''}${offset?'&offset='+offset :''}`)
}
// /api/order
// /api/user_set_pw




export const reqUserInfo = () => {
  // const formData = new FormData();
  // formData.append('userId', id);
  // formData.append('active_status', !is_active);

  return myAxios.get('/api/get_user_info',)
}

export const reqChanrge = ({ order_id }) => {
  // const formData = new FormData();
  // formData.append('userId', id);
  // formData.append('active_status', !is_active);


  const formData = new FormData();
  formData.append('order_id', order_id);
  return myAxios.post('/api/charge', formData)


}
export const reqDsicount = ({ charge }) => {
  // const formData = new FormData();
  // formData.append('userId', id);
  // formData.append('active_status', !is_active);


  const formData = new FormData();
  formData.append('charge', charge);
  return myAxios.post('/api/get_discount', formData)




}
