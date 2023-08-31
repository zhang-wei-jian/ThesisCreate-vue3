<template>
    <div class="page_body">
        <el-card style="margin-bottom: 10px;">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text-large font-600 mr-3">系统管理/用户管理 </span>
                </template>
            </el-page-header>
        </el-card>

        <!-- <el-card style="margin-bottom: 10px;">
            <el-form :model="form" label-width="120px">
                <el-form-item label="订单查询">
                    <div class="orderSearchItem">
                        <el-input v-model="form.orderId" />
                        <el-button @click="orderSearchHandle(Number(form.orderId))">搜索</el-button>
                        <el-button v-show="true" @click="getUsers()">重置</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card> -->
        <el-card>




            <pure-table :data="currentDataList" :columns="columns" :pagination="pagination" height="100%"></pure-table>



            <!-- <el-table-v2 :columns="columns" :data="currentDataList" :width="1920" table-layout="auto" :fixed="true"
                :height="500" />

            <div class="body_pagin">

                <el-pagination :total="pagination.total" v-model:current-page="pagination.currentPage"
                    v-model:page-size="pagination.pageSize" :page-sizes="[10, 20, 50, 200]" :disabled="false"
                    @size-change="pageSizeChange" layout="pagination.total, sizes, prev, pager, next, jumper" />
            </div> -->
        </el-card>


        <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
            <!-- <span>
                It should be noted that the content will not be aligned in center by
                default
            </span> -->


            <el-form ref="formRef" :model="formData" label-width="120px" class="">
                <el-form-item label="章节标题" prop="user" rules="">
                    <el-input v-model="formData.user" />
                </el-form-item>
                <el-form-item label="小字标题" prop="password" rules="">
                    <el-input v-model="formData.password" />
                </el-form-item>

                <el-form-item label="字数" prop="password" rules="">
                    <el-input v-model="formData.password" />
                </el-form-item>


            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                        Confirm
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


const { columns, getUsers, UsersList, currentDataList, pagination, pageSizeChange, orderSearchHandle
    , formData
    , centerDialogVisible
} = useState()

const orderId = ref()
const form = ref({
    orderId: 0
})

const goBack = () => {
    console.log('go back')
}



getUsers()


</script>

<style scoped>
/* .body {
    padding: 30px;
} */

.orderSearchItem .el-form-item__content {
    flex-wrap: nowrap
}

.orderSearchItem {
    display: flex;
    flex-wrap: nowrap;
}

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
</style>
