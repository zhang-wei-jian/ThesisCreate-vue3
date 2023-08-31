<template>
    <div class="page_body">



        <el-card style="margin-bottom: 10px;">
            <el-page-header>
                <template #content>
                    <span class="text-large font-600 mr-3">系统管理/订单管理 </span>
                </template>
            </el-page-header>
        </el-card>

        <el-card style="margin-bottom: 10px;">
            <el-form :inline="true" :model="params" label-width="90px">
                <!-- <el-form-item label="文件名称：">
                    <div class="orderSearchItem">
                        <el-input v-model="params.name" placeholder="请输入"/>
                    </div>
                </el-form-item> -->
                <!-- <el-form-item label="订单名称：">
                    <div class="orderSearchItem">
                        <el-input v-model="params.user"  placeholder="请输入"/>
                    </div>
                </el-form-item> -->
                <!-- <el-form-item label="操作类型：">
                    <div class="orderSearchItem">
                        <el-input v-model="params.action" placeholder="请输入" />
                    </div>
                </el-form-item>
                <el-form-item label="是否完成：">
                    <div class="orderSearchItem">
                        <el-input v-model="params.finished" placeholder="请输入" />
                    </div>
                </el-form-item> -->
                <el-form-item label="订单id：">
                    <div class="orderSearchItem">
                        <el-input v-model="params.order_id" placeholder="请输入" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="orderSearchItem">

                        <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                                            @click="getTableList">搜 索</el-button>

                        <!-- <el-button @click="getTableList">搜索</el-button> -->
                        <el-button @click="delTableCheck" type="danger">删除</el-button>

                    </div>
                </el-form-item>
            </el-form>

        </el-card>

        <el-card>

            <el-table :data="tableData.list" stripe style="width: 100%" @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55" />

                <el-table-column label="订单名称">
                    <template v-slot="scope">{{ filterNullVal(scope.row.name) }}</template>
                </el-table-column>
                <el-table-column label="用户名称">
                    <template v-slot="scope">{{ filterNullVal(scope.row.username) }}</template>
                </el-table-column>
                <el-table-column label="订单id">
                    <template v-slot="scope">{{ filterNullVal(scope.row.order_id) }}</template>
                </el-table-column>
                <el-table-column label="操作类型">
                    <template v-slot="scope">{{ ruleAction(scope.row.action) }}</template>
                </el-table-column>
                <el-table-column label="是否完成">
                    <template v-slot="scope">{{ filterNullVal(scope.row.finished ? '交易完成' : '交易进行中') }}</template>
                </el-table-column>
                <el-table-column label="创建时间">
                    <template v-slot="scope">{{ getParamsTime(scope.row.create_time, 'nyrsfm', true) }}</template>
                </el-table-column>
                <!-- <el-table-column label="操作">

                    <template v-slot="scope">
                        <el-button v-show="scope.row.finished">下载</el-button>
                        <el-button v-show="!scope.row.finished">重新生成</el-button>

                    </template>

                </el-table-column> -->
            </el-table>
            <div class="orderPg">
                <el-pagination v-model:current-page="page"
                    :page-sizes="[20, 30, 50]" :small="small" :total="total"
                    @current-change="handleCurrentChange" />
            </div>

        </el-card>

    </div>
</template>

<script  setup>
import { reactive, ref } from "vue"
import { reqOrder } from "@/api/order"
import { ElMessage } from 'element-plus'
import { getOrderList, delOrderList } from '@/api/orderSys'
import {  getParamsTime } from '@/utils/formatData'
const orderId = ref()
const form = ref({
    orderId: ''
})

// const format = getParamsTime;

const orderList = ref([])

const tableData = reactive({
    list: []
})

// const handleSizeChange = (e) => {
//     console.log(" handleSizeChange==> ", e);
//     params.limit = e*10;
//     getTableList();
// }

const handleCurrentChange = (e) => {
    console.log(" handleCurrentChange==> ", e);
    // params.offset = e*10;
    params.page = e;
    console.log("params.offset ==> ",params.offset);
    getTableList();
}

const params = reactive({
    name: '',
    user: '',
    action: '',
    status: '',
    finished: '',
    order_id: '',
    page:1
})

const total = ref();

const delArry = reactive({
    list: []
})

const getTableList = async () => {
    console.log("params ==> ",params);
    const list = await getOrderList(params);
    console.log("list ==> ", list);
    tableData.list = list.items;
    total.value = list.count;
}


getTableList();


const handleSelectionChange = (e) => {
    delArry.list = []
    console.log("Hello!!!", e);
    for (let i = 0; i < e.length; i++) {
        console.log(" ====> ", e[i].order_id);
        delArry.list.push(e[i].order_id)
    }
    console.log(" delArry.list ===> ", delArry.list);
}

const delTableCheck = async () => {
    console.log("delArry.list[0] ==> ", delArry.list[0]);
    let callval = await delOrderList({ id_list: JSON.stringify(delArry.list) });
    console.log("callval ===<> ", callval);
    getTableList();
    if (callval.detail == 'ok') {
        ElMessage({
            message: '删除成功！',
            type: 'success',
        })
    } else {
        ElMessage.error(`删除失败：${callval.detail}`)

        // ElMessage({
        //     message: '删除成功！',
        //     type: 'success',
        // })
    }
}

const ruleAction = (e) => {

    return e == 1 ? '生成论文' : '生成开题报告'

}

const filterNullVal = (e) => {
    return e ? e : '--'
}

const SearchOrderId = async (id) => {

    if (form.value.orderId.trim === '') {
        return
    }
    const res = await reqOrder({ userId: form.value.orderId })
    console.log(res)
    ElMessage.success('查询成功')
    orderList.value = res
}



</script>

<style scoped>
.orderPg {
    float: right;
    margin: 20px;
}

.body {
    height: 100%
}

.orderSearchItem .el-form-item__content {
    flex-wrap: nowrap
}

.orderSearchItem {
    display: flex;
    flex-wrap: nowrap;
}

.page_body {
    /* padding-right: 200px; */
    /* width: 100%;
    height: 100%;
    display: flex; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/backgroudBody.png');
    background-size: cover;
}
</style>
