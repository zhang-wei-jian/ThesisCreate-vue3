import myAxios from '../utils/myAxios'









// set
export const reqPdf2word = ({ id, is_active }) => {
  const formData = new FormData();
  formData.append('userId', id);
  formData.append('active_status', !is_active);

  return myAxios.post('/api/pdf2word', formData)
}




