import myAxios from '../utils/myAxios'


// /api/list_bulletins

export const noticeList = () => {
    // const formData = new FormData();
    // formData.append('content', content);
    return myAxios.get('/api/list_bulletins')
}

export const addNotice = ({ content }) => {
    const formData = new FormData();
    formData.append('content', content);
    return myAxios.post('/api/add_bulletins', formData)
}

export const delNotice = ({ id_list }) => {
    const formData = new FormData();
    formData.append('id_list', id_list);
    return myAxios.post('/api/delete_bulletins', formData)
}


//   export const reqLogin = ({ username, password }) => {
//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('password', password);

//     return myAxios.post('/api/login', formData)
//   }


//   /api/add_bulletins