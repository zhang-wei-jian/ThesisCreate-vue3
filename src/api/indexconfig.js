import myAxios from '../utils/myAxios'

export const getNotice = () => {

    return myAxios.get('/api/list_bulletins')
}



