import myAxios from '../utils/myAxios'

export const reqModules = () => {

    return myAxios.get('/api/get_models')
}


export const reqGenToc = ({ title , return_url, amount, action }) => {
    const formData = new FormData();
    formData.append('title ', title );

    return myAxios.post('/api/gen_toc', formData)
}






export const reqto2Docx = ({ mulu, title, model_id, order_id }) => {
    const formData = new FormData();
    formData.append('mulu', mulu);
    formData.append('title', title);
    formData.append('model_id', model_id);
    formData.append('order_id', order_id);
    return myAxios.post('/api/toc2docx', formData)
}

export const reqCheckOrderIsPlay = ({ order_id }) => {
    const formData = new FormData();
    formData.append('order_id', order_id);

    return myAxios.post('/api/check_pay', formData)
}

export const reqGenArticle = ({ title, model_id, order_id }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('model_id', model_id);
    formData.append('order_id', order_id);

    return myAxios.post('/api/gen_article', formData)
}


// 通过余额支付 /api/balance_pay
export const reqPayForBalance = ({ subject, amount, action }) => {
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('subject', subject);
    formData.append('action', action);
    return myAxios.post('/api/balance_pay', formData)
}



// export const reqPayForBalance = ({ subject, amount, action }) => {
//     const formData = new FormData();
//     formData.append('amount', amount);
//     formData.append('subject', subject);
//     formData.append('action', action);
//     return myAxios.post('/api/balance_pay', formData)
// }
