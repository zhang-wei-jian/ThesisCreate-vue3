import myAxios from '../utils/myAxios'
// set
export const makeCardword = ({ num }) => {
  const formData = new FormData();
  formData.append('num', num);
  // formData.append('active_status', !is_active);

  return myAxios.post('/api/gen_cards', formData)
}


export const getCardword = ({ money, used }) => {
  const formData = new FormData();
  // formData.append('limit', limit);
  // formData.append('offset', offset);
  // formData.append('money', money);
  // formData.append('used', used);
  // formData.append('active_status', !is_active);
  // limit
  // offset
  // return myAxios.get('/api/card_list', formData)
  return myAxios.get(`/api/card_list?${money ? 'money='+money :''}${used?'&used='+used:''}`)
}

// /api/order_cards
export const setCardPwd = ({ num, money }) => {
  const formData = new FormData();
  formData.append('num', num);
  formData.append('money', money);

  return myAxios.post('/api/order_cards', formData)

}

export const delCardWord = () => {
  return myAxios.get('/api/delete_cards')

}
// /api/delete_cards




