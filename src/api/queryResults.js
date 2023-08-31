import myAxios from '../utils/myAxios'
// set
export const reqcheckOrder = ({ order_id }) => {
  const formData = new FormData();
  formData.append('order_id ', order_id);
  // formData.append('active_status', !is_active);

  return myAxios.post('/api/check_order', formData)
}


  // export const getCardword = ({ limit,offset}) => {
  //   const formData = new FormData();
  //   formData.append('limit', limit);
  //   formData.append('offset', offset);

  //   // formData.append('active_status', !is_active);
  //   // limit
  //   // offset
  //   return myAxios.get('/api/card_list', formData)
  // }






