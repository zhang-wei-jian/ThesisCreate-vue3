import myAxios from '../utils/myAxios'

export const reqModules = () => {

    return myAxios.get('/api/get_models')
}


export const reqAliPay = ({ subject, return_url, amount, action, order_id }) => {
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('return_url', return_url);
    formData.append('amount', amount);
    formData.append('action', action);
    // formData.append('order_id', order_id);
    return myAxios.post('/api/request_ali_pay', formData)
}

export const reqWeChatPay = ({ subject, return_url, amount, action, order_id }) => {
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('return_url', return_url);
    formData.append('amount', amount);
    formData.append('action', action);
    // formData.append('order_id', order_id);
    return myAxios.post('/api/request_wechat_pay', formData)
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






export const reqGenReport = ({ title, model_id, order_id }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('model_id', model_id);
    formData.append('order_id', order_id);

    return myAxios.post('/api/gen_report', formData)
}




export const reqAIAliPay = ({ subject, return_url, amount, action, order_id }) => {
    const formData = new FormData();
    formData.append('subject', subject);
    // formData.append('return_url', return_url);
    formData.append('amount', amount);
    formData.append('action', action);
    formData.append('order_id', order_id);
    return myAxios.post('/api/request_ali_pay', formData)
}

export const reqAIWeChatPay = ({ subject, return_url, amount, action, order_id }) => {
    const formData = new FormData();
    formData.append('subject', subject);
    // formData.append('return_url', return_url);
    formData.append('amount', amount);
    formData.append('action', action);
    formData.append('order_id', order_id);
    return myAxios.post('/api/request_wechat_pay', formData)
}


// 通过余额支付 /api/balance_pay
export const reqPayAIForBalance = ({ subject, amount, action, order_id }) => {
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('subject', subject);
    formData.append('action', action);
    formData.append('order_id', order_id);
    return myAxios.post('/api/balance_pay', formData)
}


// /api/gen_invite_code
export const reBronCode = () => {
    return myAxios.get('/api/gen_invite_code')
}


export const getBronCode = () => {
    return myAxios.get('/api/list_invite_code')
}


// /api/list_invite_code