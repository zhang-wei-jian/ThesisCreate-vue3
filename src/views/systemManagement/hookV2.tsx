
import { ref, computed, reactive } from "vue"
import { reqUsers, reqSetUserStatus } from "../../api/users"
import { ElMessage } from 'element-plus'


export function useState() {

    const UsersList = ref([])

    const columns = [
        {
            title: `账号`,
            key: `username`,
            dataKey: `username`,
            width: 200,
            align: `center`,
        },
        {
            title: `订单ID`,
            key: `id`,
            dataKey: `id`,
            width: 200,
            align: `center`,
        },
        {
            title: `余额`,
            key: `yu_e`,
            dataKey: `yu_e`,
            width: 200,
            align: `center`,
        },
        {
            title: `订单数量`,
            key: `order_count`,
            dataKey: `order_count`,
            width: 200,
            align: `center`,
        },
        {
            title: `时间`,
            key: `date_joined`,
            dataKey: `date_joined`,
            width: 200,
            align: `center`,
        },

        // {
        //     title: `手机号`,
        //     key: `phone`,
        //     dataKey: `phone`,
        //     width: 200,
        //     align: `center`,
        // },
        {
            title: `操作`,
            key: `phone`,
            dataKey: `phone`,
            width: 500,
            align: `center`,
            cellRenderer: ({ rowData }) => (
                <div>
                    <el-button text type="primary" >详情</el-button>
                    <el-button text type="primary" >充值</el-button>
                    <el-button text type="primary" onClick={() => setUser(rowData)}>{rowData.is_active ? "解封" : '封禁'}</el-button>
                    <el-button text type="primary" >修改密码</el-button>
                    <el-button text type="primary" >查询订单</el-button>

                </div >
            )
        },

    ]
    const pagination = reactive<PaginationProps>({
        total: 0,
        pageSize: 10,
        currentPage: 1,
        background: true
    });

    const currentDataList = computed(() => {
        // console.log(dataList.value.slice(
        //   (pagination.currentPage - 1) * pagination.pageSize,
        //   pagination.currentPage * pagination.pageSize
        // ),'wode shuju');
        return UsersList.value.slice(
            (pagination.currentPage - 1) * pagination.pageSize,
            pagination.currentPage * pagination.pageSize
        );
    });
    const pageSizeChange = (val: number) => {
        pagination.pageSize = val;
        console.log(pagination.pageSize);
    };

    const getUsers = async () => {
        const res = await reqUsers()
        console.log(res)
        UsersList.value = res
        pagination.total = res.length
    }

    const setUser = async (row,) => {
        console.log(row)
        const res = await reqSetUserStatus(row)
        ElMessage.success(row.is_active ? "解封成功" : '封禁成功')
        getUsers()
    }

    const orderSearchHandle = (id) => {
        console.log(id, UsersList.value);

        const res = UsersList.value.filter((item: { id: string }) => {
            // console.log(item);
            console.log(typeof item.id);
            return item.id === id
        })
        UsersList.value = res
        console.log(res, 'you');

    }


    return {
        UsersList,
        columns,
        getUsers,
        currentDataList,
        pagination,
        pageSizeChange,
        orderSearchHandle,
    }
}
