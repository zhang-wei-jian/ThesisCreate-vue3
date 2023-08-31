
import { ref, computed, reactive, nextTick } from "vue"
import { reqUsers, reqSetUserStatus, reqdeleteUser, reqSuperUserInfo, setUserPassword, setUserSuper, reqSuperCharge } from "../../api/users"
import { ElMessage, ElMessageBox } from 'element-plus'
// import { async } from "@antv/x6/lib/registry/marker/async"


import {
    reqModules, reqAliPay, reqWeChatPay,
    reqCheckOrderIsPlay, reqGenArticle, reqPayForBalance, reqAIAliPay, reqAIWeChatPay, reqPayAIForBalance,

} from "@/api/NormalCreate"

export function useState() {

    const UsersList = ref([])

    const columns = [
        {
            label: `用户名称`,
            key: `username`,
            prop: `username`,

            align: `center`,
        },
        // {
        //     label: `订单ID`,
        //     key: `id`,
        //     prop: `id`,

        //     align: `center`,
        // },
        {
            label: `余额`,
            key: `yu_e`,
            prop: `yu_e`,

            align: `center`,
        },
        {
            label: `订单数量`,
            key: `order_count`,
            prop: `order_count`,

            align: `center`,
        },
        {
            label: `用户权限`,
            key: `is_superuser`,
            prop: `is_superuser`,

            align: `center`,
            cellRenderer: ({ row }) => (
                <span> { row.is_superuser  ? '超级管理员'  : '普通用户'}
                </span>
            )
        },
        // {
        //     label: `时间`,
        //     key: `date_joined`,
        //     prop: `date_joined`,

        //     align: `center`,
        // },

        // {
        //     label: `手机号`,
        //     key: `phone`,
        //     prop: `phone`,
        //     width: 200,
        //     align: `center`,
        // },
        {
            label: `操作`,
            key: `phone`,
            prop: `phone`,
            width: 750,
            align: `center`,
            cellRenderer: ({ row }) => (
                <div>
                    <el-button text type="primary" onClick={() => supergetUserInfo(row)} >详情</el-button>
                    <el-button text type="primary" onClick={() => moneyChangeHandle(row)}>充值</el-button>
                    <el-button text type="primary" onClick={() => setUser(row)}>{row.is_active ? "封禁" : '解封'}</el-button>
                    <el-button text type="primary" onClick={() => setPw(row)} >修改密码</el-button>
                    {/* <el-button text type="primary" >查询订单</el-button> */}
                    <el-button text type="primary" onClick={() => deleteUser(row)} >注销用户</el-button>
                    <el-button text type="primary" onClick={() => setSuperHandle(row)} >权限管理</el-button>
                    {/* <el-button text type="primary" onClick={() => deleteUser(row)}>删除用户</el-button> */}
                    {/* dialogSuperVisible */}

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

    const dialogTableVisible = ref(false)
    const playDialogVisible = ref(false)
    const dialogPSVisible = ref(false)
    const dialogSuperVisible = ref(false)
    const dialogSuperChargeVisible = ref(false)
    const pagination = reactive({
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

    const searchForm = reactive({
        orderId: '',
        username: '',
        yu_e: '',
        order_count: '',
    })


    const getUsers = async (searchForm = {}) => {



        try {
            const res = await reqUsers(searchForm)
            console.log(res)
            UsersList.value = res
            pagination.total = res.length
        } catch (error) {
            ElMessageBox.alert(error)
        }
    }

    const setUser = async (row,) => {
        console.log(row)
        const res = await reqSetUserStatus(row)
        ElMessage.success(row.is_active ? "解封成功" : '封禁成功')
        getUsers()
    }

    const setPw = async (row,) => {
        // await 
        // alert("擦！", row)

        console.log(row);

        resForm.user_id = row.id

        dialogPSVisible.value = true



    };

    const orderSearchHandle = () => {
        // console.log(id, UsersList.value);

        // const res = UsersList.value.filter((item: { id: string }) => {
        //     // console.log(item);
        //     console.log(typeof item.id);
        //     return item.id === id
        // })
        // UsersList.value = res
        // console.log(res, 'you');
        getUsers(searchForm)

    }


    const deleteUser = async (row) => {

        console.log(row.id);


        const obj = {

            id: row.id,
        }
        const res = await reqdeleteUser(obj)

        // ElMessage.success("删除成功！   ")
        if (res.detail) {
            ElMessage.success(res.detail)
        }

        console.log(res, "res");

        getUsers()
    }
    const supergetUserInfo = async (row) => {

        console.log(row.id);


        const obj = {

            id: row.id,
        }
        const res = await reqSuperUserInfo(obj)

        dialogTableVisible.value = true



        Object.assign(resForm, res)



        console.log(res, "res");
        // ElMessage.success("删除成功！   ")



        // getUsers()
    }

    const resForm = reactive({

    })













    let isPlayTimeLoop = null
    const isLoding = ref(false);
    const downFileUrl = ref('')
    const centerDialogVisible = ref(false)
    const form = reactive({
        // type: '毕业论文',
        // title: '',
        // model_id: '',

        // textVal: '',

        // "subject": '',
        // "return_url": 'https://scpic.chinaz.net/Files/pic/pic9/201812/zzpic15903.jpg',
        "amount": '0.01',
        "action": '6',
        pw: '',
        user_id: '',


        // "order_id": '',
    })







    const ReBornPapers = async (playFn) => {


        isPlayTimeLoop && clearInterval(isPlayTimeLoop)
        isPlayTimeLoop = null


        isLoding.value = true;
        console.log("form ===> ", form);
        // const callVal = await reBornPaper({ title: form.title, model_id: form.model_id })
        // console.log("callVal ==> ", callVal);

        const res = await playFn(form)

        if (res.status === false) {
            ElMessage.error(res.detail)
            isLoding.value = false;
            return
        }
        Object.assign(resForm, res)

        console.log(resForm);
        centerDialogVisible.value = true
        isLoding.value = false;


        nextTick(() => {


            if (downFileUrl.value !== '') return
            cretateQrcode()
        })

        console.log(isPlayTimeLoop, "intertID");

        if (isPlayTimeLoop) return
        isPlayTimeLoop = setInterval(async () => {

            const res = await reqCheckOrderIsPlay(resForm)
            status.value = res.status
            console.log("watch");

            // 订单付款成功
            if (status.value) {
                clearInterval(isPlayTimeLoop)
                ElMessage.success('付款成功！')

                localStorage.setItem('order_id', resForm.order_id)
                isPlayTimeLoop = null


                getGenArticle()



            }
        }, 1000);



    }

    const qrCodeRef = ref()
    const cretateQrcode = () => {

        console.log(qrCodeRef.value, "DOM");
        var canvas = document.getElementById('canvas')
        console.log(canvas, "DOM");

        // if (qrCodeRef.value) {

        QRCode.toCanvas(qrCodeRef.value, resForm.pay_url, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })

        // } else {
        // var canvas = document.getElementById('canvas')
        // console.log(canvas, "DOM");

        // QRCode.toCanvas(qrCodeRef.value, resForm.pay_url, function (error) {
        //     if (error) console.error(error)
        //     console.log('success!');
        // })
        // }



    }


    const moneyChangeHandle = (row) => {
        // console.log(form.amount);
        // if (form.amount === '') {
        //     form.amount = '0.01'
        // }

        resForm.user_id = row.id
        dialogSuperChargeVisible.value = true
        // ReBornPapers(reqWeChatPay)
    }


    const playTypeChange = (value) => {
        console.log(value);
        isPlayTimeLoop && clearInterval(isPlayTimeLoop)
        isPlayTimeLoop = null

        if (value === 'wx') {
            ReBornPapers(reqWeChatPay)
        } else if (value === 'ali') {
            ReBornPapers(reqAliPay)

            ReBornPapers(reqAliPay)

        } else if (value === 'money') {
            // ReBornPapers(reqPayForBalance)
        }

    }


    const pwCheckHandle = async () => {
        const obj = {
            user_id: resForm.user_id,
            pw: form.pw
        }
        const res = await setUserPassword(obj)
        if (res.detail === "ok") {
            ElMessage.success("修改成功！")
        }

        getUsers()
        dialogPSVisible.value = false
    }





    const setSuperHandle = async (row) => {
        resForm.user_id = row.id
        dialogSuperVisible.value = true

    }


    const setSuperCheckHandle = async (row) => {

        const obj = {
            user_id: resForm.user_id,
            is_super: form.is_super
        }


        const res = await setUserSuper(obj)

        if (res.detail) {
            ElMessage.success(res.detail)
        }
        getUsers()



        dialogSuperVisible.value = false
    }




    const setsuperChargeCheckHandle = async (row) => {

        const obj = {
            user_id: resForm.user_id,
            money: form.money
        }


        try {
            const res = await reqSuperCharge(obj)
            console.log(res);
            if (res.detail) {
                ElMessage.success(res.detail)
            }
        } catch (error) {
            ElMessage.error(error + "充值失败")
        }


        dialogSuperChargeVisible.value = false
        getUsers()



        dialogSuperVisible.value = false
    }

    return {
        dialogTableVisible,
        centerDialogVisible,
        dialogSuperChargeVisible,
        dialogPSVisible,
        qrCodeRef,
        searchForm,

        setSuperCheckHandle, setsuperChargeCheckHandle,

        UsersList,
        columns,
        getUsers,
        currentDataList,
        pagination,
        pageSizeChange,
        orderSearchHandle,
        form,
        resForm, pwCheckHandle,
        dialogSuperVisible
    }
}
