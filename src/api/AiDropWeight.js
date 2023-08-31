import myAxios from '../utils/myAxios'








export const reqAiDropWeight = (words) => {
  const formData = new FormData();

  formData.append('words', words);

  return myAxios.post('/api/manually_reduce_duplicate', formData)
}




