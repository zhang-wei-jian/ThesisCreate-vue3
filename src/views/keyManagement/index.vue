<template>
    <div class="page_body">

        <el-card style="margin-bottom: 10px;">
            <el-page-header>
                <template #content>
                    <span class="text-large font-600 mr-3">系统管理/密钥管理 </span>
                </template>
            </el-page-header>
        </el-card>
        <el-card style="margin-bottom: 10px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="密钥金额：">
                    <el-input v-model="paramsConfig.money" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="使用状态：">
                    <el-select v-model="paramsConfig.used" placeholder="请选择" clearable>
                        <el-option label="未使用" value="false" />
                        <el-option label="已使用" value="true" />
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="Activity time">
                    <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
                </el-form-item> -->
                <el-form-item>

                    <el-button style="background-color: #467af2;border: #467af2;" type="primary" @click="getCardNum">查
                        询</el-button>
                    <el-button style="background-color: #467af2;border: #467af2;" type="primary" @click="openDiglog">新
                        增</el-button>

                    <!-- <el-button type="primary" @click="getCardNum">查询</el-button> -->
                    <!-- <el-button type="primary" @click="openDiglog">新增</el-button> -->
                    <!-- delSigoWord -->
                    <el-button type="danger" @click="delSigoWord">删除失效密钥</el-button>

                    <!-- onSubmit -->

                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-bottom: 10px;">

            <el-table  height="550" :data="tableData.list" stripe style="width: 100%">
                <el-table-column label="金额">
                    <template v-slot="scope">{{ scope.row.money }}</template>
                </el-table-column>
                <el-table-column label="卡密">
                    <template v-slot="scope">{{ scope.row.mstr }}</template>
                </el-table-column>
                <el-table-column label="状态">
                    <template v-slot="scope">{{ scope.row.used ? '已使用' : '未使用' }}</template>
                </el-table-column>
                <el-table-column label="生成时间">
                    <template v-slot="scope">{{ getParamsTime(scope.row.create_time, 'nyrsfm', true) }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button  style="background-color: #467af2;border: #467af2;" type="primary" @click="copyKey(scope.row)">复制卡密</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="生成卡密" width="500px" :before-close="handleClose">
            <div style="text-align: center;">
                <p>
                    数量：<el-input style="width: 200px;" v-model="fromParams.num" placeholder="请输入要生成的数量" />
                </p>
                <p style="margin-top: 20px;">
                    金额：<el-input style="width: 200px;" v-model="fromParams.money" placeholder="请输入金额" />
                </p>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelBtn">取消</el-button>
                    <el-button type="primary" @click="configmCard">
                        确认
                    </el-button>
                </span>
            </template>

        </el-dialog>

    </div>
</template>

<script setup>

import { ref, reactive } from 'vue'

import { makeCardword, getCardword, setCardPwd, delCardWord } from '@/api/systemConfig'
import { getParamsTime } from '@/utils/formatData'

// import { async } from '@antv/x6/lib/registry/marker/async';
import { ElMessage } from 'element-plus';

const formInline = reactive({
    num: '',
    region: '',
    date: '',
})
const tableData = reactive({
    list: []
})

const fromParams = reactive({
    num: '',
    money: ''
})

const paramsConfig = reactive({
    money: '',
    used: ''
})

const copyKey = (e) => {
    let copyValue = document.createElement("input");
    let copyUrl = e.mstr;
    copyValue.value = copyUrl;
    document.body.appendChild(copyValue);
    copyValue.select();
    document.execCommand("Copy");
    ElMessage.success("复制成功！")
}

const getCardNum = async () => {
    const res = await getCardword({ money: paramsConfig.money, used: paramsConfig.used })
    console.log("list ==> ", res);
    tableData.list = res;
}

const delSigoWord = async () => {
    const call = await delCardWord();
    console.log("del.call ==> ", call);
    if (call.detail == 'ok') {
        ElMessage.success("删除成功！")
        getCardNum();
    } else {
        ElMessage.error(call.detail)
    }
}

const dialogVisible = ref(false)

const openDiglog = () => {
    dialogVisible.value = true;
}

const from = reactive({
    limit: 20,
    offset: 2
})

const configmCard = async () => {
    let call = await setCardPwd({ num: fromParams.num, money: fromParams.money });
    console.log("configmCard ==> ", call);
    if(call.length>0){
        ElMessage.success("新增成功！")
    }
    dialogVisible.value = false;

}



const onSubmit = async () => {
    const res = await makeCardword({ num: formInline.num });
    console.log("res ==> ", res);
}

const cancelBtn = () => {
    dialogVisible.value = false;
}

getCardNum();

</script>
