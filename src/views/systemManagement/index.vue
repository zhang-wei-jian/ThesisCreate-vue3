<template>
    <div class="page_body">
        <el-card style="margin-bottom: 10px;">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text-large font-600 mr-3">系统管理/用户管理</span>
                </template>
            </el-page-header>
        </el-card>

        <el-card style="margin-bottom: 10px;" class="searchBox">
            <el-form :inline="true" :model="form" label-width="120px">
                <!-- <el-button @click="orderSearchHandle(searchForm)">搜索</el-button>
                        <el-button v-show="true" @click="getUsers()">重置</el-button> -->

                <!-- <el-form-item label="订单号">
                    <div class="orderSearchItem">
                        <el-input v-model="searchForm.orderId" placeholder="请输入" />
                    </div>
                </el-form-item> -->
                <el-form-item label="用户名">
                    <div class="orderSearchItem">
                        <el-input style="width: 220px;" v-model="searchForm.username" placeholder="请输入" />
                        <!-- <el-button @click="orderSearchHandle(searchForm)">搜索</el-button>
                        <el-button v-show="true" @click="getUsers()">重置</el-button> -->
                    </div>
                </el-form-item>
                <el-form-item label="余额">
                    <div class="orderSearchItem">
                        <el-input style="width: 220px;" v-model="searchForm.yu_e" placeholder="请输入" />
                        <!-- <el-button @click="orderSearchHandle(searchForm)">搜索</el-button>
                        <el-button v-show="true" @click="getUsers()">重置</el-button> -->
                    </div>
                </el-form-item>
                <!-- <el-form-item label="订单数量">
                    <div class="orderSearchItem">
                        <el-input style="width: 220px;" v-model="searchForm.order_count" placeholder="请输入" />
                    </div>
                </el-form-item> -->
                <el-form-item>
                    <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                        @click="orderSearchHandle(searchForm)">搜 索</el-button>
                    <!-- <el-button @click="orderSearchHandle(searchForm)">搜索</el-button> -->
                    <el-button v-show="true" @click="getUsers()">重 置</el-button>

                </el-form-item>
            </el-form>
        </el-card>
        <el-card>

            <pure-table :data="currentDataList" :columns="columns" :pagination="pagination" height="100%"></pure-table>

        </el-card>



        <!-- 详情 -->
        <el-dialog v-model="dialogTableVisible" title=" 用户详情">

            <el-form :model="form" label-width="220px">

                <!-- {{ resForm }} -->

                <el-form-item v-if="resForm.id" label="用户id:">
                    {{ resForm.id }}
                </el-form-item>
                <el-form-item v-if="resForm.username" label="用户名称:">
                    {{ resForm.username }}
                </el-form-item>
                <el-form-item v-if="resForm.is_active" label="用户状态:">
                    {{ resForm.is_active ? '正常' : '异常'}}
                </el-form-item>
                <el-form-item v-if="resForm.order_count" label="订单数量:">
                    {{ resForm.order_count }}
                </el-form-item>
                <el-form-item v-if="resForm.yu_e" label="余额:">
                    {{ resForm.yu_e }}
                </el-form-item>
                <!-- <el-form-item v-if="resForm.yu_e" label="用户权限:">
                    {{ resForm.yu_e }}
                </el-form-item> -->
                <el-form-item v-if="resForm.update_time" label="更新时间:">
                    {{ getParamsTime(resForm.update_time, 'nyrsfm', true) }}
                </el-form-item>


            </el-form>

        </el-dialog>




        <!-- 支付_dddd -->
        <el-dialog v-model="centerDialogVisible" @close="close" :title="dialogTitle" width="571px" center>
            <div v-if="downFileUrl === ''">
                <!-- <el-row>
                    <el-col :span="24" style="text-align: center;">
                        生成成功，是否立即支付？ <a :href="resForm.pay_url" target="_blank">去支付</a>
                    </el-col>
                </el-row> -->
                <el-row>
                    <el-col :span="24" style="text-align: center;">
                        <span style="color: black;font-weight: bold;">
订单：{{ resForm.order_id }}<el-button style="background-color: #467af2;border: #467af2;" type="primary" size="small"
                                            @click="copyOrderId">复制</el-button></span>
                        <p style="font-weight: bold;color: red;margin: 7px;">请牢记订单编号！订单编号即是相应付款记录中的订单编号，如果是系统用户，请到系统中查询。如有疑问，请联系客服！</p>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center;">
                        付款完成将自动跳转
                    </el-col>
                </el-row>

                <!-- <el-button type="text" @click="testHandle">调试一键成功</el-button> -->

                <p class="min_title" style="margin-top: 20px;text-align: center;"> <span>付款方式</span> </p>
                <div class="contentSearch"  style="padding-left: 160px;">
                    <!-- <label style="width: 160px;font-size: 15px;">请选择支付方式</label> -->
                    <el-radio-group style="width: 290px;margin-left: 100px;" v-model="payForTwoChooseOne"
                        @change="playTypeChange" class="ml-4">
                        <el-radio label="wx" size="large">微信支付</el-radio>
                        <el-radio label="ali" size="large">支付宝支付</el-radio>
                        <div>
                            <el-radio v-if="username" label="money" size="large">余额支付</el-radio>
                            <!-- <el-button v-if="payForTwoChooseOne === 'money'" @click="moneyPlayHandle">使用余额支付</el-button> -->
                          
                        </div>
                    </el-radio-group>
                    <!-- <el-input v-model="form.subject" placeholder="输入论文标题，5-20字效果最佳" style="margin:5px;width: 300px;" /> -->
                </div>
                <canvas  style="margin-left: 180px;" v-show="payForTwoChooseOne !== 'money'" ref="qrCodeRef" id="canvas"></canvas>
                <p  style="margin-left: 215px;margin-top: 10px;">

                <el-button v-if="payForTwoChooseOne === 'money'"
                                style="background-color: #467af2;border: #467af2;margin-bottom: 14px;" type="primary" @click="moneyPlayHandle">
                                使用余额支付</el-button>
                                </p>
            </div>

            <div v-else-if="downFileUrl === 'loading'"  style="text-align: center;">
                <!-- loading...请耐心等待 -->
                支付成功，系统处理中...
            </div>
            <div v-else>

                <el-row>
                    <el-col :span="12">
                        订单：{{ resForm.order_id }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        生成成功
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <!-- <el-tooltip class="box-item" effect="dark" :content="downFileUrl" placement="top-start">
                            <a :href="downFileUrl"> <el-button
                                    style="background-color: #467af2;border: #467af2;width: 150px;" type="primary">
                                    下载</el-button></a>

                        </el-tooltip> -->

                        <el-tooltip class="box-item" effect="dark" :content="downFileUrl" placement="top-start">
                            <el-button style="background-color: #467af2;border: #467af2;width: 150px;" type="primary"
                                @click="rePlayHandle">
                                再来一次</el-button>

                        </el-tooltip>

                    </el-col>
                </el-row>
            </div>
            <!-- <canvas ref="qrCodeRef" id="canvas"></canvas> -->

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button 
                    style="background-color: #467af2;border: #467af2;"
                    type="primary" @click="centerDialogVisible = false">
                    确定</el-button>
                    <!-- <el-button type="primary" @click="centerDialogVisible = false">
                        确定
                    </el-button> -->
                </span>
            </template>

        </el-dialog>



        <!-- 修改密码 -->
        <el-dialog v-model="dialogPSVisible"  title="修改密码">
            <el-form :model="form" label-width="220px">
                <!-- {{ resForm }} -->
                <el-form-item label="用户id:">
                    {{ resForm.user_id }}
                </el-form-item>
                <el-form-item label="修改密码:">
                    <el-input style="width: 300px;" v-model="form.pw" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="    dialogPSVisible = false">取消</el-button>
                    <el-button type="primary" @click="pwCheckHandle">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>


        <!-- setSuyper -->
        <el-dialog v-model="dialogSuperVisible" title="设置权限">
            <el-form :model="form" label-width="220px">
                <!-- {{ resForm }} -->
                <el-form-item label="用户id:">
                    {{ resForm.user_id }}
                </el-form-item>
                <el-form-item label="用户类型:">
                    <el-select style="width: 150px;" filterable v-model="form.is_super" placeholder="请选择">
                        <el-option v-for="item in superSelect" :key="item.key" :label="item.role" :value="item.key" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="    dialogSuperVisible = false">取消</el-button>
                    <el-button type="primary" @click="setSuperCheckHandle">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>




        <!-- superCharge -->
        <el-dialog v-model="dialogSuperChargeVisible" title="充值金额">
            <el-form :model="form" label-width="220px">
                <!-- {{ resForm }} -->
                <el-form-item label="用户id:">
                    {{ resForm.user_id }}
                </el-form-item>
                <el-form-item label="金额:">
                    <el-input style="width: 300px;" v-model="form.money" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="    dialogSuperChargeVisible = false">取消</el-button>
                    <el-button type="primary" @click="setsuperChargeCheckHandle">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>


    </div>
</template>

<script  setup>
import { ref } from "vue"
import { reqUsers } from "@/api/users"
import { useState } from "./hook.tsx"

import { PureTable } from "@pureadmin/table";

import { getParamsTime } from '@/utils/formatData'





const { columns, getUsers,
    UsersList, currentDataList, pagination, pageSizeChange, orderSearchHandle, dialogSuperChargeVisible, setsuperChargeCheckHandle,
    dialogTableVisible, searchForm,
    dialogPSVisible, setSuperCheckHandle, dialogSuperVisible,
    centerDialogVisible, qrCodeRef,
    resForm, pwCheckHandle, form,

} = useState()

const superSelect = ref([
    {
        key: true,
        role: '超级管理员'
    }, {
        key: false,
        role: '普通用户'
    },
    // true,
    // false
])

const copyOrderId = ()=>{
    let copyValue = document.createElement("input");
    let copyUrl = resForm.order_id;
    copyValue.value = copyUrl;
    document.body.appendChild(copyValue);
    copyValue.select();
    document.execCommand("Copy");
    ElMessage.success("复制成功！")
}

const orderId = ref()
// const form = ref({
//     orderId: 0
// })

const goBack = () => {
    console.log('go back')
}



getUsers()


</script>

<style scoped>
/* .body {
    padding: 30px;
} */

.el-form-item__content {
    flex-wrap: nowrap
}

/* .orderSearchItem {
    display: flex;
    flex-wrap: nowrap;
} */

.body_pagin {
    /* height: 30px; */
    /* background-color: red; */
    float: right;
    padding: 30px;
}

.el-table-v2 {
    width: 100%;
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

.searchBox {


    display: flex;
    flex-direction: row;
}
</style>
