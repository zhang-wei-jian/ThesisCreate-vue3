<template>
    <div class="page_body">
        <el-card style="margin-bottom: 10px;">
            <el-page-header>
                <template #content>
                    <span class="text-large font-600 mr-3">系统管理/模版管理</span>
                </template>
            </el-page-header>
        </el-card>

        <el-card style="margin-bottom: 10px;">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="模版名称：">
                    <el-input v-model="params.name" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="是否可用：">
                    <!-- <el-input v-model="params.active" placeholder="请输入" clearable /> -->
                    <el-select v-model="params.active" placeholder="请选择">
                        <el-option v-for="item in activeList.list" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="background-color: #467af2;border: #467af2;" type="primary" @click="getModels">查
                        询</el-button>
                    <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                        @click="insert('add')">新增模版</el-button>

                    <!-- <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                        @click="update">完善模版</el-button> -->

                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-bottom: 10px;">
            <el-table :data="modelFrom.list" stripe style="width: 100%">
                <el-table-column min-width="200px" label="模版名称">
                    <template v-slot="scope"> {{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="模版状态" min-width="200px">
                    <template v-slot="scope">
                        <el-tag v-if="scope.row.active" class="ml-2" type="success">配置完成</el-tag>
                        <el-tag v-if="!scope.row.active" class="ml-2" type="warning">配置未完成</el-tag>
                        <!-- {{ scope.row.active ? '配置完成' : '配置未完成' }} -->
                    </template>
                </el-table-column>
                <!-- <el-table-column label="模版id">
                    <template v-slot="scope">{{ scope.row.id }}</template>
                </el-table-column> -->
                <!-- <el-table-column label="操作">
                    <el-button>删除</el-button>
                </el-table-column> -->
                <el-table-column min-width="300px" label="操作">
                    <template v-slot="scope">
                        <!-- is_active -->
                        <!-- <el-button style="background-color: #467af2;border: #467af2;" type="primary" @click="getModels">查
                        询</el-button> -->
                        <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                            v-if="scope.row.active == false" @click="setModelConfig(scope.row)">配置论文模版</el-button>
                        <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                            v-if="scope.row.active == false" @click="updateVal(scope.row)">配置开题报告</el-button>
                        <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                            v-if="scope.row.active == false" @click="updateModel(scope.row, 'upd')">修改模版</el-button>
                        <!-- delModel -->
                        <el-button type="danger" v-if="scope.row.active == false"
                            @click="deleteModels(scope.row)">删除模版</el-button>

                        <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                            @click="setUseModel(scope.row)">{{ scope.row.active ? '禁用模版' : '启用模版' }}</el-button>
                        <!-- <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                            v-if="scope.row.active == false" @click="downLoadFile(scope.row)">下载模版</el-button> -->


                    </template>
                </el-table-column>
            </el-table>
        </el-card>


        <el-dialog v-model="downloadFileOpenOrKaiti" title="Warning" width="300px" align-center>

            <!-- <template #footer> -->
            <div style="text-align: center;">
                <el-select v-model="sendLost.atype" class="m-2" placeholder="Select">
                    <el-option v-for="item in modelList.list" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div style="margin-top: 20px;">
                    <el-button @click="downloadFileOpenOrKaiti = false">Cancel</el-button>
                    <el-button type="primary" @click="sendDownLoad">
                        确定
                    </el-button>
                </div>
            </div>
            <!-- </template> -->
        </el-dialog>


        <el-dialog width="800px" show-close v-model="pageVal.isShow" :show-close="false">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h4 :id="titleId" :class="titleClass">{{ modelChangeType == 'add' ? '新增模版' : '修改模版' }}</h4>
                </div>
            </template>

            <el-form label-width="100px" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="模版名称：">
                    <el-input style="width: 229px;" v-model="formInline.name" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="一级标题：">
                    <el-select style="width: 229px;" v-model="formInline.title_1_type" placeholder="请选择" clearable>
                        <el-option label="汉字" value="汉字" />
                        <el-option label="括号" value="括号" />
                    </el-select>
                </el-form-item>
                <el-form-item label="二级标题：">
                    <el-select style="width: 229px;" v-model="formInline.title_2_type" placeholder="请选择" clearable>
                        <el-option label="默认" value="默认" />
                        <el-option label="括号" value="括号" />
                    </el-select>
                </el-form-item>
                <el-form-item label="三级标题：">
                    <el-select style="width: 229px;" v-model="formInline.title_3_type" placeholder="请选择" clearable>
                        <el-option label="默认" value="默认" />
                        <el-option label="数字" value="数字" />
                    </el-select>
                </el-form-item>
                <el-form-item label="页眉内容：">
                    <el-input style="width: 229px;" v-model="formInline.yemei" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-select style="width: 229px;" v-model="formInline.is_have_gjz" placeholder="请选择" clearable>
                        <el-option label="是" value="true" />
                        <el-option label="否" value="false" />
                    </el-select>
                </el-form-item>
                <el-form-item label="论文模版：">
                    <el-upload accept=".docx" class="upload-demo" drag :auto-upload="false"
                        :on-change="uploadtemplateFileSuccessHandle">
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            拖拽文件到这里 或者 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                （注：请上传doxc格式的文件）
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="开题报告：">
                    <el-upload accept=".docx" class="upload-demo" drag :auto-upload="false"
                        :on-change="uploaReportFileSuccessHandle">

                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">

                            拖拽文件到这里 或者 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                （注：请上传doxc格式的文件）
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button style="    margin-left: 320px;" type="primary" @click="onSubmit">添加</el-button> -->

                    <el-button
                        style="background-color: #467af2;border: #467af2; margin-left: 270px;;width: 150px;margin-top: 20px;"
                        type="primary" @click="onSubmit">添加</el-button>

                </el-form-item>
            </el-form>

        </el-dialog>

        <el-dialog show-close width="540px" v-model="pageVal.kaitiAdd" :show-close="false">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h4 :id="titleId" :class="titleClass">完善模版</h4>
                </div>
            </template>
            <!-- kaitiAdd -->

            <div v-for="item, index in openNeedVal.list" :key="index" style="text-align: center;">
                <p style="margin-top: 12px;">
                    <span style="margin-right: 20px;">
                        模块名称：<el-input style="width: 120px;" v-model="item.name"></el-input>
                    </span>

                    <span>
                        排序：<el-input style="width: 50px;" v-model="item.order"></el-input>
                    </span>


                </p>
            </div>

            <!-- <el-form label-position="right" label-width="160px" class="demo-form-inline" :model="formLabelAlign"
                v-for="item in perfectConfig">
                <el-form-item :label="[item.name != '添加' ? item.name : '']">

            </el-form> -->
            <div style="text-align: center;">

                <el-button style="background-color: #467af2;border: #467af2;margin-top: 20px;" type="primary"
                    @click="addKaiti">添加内容</el-button>
                <el-button style="background-color: #467af2;border: #467af2;margin-top: 20px;" type="primary"
                    @click="sendKaiti">提交模版</el-button>

                <!-- <el-button @click="addKaiti" style="margin-top: 20px;">添加内容</el-button> -->
            </div>
        </el-dialog>


        <el-dialog show-close width="840px" v-model="pageVal.wanshan" :show-close="false">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h4 :id="titleId" :class="titleClass">完善模版</h4>
                </div>
            </template>
            <el-form label-position="right" label-width="80px" class="demo-form-inline" :model="formLabelAlign"
                v-for="item in perfectConfig">
                <el-form-item :label="[item.name != '添加' ? item.name : '']">
                    <div v-if="item.name != '添加'" style="padding-left: 30px;">
                        <span> 排序： <el-input v-model="item.order" style="width: 50px;" /> </span>
                        <span style="margin-left: 30px;">自定义内容：<el-input v-model="item.title" style="width: 100px;" />
                        </span>
                        <span>是否启用内容： <el-radio-group v-model="item.state">
                                <el-radio :label="true">启用</el-radio>
                                <el-radio :label="false">禁用</el-radio>

                            </el-radio-group></span>
                    </div>
                    <div v-else>
                        <el-button
                            style="background-color: #467af2;border: #467af2; margin-left: 140px;;width: 150px;margin-top: 20px;"
                            type="primary" @click="confimAdd">添加</el-button>
                    </div>

                </el-form-item>
                <!-- <el-form-item label="Activity zone">
                    <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Activity form">
                    <el-input v-model="formLabelAlign.type" />
                </el-form-item> -->
            </el-form>
        </el-dialog>

    </div>
</template>

<script setup>
import { reqModules, setModelSort, addNewModel, getSuperModel, setOpenModel, ChangeModelState, delModel, downLoadFiles } from '@/api/modelConfig'
import { ref, reactive } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'



// name。 title_1_type  title_2_type  title_3_type  yemei  is_have_gjz lunwen_file report_file
const formInline = reactive({
    name: '',
    title_1_type: '',
    title_2_type: '',
    title_3_type: '',
    yemei: '',
    is_have_gjz: '',
    lunwen_file: '',
    report_file: '',
    id: ''
})

const deleteModelById = async (e) => {
    const callVal = await delModel({ model_id: e })
    getModels();
}

const downloadFileOpenOrKaiti = ref(false)

const deleteModels = (e) => {
    console.log("删除模版！", e);
    ElMessageBox.confirm(
        '模版被删除后，无法恢复！请确认是否删除！',
        '注意',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteModelById(e.id)
            ElMessage({
                type: 'success',
                message: '删除成功！',
            })
        })
        .catch(() => {
            getModels();

            ElMessage({
                type: 'info',
                message: '以取消删除！',
            })
        })
}

const updateVal = (e) => {
    console.log("e ==> ", e);
    pageVal.kaitiAdd = true;
    openNeedVal.id = e.id;
}

const downLoadFile = (e) => {
    console.log(e);
    // downLoadFiles
    sendLost.model_id = e.id
    downloadFileOpenOrKaiti.value = true;
    console.log("sendLost ==> ", sendLost);
}

const sendDownLoad = async () => {
    const call = await downLoadFiles({ model_id: sendLost.model_id, atype: sendLost.atype });
    console.log("call ===> ", call);
    var elink = document.createElement('a');
    elink.download = '导出表格.docx';
    elink.style.display = 'none';
    var blob = new Blob([call], { type: 'application/x-msdownload' });
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
}

const modelList = reactive({
    list: [
        {
            value: 'ZHUMOBAN',
            label: '论文模版',
        },
        {
            value: 'KAITIBAOGAO',
            label: '开题模版',
        },
    ]
})

const perfectConfig = reactive([
    {
        name: '头部',
        title: '无',
        order: '1',
        model_id: '',
        state: true,
    },
    {
        name: '目录',
        title: '无',
        order: '2',
        model_id: '',
        state: true,

    },
    {
        name: '中文摘要',
        title: '无',
        order: '3',
        model_id: '',
        state: true,

    },
    {
        name: '英文摘要',
        title: '无',
        order: '4',
        model_id: '',
        state: true,

    },
    {
        name: '内容',
        title: '无',
        order: '5',
        model_id: '',
        state: true,

    },
    {
        name: '结论',
        title: '无',
        order: '6',
        model_id: '',
        state: true,

    },
    {
        name: '参考文献',
        title: '无',
        order: '7',
        model_id: '',
        state: true,

    },
    {
        name: '致谢',
        title: '无',
        order: '8',
        model_id: '',
        state: true,

    },
    {
        name: '添加',
        title: '',
        order: '',
        model_id: '',
        state: true,

    }
])

const openNeedVal = reactive({
    list: [{
        name: '',
        order: '',
        article_id: ''
    }],
    id: ''
})

const sendLost = reactive({
    model_id: '',
    atype: ''
})

const addKaiti = () => {
    openNeedVal.list.push({
        name: '', order: '', article_id: ''
    })
}

// const updateModel = async (e)=>{
//     let call = await filterArray()
// }


const modelChage = reactive({
    active: '',
    model_id: ''
})

const setUseModel = async (e) => {
    console.log("e ==> ", e);
    // return 
    const state = !e.active;
    const call = await ChangeModelState({ active: state, model_id: e.id });
    console.log("call ==> ", call);
    getModels();
}

const sendKaiti = () => {
    console.log("openNeedVal.id ==> ", openNeedVal.id);
    console.log("是否进入方法");
    let middleArr = [];
    console.log("openNeedVal ==> ", openNeedVal);
    for (let j = 0; j < openNeedVal.list.length; j++) {
        openNeedVal.list[j].article_id = openNeedVal.id;
        // console.log(" openNeedVal.list[i].article_id ===> ",);
        middleArr.push(openNeedVal.list[j].order)
    }
    console.log("middleArr ==> ", middleArr);
    const sarr = middleArr.sort();
    for (let i = 0; i < sarr.length; i++) {
        if (sarr[i] == sarr[i + 1]) {
            return ElMessage.error("排序不能存在相同值：" + sarr[i])
        }
    }
    // console.log(" openNeedVal.list ==> ", openNeedVal.list);
    sendKaitPromise();
}

const sendKaitPromise = async () => {
    let middleArr = [];
    for (let i = 0; i < openNeedVal.list.length; i++) {
        middleArr.push(setOpenModel({ name: openNeedVal.list[i].name, order: openNeedVal.list[i].order, article_id: openNeedVal.list[i].article_id }))
    }
    let datas = await Promise.all(middleArr)

}



const modelFrom = reactive({
    list: []
})

const pageVal = reactive({
    isShow: false,
    wanshan: false,
    kaitiAdd: false,
})

const setModelConfig = (e) => {
    console.log("e ==> ", e);
    update();
    for (let i = 0; i < perfectConfig.length; i++) {
        perfectConfig[i].model_id = e.id
    }
    console.log("perfectConfig ==> ", perfectConfig);
}

const confimAdd = () => {
    let middleArr = [];
    for (let j = 0; j < perfectConfig.length - 1; j++) {
        middleArr.push(perfectConfig[j].order)
    }
    console.log("middleArr ==> ", middleArr);
    const sarr = middleArr.sort();
    for (let i = 0; i < sarr.length; i++) {
        if (sarr[i] == sarr[i + 1]) {
            return ElMessage.error("排序不能存在相同值：" + sarr[i])
        }
    }
    filterArray();
}

const filterArray = async () => {
    let middleArr = [];
    for (let i = 0; i < perfectConfig.length - 1; i++) {
        if (perfectConfig[i].state) {
            console.log("进入判断的有：", perfectConfig[i]);
            let callVal = setModelSort({ name: perfectConfig[i].name, title: perfectConfig[i].title, order: perfectConfig[i].order, model_id: perfectConfig[i].model_id });
            middleArr.push(callVal);
        }
    }

    let datas = await Promise.all(middleArr)
    console.log("datas ===> ", datas);
    ElMessage.success("修改成功！")

    getModels();
}


const modelName = ref();

const update = () => {
    pageVal.wanshan = true;
}


const select = () => {
    console.log("查询按钮！");
}

const insert = (e) => {
    console.log("新增按钮！");
    pageVal.isShow = true;
    modelChangeType.value = e

}



// setOpenModel
const onSubmit = async () => {
    if (modelChangeType.value == 'add') {
        console.log("第二个判断");

        const msg = await addNewModel({ ...formInline });
        console.log("msg ==> ", msg);
        if (msg.detail == 'ok') {
            ElMessage.success("操作成功！")
        }
    } else {
        // let call = { ...formInline }
        // call.id = updateId.value
        console.log("第二个判断");
        console.log("updateId.value ===> ", updateId.value);
        formInline.id = updateId.value
        // console.log(" formInline ===> ", formInline);
        // return 
        const msg = await addNewModel({ ...formInline });
        if (msg.detail == 'ok') {
            ElMessage.success("操作成功！")
        }
    }
    // console.log('submit!')

}
const updateId = ref('');

const modelChangeType = ref('');


const updateModel = async (e, type) => {
    console.log("e ====> ", e);
    updateId.value = e.id;
    console.log(" updateId.value  ===> ", updateId.value);
    modelChangeType.value = type
    pageVal.isShow = true;

    // console.log("updateId.value ==> ",updateId.value);
    // formInline.id = e.id
    // const msg = await addNewModel({ ...formInline });

    // console.log("msg ==> ",msg);

}

const activeList = reactive({
    list: [{
        val: '全部',
        key: ''
    },
    {
        val: '完成',
        key: true
    }, {
        val: '未完成',
        key: false
    },
    ]
})

const params = reactive({
    name: '',
    active: ''
})

const getModels = async () => {
    console.log("params.active ==> ", params.active);
    const callVal = await getSuperModel({ name: params.name, active: params.active });
    console.log("callVal ===> ", callVal);
    modelFrom.list = callVal
}

getModels();



const uploadtemplateFileSuccessHandle = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles, '上传成功');
    formInline.lunwen_file = uploadFile.raw
    // lunwen_file: '',
    // report_file: '',
}
const uploaReportFileSuccessHandle = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles, '上传成功');
    formInline.report_file = uploadFile.raw
}




</script>

<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>

