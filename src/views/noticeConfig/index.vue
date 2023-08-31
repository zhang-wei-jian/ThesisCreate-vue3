<template>
    <div class="page_body">
        <el-card style="margin-bottom: 10px;">
            <el-page-header>
                <template #content>
                    <span class="text-large font-600 mr-3">系统管理/公告管理</span>
                </template>
            </el-page-header>
        </el-card>

        <el-card style="margin-bottom: 10px;">

            <el-form :inline="true" class="demo-form-inline">
                <!-- <el-form-item label="模版名称：">
                    <el-input v-model="modelName" placeholder="请输入" clearable />
                </el-form-item> -->
                <el-form-item>
                    <el-button style="background-color: #467af2;border: #467af2;" type="primary" @click="openDialog">
                        新 增
                    </el-button>
                    <!-- <el-button style="background-color: #467af2;border: #467af2;" type="primary" @click="delNotices">删
                        除</el-button> -->

                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-bottom: 10px;">
            <!-- @selection-change="checkVal" -->
            <el-table height="550" :data="modelFrom.list" stripe style="width: 100%">
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column min-width="300px" label="文本内容">
                    <template v-slot="scope">{{ scope.row.content }}</template>
                </el-table-column>
                <el-table-column label="创建时间">
                    <template v-slot="scope">{{ getParamsTime(scope.row.create_time,'nyrsfm',true) }}</template>
                </el-table-column>
                <el-table-column v-slot="scope" label="操作">
                    <el-button   type="danger"  @click="delNotices(scope.row)">删除</el-button>
                </el-table-column>
            </el-table>
        </el-card>


        <el-dialog width="700px" show-close v-model="addNewNotice" :show-close="false">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h4 :id="titleId" :class="titleClass">新增公告</h4>
                </div>
            </template>

            <el-form label-width="100px" class="demo-form-inline">
                <el-form-item label="公告文本：">
                    <!-- <el-input style="width: 229px;" v-model="modelFrom.content" placeholder="请输入" clearable /> -->
                    <el-input style="width: 529px;" v-model="modelFrom.content" :rows="5" type="textarea"
                        placeholder="请输入文本" />
                </el-form-item>

                <el-form-item>
                    <el-button
                        style="background-color: #467af2;border: #467af2;width: 150px;margin-top: 10px;margin-left: 140px;"
                        type="primary" @click="inserts">添加</el-button>

                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script setup>
import { noticeList, addNotice, delNotice } from '@/api/noticeConfig'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';

import {  getParamsTime } from '@/utils/formatData'

const modelFrom = reactive({

    list: [],

    content: '',

    id_list: ''

})

const addNewNotice = ref(false)

const openDialog = () => {
    addNewNotice.value = true;
}

const checkVal = (e) => {
    modelFrom.id_list = e.id
    // modelFrom.id_list = [];
    // console.log("e ==> ", e);
    // for (let i = 0; i < e.length; i++) {
    //     modelFrom.id_list.push(e[i].id)
    // }
}

const delNotices = async (e) =>{
    const val  = await delNotice({id_list:e.id});
    console.log("返回的数据是：",val);
    getList();
    ElMessage.success('删除成功！')
}

const inserts = async () => {
    const msg = await addNotice({ content: modelFrom.content });
    // if (msg.detail == 'ok') {
    ElMessage.success('新增成功！')
    getList();
    modelFrom.content = "";
    addNewNotice.value = false;
    // } else {
    //     ElMessage.error(msg.detail)
    //     getList();
    // }
}

const getList = async () => {
    const list = await noticeList();
    console.log("list ==> ", list);
    modelFrom.list = list;
}


getList();

</script>

<style scoped></style>

