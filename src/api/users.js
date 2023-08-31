import myAxios from '../utils/myAxios'








export const reqUsers = ({orderId, username, yu_e, order_count }) => {
  // const formData = new FormData();


  // formData.append('username', 'super1');
  // formData.append('yu_e', yu_e);
  // formData.append('order_count', order_count);

  const queryString = [];
  if (orderId) {
    queryString.push(`orderId=${orderId}`);
  }
  if (username) {
    queryString.push(`username=${username}`);
  }
  if (yu_e) {
    queryString.push(`yu_e=${yu_e}`);
  }
  if (order_count) {
    queryString.push(`order_count=${order_count}`);
  }


  const requestPath = `/api/users${queryString.length > 0 ? '?' + queryString.join('&') : ''}`;

  // 发送请求
  return myAxios.get(requestPath);
}





// set
export const reqSetUserStatus = ({ id, is_active }) => {
  const formData = new FormData();
  formData.append('userId', id);
  formData.append('active_status', !is_active);

  return myAxios.post('/api/set_user', formData)
}
// dele
export const reqdeleteUser = ({ id }) => {
  const formData = new FormData();
  formData.append('user_id', id);


  return myAxios.post('/api/delete_user', formData)
}
// suepruserinfo
export const reqSuperUserInfo = ({ id }) => {
  const formData = new FormData();
  formData.append('user_id', id);


  return myAxios.post('/api/super_user_info', formData)
}


// 修改密码
// user_id
// pw
export const setUserPassword = ({ user_id, pw }) => {
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('pw', pw);
  return myAxios.post('/api/super_set_pw', formData)


}



// pw
export const setUserSuper = ({ user_id, is_super }) => {
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('is_super', is_super);
  return myAxios.post('/api/set_privilige', formData)


}


// superCharge
export const reqSuperCharge = ({ user_id, money }) => {
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('money', money);

  return myAxios.post('/api/super_charge', formData)
}


