<template>
    <div class="page_body">

        <el-card>
            <el-form :model="form" label-width="120px">
                <el-form-item label="订单查询">
                    <div class="orderSearchItem">
                        <el-input v-model="form.orderId" />
                        <el-button @click="SearchOrderId(form.orderId)">搜索</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <el-card>

                <!-- <el-auto-resizer>
                <template #default="{ height, width }">
                    <el-table-v2 :columns="columns" :data="orderList" :width="1920" :height="400" fixed
                        style="width:100%" />

                </template>
            </el-auto-resizer> -->

                <el-table-v2 :columns="columns" :data="orderList" :width="1920" :height="500" fixed />

                <!-- <el-table :data="orderList" style="width: 100%" align="center">
            <el-table-column prop="order_id" label="Date" align="center" />
            <el-table-column prop="name" label="Name" align="center" />
            <el-table-column prop="address" label="Address" />
        </el-table> -->
            </el-card>

        </el-card>



    </div>
</template>

<script  setup>
import { ref } from "vue"
import { reqOrder } from "@/api/order"
import { ElMessage } from 'element-plus'
const orderId = ref()
const form = ref({
    orderId: ''
})
const orderList = ref([])

const columns = [
    {
        key: `订单ID`,
        dataKey: `order_id`,
        title: `订单ID`,
        width: 450,
        align: `center`,
    },
    {
        key: `after_money`,
        dataKey: `after_money`,
        title: `after_money`,
        width: 200,
        align: `center`,
    },
    {
        key: `name`,
        dataKey: `name`,
        title: `name`,
        width: 200,
        align: `center`,
    },
    {
        title: `money`,
        key: `id`,
        dataKey: `money`,
        width: 200,
        align: `center`,
    },
    {
        title: `user`,
        key: `user`,
        dataKey: `user`,
        align: `center`,
        width: 200,
    },
    {
        title: `create_time`,
        key: `create_time`,
        dataKey: `create_time`,
        align: `center`,
        width: 450,
    },
]

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
</style>
