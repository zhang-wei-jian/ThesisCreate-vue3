import myAxios from '../utils/myAxios'

export const getOrderList = ({ name, user, action, status, finished, order_id, page }) => {
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('user', user);
    // formData.append('action', action);
    // formData.append('status', status);
    // formData.append('finished', finished);
    // formData.append('order_id', order_id);
    // formData.append('limit', limit);
    // formData.append('offset', offset);
    // return myAxios.post('/api/list_order?limit='+limit+"&offset="+offset+"&name=", formData)
    // limit=${formatVal(limit)}
    // &offset=${formatVal(offset)}
    // &name=${formatVal(name)}
    // &user=${formatVal(user)}
    // &action=${formatVal(action)}
    // &status=${formatVal(status)}
    // &finished=${formatVal(finished)}
    // &order_id=${formatVal(order_id)}

    return myAxios.post(`/api/list_order?${page?'page='+page:''}${+name?'&name='+name:''}${user?'&user='+user:''}${action?'&action='+action:''}${status?'&status='+status:''}${finished?'&finished='+finished:''}${order_id?'&order_id='+order_id:''}
    `)

    // rder?limit=10&offset=1
}

const formatVal = (e) => {
    return e ? e : ''
}

// /api/delete_orders
export const delOrderList = ({ id_list }) => {
    const formData = new FormData();
    formData.append('id_list', id_list);

    return myAxios.post('/api/delete_orders', formData)

}