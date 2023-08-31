import myAxios from '../utils/myAxios'


export const setGPTVal = (val) => {
  const formData = new FormData();
  formData.append('question', val);
  // formData.append('active_status', !is_active);
  return myAxios.post('/api/ask', formData)
}

export const reqDiyDropWeight = ({ order_id, words }) => {
  const formData = new FormData();
  formData.append('words', words);
  formData.append('order_id', order_id);
  // formData.append('active_status', !is_active);
  return myAxios.post('/api/manually_reduce_duplicate', formData)
}

// export const reqDiyDropWeight = ( val ) => {
//     const formData = new FormData();
//     formData.append('words', val);
//     // formData.append('active_status', !is_active);
//     return myAxios.post('/api/manually_reduce_duplicate', formData)
//   }
