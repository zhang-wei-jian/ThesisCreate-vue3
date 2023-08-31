
import { ref } from "vue"
import { reqUsers, reqSetUserStatus } from "../../api/users"
import { ElMessage } from 'element-plus'


export function useState() {

    const formData = ref({
        user: '',
        password: '',

    });

    return {
        formData
    }
}
