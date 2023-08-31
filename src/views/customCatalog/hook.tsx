
import { ref, computed, reactive } from "vue"
import { reqUsers, reqSetUserStatus } from "../../api/users"
import { ElMessage } from 'element-plus'


export function useState() {

    const UsersList = ref([])

    const columns = [
        {
            label: `章节标题`,
            key: `username`,
            prop: `username`,

            align: `center`,
        },
        {
            label: `小字标题`,
            key: `id`,
            prop: `id`,

            align: `center`,
        },
        {
            label: `字数`,
            key: `yu_e`,
            prop: `yu_e`,

            align: `center`,
        },


        {
            label: `操作`,
            key: `phone`,
            prop: `phone`,
            width: 450,
            align: `center`,
            cellRenderer: ({ row }) => (
                <div>
                    <el-button >复制</el-button>
                    <el-button onClick={editHandle} type="warning" >编辑</el-button>
                    <el-button type="danger" >删除</el-button>

                </div >
            )
            // cellRenderer: ({ rowData }) => (
            //     <div>
            //         <el-button text type="primary" >详情</el-button>
            //         <el-button text type="primary" >充值</el-button>
            //         <el-button text type="primary" onClick={() => setUser(rowData)}>{rowData.is_active ? "解封" : '封禁'}</el-button>
            //         <el-button text type="primary" >修改密码</el-button>
            //         <el-button text type="primary" >查询订单</el-button>

            //     </div >
            // )
        },

    ]

    const formData = ref({
        user: '',
        password: '',

    });

    const centerDialogVisible = ref(false)

    const pagination = reactive<any>({
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


    const editHandle = () => {
        console.log("cc");

        centerDialogVisible.value = true
    }

    return {
        UsersList,
        columns,
        getUsers,
        currentDataList,
        pagination,
        pageSizeChange,
        orderSearchHandle,

        centerDialogVisible,
        formData
    }
}
