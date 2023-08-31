import myAxios from '../utils/myAxios'

export const reBornPaper = ({ title, model_id }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('model_id', model_id);
    return myAxios.post('/api/gen_article', formData)
}