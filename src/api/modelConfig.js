import myAxios from '../utils/myAxios'

// /api/super_get_models
export const getSuperModel = ({name,active}) => {
  // const formData = new FormData();
  // formData.append('name', name);
  // formData.append('active', active);

  // if(name && (active == true || active == false)){

  //   return myAxios.get(`/api/super_get_models?$name=${name}&active=${active}`)

  // }else if(){

  // }

  return myAxios.get(`/api/super_get_models?${name != ''?'name='+name:''}${active == true || active === false ?'active='+active:''}`)

  // return myAxios.get('/api/super_get_models')
}


export const reqModules = () => {
  return myAxios.get('/api/get_models')
}

// /api/add_article_model
// name: 测试模版
// title_1_type: 章节
// title_2_type: 默认
// title_3_type: 默认
// yemei: 测试页眉
// is_have_gjz: true
// lunwen_f∂∂ile: （二进制）
// report_file: 123

export const addNewModel = ({ name, title_1_type, title_2_type, title_3_type, yemei, is_have_gjz, lunwen_file, report_file,id }) => {

  const formData = new FormData();
  formData.append('name', name);
  formData.append('title_1_type', title_1_type);
  formData.append('title_2_type', title_2_type);
  formData.append('title_3_type', title_3_type);
  formData.append('yemei', yemei);
  formData.append('is_have_gjz', is_have_gjz);
  formData.append('lunwen_file', lunwen_file);
  formData.append('report_file', report_file);
  formData.append('id', id);


  // return myAxios.post('/api/add_model_parts', formData)
  return myAxios.post('/api/add_article_model', formData)
}

// 删除模版
export const delModel = ({model_id})=>{
  const formData = new FormData();

  formData.append('model_id', model_id);

    return myAxios.post('/api/delete_article_model', formData)
}




export const setModelSort = ({ name, title, order, model_id }) => {

  const formData = new FormData();
  formData.append('name', name);
  formData.append('title', title);
  formData.append('order', order);
  formData.append('model_id', model_id);

  return myAxios.post('/api/add_model_parts', formData)
}
// /api/add_model_parts
// /api/delete_article_model

// name: 123
// order: 1
// article_id: 88

// /api/add_start_report
export const setOpenModel = ({ name, order,  article_id }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('order', order);
  formData.append('article_id', article_id);

  return myAxios.post('/api/add_start_report', formData)
}

// /api/super_activate_model

export const ChangeModelState = ({ active, model_id }) => {
  const formData = new FormData();
  formData.append('active', active);
  formData.append('model_id', model_id);
  return myAxios.post('/api/super_activate_model', formData)
}

// /api/download_model
// model_id: 123
// atype: ZHUMOBAN
export const downLoadFiles = ({ model_id, atype }) => {
  const formData = new FormData();
  formData.append('model_id', model_id);
  formData.append('atype', atype);
  return myAxios.post('/api/download_model', formData)
}
