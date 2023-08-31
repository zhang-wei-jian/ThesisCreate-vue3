import myAxios from '../utils/myAxios'








export const reqOrder = ({ userId }) => {
  const formData = new FormData();

  formData.append('userId', userId);

  return myAxios.post('/api/order', formData)
}




