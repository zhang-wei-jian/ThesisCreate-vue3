<template>
    <!-- <div class="page_body"> -->
    <div id="content">

        <div style="text-align: center;">
            <!-- <div class="orderFrom"> -->

            订单编号：
            <el-input style="width: 420px;" v-model="orderNum" placeholder="请输入订单编号" />
            <el-button class="searchBtn" @click="selectFun" type="primary">查询</el-button>
            <p class="pWordSty">注：订单编号即是付款记录中的订单编号，如果是系统用户，请到系统中查询。如有疑问，请联系客服！</p>
            <p style="line-height: 30px;
    color: #93969c;
    font-size: 14px;">对生成的内容不满意？联系客服！帮您优化！</p>

            <!-- </div> -->
            <!-- <div class="dataView"> -->
            <el-empty v-show="tableData.length == 0" v-loading="loading" description="暂无数据" />
            <!-- </div> -->
            <div v-show="tableData.length > 0" class="queryPage">
                <el-table :data="tableData">
                    <el-table-column label="创建时间" width="256">
                        <template #default="scope">
                            <div>
                                <el-icon>
                                    <timer />
                                </el-icon>
                                <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" width="56">
                        <template #default="scope">
                            <div>
                                <span>{{ scope.row.money }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" aligen="align">
                        <template #default="scope">
                            <el-popover effect="light" :content="scope.row.name" trigger="hover" placement="top"
                                width="auto">
                                <template #default>
                                    <!-- <div>name: {{ scope.row.name }}</div> -->

                                </template>
                                <template #reference>
                                    <el-tag>{{ scope.row.name }}</el-tag>
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <!-- <el-button size="small" type="primart" @click="handleDelete(scope.$index, scope.row)">下载</el-button> -->


                            <el-tooltip class="box-item" effect="dark" :content="downFileUrl" placement="top-start">
                                <a :href="downFileUrl"> <el-button
                                        style="background-color: #467af2;border: #467af2;width: 150px;" type="primary">
                                        下载</el-button></a>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { reqcheckOrder } from "@/api/queryResults"

const orderNum = ref();
const tableData = ref([]);
const downFileUrl = ref('')


const loading = ref(false)

const selectFun = async () => {
    loading.value = true;
    // setTimeout(() => {
    //     loading.value = false;
    // }, 3000)
    tableData.value.length = 0
    tableData.value = [];
    console.log(orderNum.value);

    const obj = {

        order_id: orderNum.value ? orderNum.value : ''
    }


    downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}/download_file/${orderNum.value}`

    const res = await reqcheckOrder(obj)
    console.log(res, "res");


    res.downFileUrl = downFileUrl.value
    tableData.value.push(res)
    loading.value = false

}

</script>

<style scoped>
.pWordSty {
    /* font-weight: bold; */
    line-height: 50px;
    color: #93969c;
    font-size: 14px;
}

.searchBtn {
    background-color: #467af2;
    border: #467af2;
    margin-left: 10px;
}

#content {
    /* padding-right: 200px; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/backgroudBody.png');
    background-size: cover;
}

/* .order_style {
    text-align: center;
    background-image: url('../../assets/backgroudBody.png');
    background-size: cover;
} */

.dataView {
    border: 1px solid red;
    /* height: 600px;
    width: 700px; */
}

.orderFrom {
    /* line-height: 100px; */
    margin-top: 10vh;
}

.queryPage {
    border: 1px solid #467af2;
    width: 800px;
    padding: 10px;
    border-radius: 5px;
}
</style>
