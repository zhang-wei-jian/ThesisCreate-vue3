<template>
    <div id="content">

        <p class="min_title"> <span>1、输入标题</span> </p>
        <div class="contentSearch">
            <!-- <el-select style="width: 150px;" filterable v-model="form.action" placeholder="毕业论文">
                <el-option v-for="item in paperRed" :key="item.value" :label="item.label" :value="item.value" />
            </el-select> -->
            <el-input v-model="form.subject" placeholder="输入论文标题，5-20字效果最佳" style="margin-left: 17px;width: 300px;" />
        </div>

        <p class="min_title" style="margin-top: 20px;"> <span>2、选择模版</span> </p>
        <div class="contentSearch">
            <el-select style="width: 150px;" filterable v-model="form.model_id" placeholder="选择模版">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <span class="queisonFont" style="width: 300px;margin:5px">没找到想要的模版？联系客服帮您添加！</span>
        </div>

        <div class="contentSearch">
            <!-- 免责条款 -->
            <div style="height: 14px;">
                <span style="line-height: 14px;display: flex;align-items: center;margin-right: 10px;margin-top: 10px;">
                    <el-checkbox v-model="agrent" style="margin-right: 3px;" size="large" />
                    <span style="font-size: 14px;color: #467af2;">
                        我确认并同意：生成的论文范文仅供参考之用，不得用于毕业或发表。
                    </span>
                </span>
                <!-- <span style="font-size: 14px;line-height: 20px;">我确认并同意：生成的论文范文仅供参考之用，不得用于毕业或发表。
                    <el-popover placement="top" title="免责声明" :width="700" trigger="click"
                        :content="modeAgren">
                        <template #reference>
                            《免责条款》
                        </template>
                    </el-popover></span> -->
            </div>
        </div>
        <!-- <div class="mb-2 flex items-center text-sm">
           
        </div> -->
        <div class="button" style="margin:5px">
            <el-button v-if="isLoding" loading style="background-color: #467af2;border: #467af2;" type="primary"
                @click="typeOrFalse">生成中...</el-button>

            <el-button v-else style="background-color: #467af2;border: #467af2;" type="primary"
                @click="typeOrFalse">立刻生成</el-button>
            <el-button @click="routerTo()" style="color: black;background-color: #eff4ff;">查询结果</el-button>
        </div>


        <!-- <el-dialog v-model="centerDialogVisible" @close="close" :title="dialogTitle" width="30%" center> -->
        <el-dialog :close-on-click-modal="false" v-model="centerDialogVisible" @close="close" :title="dialogTitle"
            width="762px" center>
            <div v-if="downFileUrl === ''">
                <el-card style="margin-bottom: 15px;">
                    <p> 提示：自定义文章字数最多800字！
                    </p>
                </el-card>
                <el-card>
                    <!-- <el-input v-for="item of muluList" v-model="item.head_txt" placeholder="Please input" /> -->
                    <el-tree :data="dataSource" node-key="id" default-expand-all :expand-on-click-node="false">
                        <template #default="{ node, data }">
                            <span class="custom-tree-node">
                                <!-- {{ data.head_txt }} -->
                                <!-- <span>{{ node.head_txt }}</span> -->
                                <el-input style="width: 200px;" v-model="data.head_txt" placeholder="请输入" size="small" />
                            </span>
                            <el-button style="margin-left: 20px;" @click="addBorthenHandle(data)" size="small">
                                添加同级</el-button>
                            <el-button @click="addChilrenHandle(data)" size="small"> 添加子级</el-button>
                            <el-button @click="deleteItemHandle(data, node)" type="danger" size="small">删除</el-button>

                            <span v-if="data.start || data.start === 0 || data.start === ''" style="margin-left: 10px;">
                                <el-input style="margin-bottom: 3px;width: 50px;margin-left: 10px;" v-model="data.start"
                                    placeholder="请输入" size="small" /> - <el-input style="width: 50px;margin-bottom: 3px;"
                                    v-model="data.end" placeholder="请输入" size="small" /></span>

                            <!-- <el-form-item label=" start：" v-if="data.start || data.start === 0 || data.start === ''"
                                class="sum">
                                <el-input style="margin-top: 10px;" v-model="data.start" placeholder="Please input" size="small" />
                            </el-form-item>
                            <el-form-item label=" end： " v-if="data.end || data.end === 0 || data.end === ''" class="sum">
                                <el-input v-model="data.end" placeholder="Please input" size="small" />
                            </el-form-item> -->
                        </template>
                    </el-tree>
                </el-card>




                <!-- <el-row>
                    <el-col :span="24" style="text-align: center;">
                        生成成功，是否立即支付？ <a :href="resForm.pay_url" target="_blank">去支付</a>
                    </el-col>
                </el-row> -->
                <el-row>
                    <el-col :span="24" style="text-align: center;margin-top: 20px;">
                        <span style="color: black;font-weight: bold;">
                            订单：{{ resForm.order_id }}<el-button style="background-color: #467af2;border: #467af2;"
                                type="primary" size="small" @click="copyOrderId">复制</el-button>
                        </span>
                        <p style="font-weight: bold;color: red;margin: 7px;">
                            请牢记订单编号！订单编号即是相应付款记录中的订单编号，如果是系统用户，请到系统中查询。如有疑问，请联系客服！</p>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center;">
                        付款完成将自动跳转
                    </el-col>
                </el-row>
                <!-- <el-button type="text" @click="testHandle">调试一键成功</el-button> -->
                <p class="min_title" style="margin-top: 20px;text-align: center;"> <span>付款方式</span> </p>
                <div class="contentSearchP">
                    <!-- <label style="width: 160px;font-size: 15px;">请选择支付方式</label> -->
                    <el-radio-group style="width: 490px;margin-left: 14px;" v-model="payForTwoChooseOne"
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
                <canvas style="margin-left: 39%;" v-show="payForTwoChooseOne !== 'money'" ref="qrCodeRef"
                    id="canvas"></canvas>
                <p style="margin-left: 80px;">
                    <el-button v-if="payForTwoChooseOne === 'money'"
                        style="background-color: #467af2;border: #467af2;margin-bottom: 14px;margin-left: 35%;"
                        type="primary" @click="moneyPlayHandle">
                        使用余额支付</el-button>
                </p>
            </div>

            <div v-else-if="downFileUrl === 'loading'" style="text-align: center;">
                <!-- loading...请耐心等待 -->
                支付成功，系统处理中...
            </div>
            <div v-else>

                <el-row>
                    <el-col :span="24" style="text-align: center;">
                        订单：{{ resForm.order_id }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center;">
                        <!-- 生成成功请下载 -->
                        文件生成成功！请在当前页面点击下载或是前往查询结果中，依据订单号查询！
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center;margin-top: 10px;">
                        <el-tooltip class="box-item" effect="dark" :content="downFileUrl" placement="top-start">
                            <a :href="downFileUrl"> <el-button
                                    style="background-color: #467af2;border: #467af2;width: 150px;" type="primary">
                                    下载</el-button></a>

                        </el-tooltip>

                    </el-col>
                </el-row>
            </div>
            <!-- <canvas ref="qrCodeRef" id="canvas"></canvas> -->

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <!-- <el-button type="primary" @click="centerDialogVisible = false">
                        确定
                    </el-button> -->
                    <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                        @click="centerDialogVisible = false">
                        确定</el-button>
                </span>
            </template>

        </el-dialog>
        <!-- <iframe :src="resForm.pay_url"></iframe> -->
        <!-- <img ref="qrCodeRef" src="https://www.runoob.com/html/html-tutorial.html" alt=""> -->
        <!-- <canvas ref="qrCodeRef" id="canvas"></canvas> -->



        <!-- 判断支付方式 -->
        <el-dialog v-model="payForWhat" title="Warning" width="30%" center>
            <span>

            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- <el-card>
            <el-tree :data="dataSource" node-key="id" default-expand-all :expand-on-click-node="false">
                <template #default="{ node, data }">
                    <span class="custom-tree-node">
      
                        <el-input v-model="data.head_txt" placeholder="Please input" size="small" />
                    </span>

                    <el-button @click="addBorthenHandle(data)" size="small"> 添加同级</el-button>
                    <el-button @click="addChilrenHandle(data)" size="small"> 添加子级</el-button>
                    <el-button @click="deleteItemHandle(data, node)" type="danger" size="small">删除</el-button>
                </template>
            </el-tree>
        </el-card> -->

        <!-- <el-button @click="testHandle">ttts</el-button> -->
    </div>
</template>

<script  setup>
import { reactive, ref, nextTick, toRefs } from "vue"
// import { reBornPaper } from "../../../api/paperReBorn";
import { ElMessage } from 'element-plus'
import { reqModules, reqAliPay, reqWeChatPay, reqCheckOrderIsPlay, reqGenArticle, reqPayForBalance } from "@/api/NormalCreate"
import { reqGenToc, reqto2Docx } from "@/api/CustomCatalog"
import { useUserStore } from '@/store/user.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';


const userStore = useUserStore()
const { user, removeUserStore } = storeToRefs(userStore)


const { username, password } = toRefs(userStore.user)


import QRCode from 'qrcode';

const router = useRouter();

const routerTo = () => {
    console.log("页面跳转");
    router.push('/QueryResults');
}

// import {}
// action
const muluList = ref([])

const payForWhat = ref(false)

const copyOrderId = () => {
    let copyValue = document.createElement("input");
    let copyUrl = resForm.order_id;
    copyValue.value = copyUrl;
    document.body.appendChild(copyValue);
    copyValue.select();
    document.execCommand("Copy");
    ElMessage.success("复制成功！")
}

const payForTwoChooseOne = ref('wx');
const playTypeChange = (value) => {
    console.log(isPlayTimeLoop);

    isPlayTimeLoop && clearInterval(isPlayTimeLoop)
    isPlayTimeLoop = null
    console.log(value);

    if (value === 'wx') {
        ReBornPapers(reqWeChatPay)
    } else if (value === 'ali') {
        ReBornPapers(reqAliPay)

        // ReBornPapers(reqAliPay)

    } else if (value === 'money') {
        // ReBornPapers(reqPayForBalance)
    }

}

const agrent = ref(false);
const dataSource = ref([])


const modeAgren = ref('1.本服务采用人工智能（AI）技术生成论文，旨在提供学术研究和参考，以及帮助用户进行科学探索。使用者应理解AI生成论文的局限性，不代表人类作者的思想和观点。2.虽然我们努力确保AI生成论文的质量和准确性，但由于AI技术的特殊性，论文中可能存在错误、不完整或不准确的信息。使用者在使用论文内容时需自行承担风险。3.使用者应对AI生成论文内容的合法性和适用性进行评估，并在必要时进行进一步的验证和修订。本服务不对因使用论文内容而导致的任何后果负责。4.AI生成论文可能基于已有的学术文献和数据进行创作，使用者需遵守相关的引用规范和版权法律，确保合理使用和尊重知识产权。5.本服务提供的AI生成论文仅供个人学术研究和非商业用途。任何未经授权的商业使用行为，包括但不限于出售、转让或用于盈利目的，均被视为违规行为。6.使用者不得将AI生成论文用于任何非法、违反道德伦理或损害他人利益的行为。一切因使用者行为引起的法律责任由使用者自行承担，与本服务无关。7.本服务保留随时修改或终止AI生成论文免责条款的权利。使用者在每次使用本服务时应查阅最新版本的免责条款，以了解条款的更新情况。8.使用者在使用AI生成论文服务前必须同意本免责条款。使用本服务即视为使用者已阅读、理解并同意遵守本条款的所有内容。');

const paperRed = ref([
    {
        key: 1,
        label: '生成论文',
        value: '1'
    },
    {
        key: 2,
        label: '生成可修改目录的论文',
        value: '2'
    },
    {
        key: 3,
        label: '生成开题报告',
        value: '3'
    },
    {
        key: 4,
        label: '去重',
        value: '4'
    },
    {
        key: 5,
        label: '手动去重',
        value: '5'
    },
])
const qrCodeRef = ref()
// 模版
const schoolList = ref([
    {
        id: 0,
        name: '等待请求',
        value: 0
    },
    // {
    //     id: 1,
    //     name: '华北工业大学',
    //     value: 2
    // }, {
    //     id: 2,
    //     name: '华南商业大学',
    //     value: 4
    // }, {
    //     id: 3,
    //     name: '华东建设大学',
    //     value: '113'
    // }, {
    //     id: 4,
    //     name: '华西农业大学',
    //     value: '114'
    // }, {
    //     id: 5,
    //     name: '华中军事大学',
    //     value: '115'
    // }, {
    //     id: 6,
    //     name: '东北科技大学',
    //     value: '116'
    // },
])

const getModules = async () => {
    const res = await reqModules()
    console.log(res, "resss");
    schoolList.value = res
    console.log(schoolList.value, "schoolList");


}
const centerDialogVisible = ref(false)
getModules()
// const setGPT = async () => {
//     loading.value = true;
//     let question = textarea.value
//     const asd = await reqDiyDropWeight(question);
//     console.log("res ===> ".asd);
//     text.value = asd.answer
//     setTimeout(() => {
//         loading.value = false;
//     }, 3000)
// }

const dialogTitle = ref('等待生成')
const form = reactive({
    // type: '毕业论文',
    // title: '',
    model_id: '',
    // textVal: '',
    "subject": '',
    "return_url": 'https://scpic.chinaz.net/Files/pic/pic9/201812/zzpic15903.jpg',
    "amount": '68',
    "action": '2',
})
const resForm = reactive({
    "order_id": '',
    "pay_url": '',

})
const status = ref(false)
let isPlayTimeLoop = null
const isLoding = ref(false);
const downFileUrl = ref('')


const typeOrFalse = async () => {
    if (form.subject === '') {
        ElMessage.error('请填写论文标题！')
        return
    } else if (!agrent.value) {
        ElMessage.error('请确认条款')
        return
    }



    const obj = {
        "model_id": form.model_id,
        "title": form.subject,
        "order_id": resForm.order_id
    }

    isLoding.value = true
    console.log(obj, "sunbmit");


    const res = await reqGenToc(obj)
    // const res = sb
    // dataSource.value = res
    dataSource.value = convertToTree(res)




    ReBornPapers(reqWeChatPay)


    // console.log(convertToTreeData(res), "sss");
    // dataSource.value = convertToTreeData(res)






    // console.log(convertToOriginalData(dataSource.value));


}


const ReBornPapers = async (playFn) => {

    clearInterval(isPlayTimeLoop)
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

        cretateQrcode()
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


                await getGenArticle()



            }
        }, 1000);

    })




}


const close = () => {
    downFileUrl.value = ''
    clearInterval(isPlayTimeLoop)

    isPlayTimeLoop = null


}
// 获取文章下载
const getGenArticle = async () => {

    // downFileUrl.value = 'loading'
    // dialogTitle.value = '正在生成文章'

    // const obj = {
    //     "model_id": form.model_id,
    //     "title": form.subject,
    //     "order_id": resForm.order_id

    // }
    // try {
    //     const res = await reqGenArticle(obj)
    //     // downFileUrl.value = res.url
    //     downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}${res.url}`
    //     ElMessage.success('生成成功')
    //     dialogTitle.value = '生成成功'

    // } catch (error) {
    //     elMessage.error('服务器响应生成失败')
    // }
    downFileUrl.value = 'loading'
    dialogTitle.value = '正在生成文章'


    const resultJSON = convertToFlat(dataSource.value)
    const obj = {
        "mulu": JSON.stringify(resultJSON),
        "title": form.subject,
        "order_id": resForm.order_id,
        "model_id": form.model_id
    }
    try {
        const res = await reqto2Docx(obj)
        // downFileUrl.value = res.url
        downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}${res.url}`
        ElMessage.success('生成成功')
        dialogTitle.value = '生成成功'

    } catch (error) {
        ElMessageBox.alert('请求失败，请联系客服，订单为' + resForm.order_id, '请求错误', {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: 'OK',
            callback: (action) => {
                // ElMessage({
                //     type: 'info',
                //     message: `action: ${action}`,
                // })
            },
        })
        centerDialogVisible.value = false;
    }

}

const testHandle = async () => {
    // resForm.order_id = '20230805112650761202753547'
    // resForm.order_id = '20230805151254629014369783'
    // getGenArticle()

    // ReBornPapers(reqAliPay)
    // reqAliPay
    // reqPayForBalance
    console.log(sb, "yuanlai");

    dataSource.value = convertToTree(sb)
    console.log(convertToTree(sb));

    console.log("huiqu", convertToFlat(dataSource.value));


    const resultJSON = convertToFlat(dataSource.value)
    const obj = {
        "mulu": JSON.stringify(resultJSON),
        "title": form.subject,
        "order_id": resForm.order_id,
        "model_id": '2'
    }

    const res = await reqto2Docx(obj)
}

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







// 处理为tree

function convertToTree(data) {
    const treeData = [];
    const stack = [];

    for (const item of data) {
        const node = { ...item, children: [] };

        while (stack.length > 0 && stack[stack.length - 1].head_level >= node.head_level) {
            stack.pop();
        }

        if (stack.length > 0) {
            stack[stack.length - 1].children.push(node);
        } else {
            treeData.push(node);
        }

        stack.push(node);
    }

    return treeData;
}

// 处理为后端JSON
const convertToFlat = (treeData) => {
    const flatData = [];

    const traverse = (node) => {
        const { children, ...rest } = node;
        flatData.push(rest);

        if (children) {
            children.forEach(traverse);
        }
    };

    treeData.forEach(traverse);
    return flatData;
};

// 假设这是ElementPlus的tree组件数据
const treeData = [
    // ... 请将ElementPlus的tree组件数据复制到这里
];


const sb = [
    {
        "head_level": 1,
        "need_txt": false,
        "head_txt": "新能源汽车的概述"
    },
    {
        "head_level": 2,
        "need_txt": true,
        "head_txt": "新能源汽车的定义"
    },
    {
        "head_level": 2,
        "need_txt": false,
        "head_txt": "新能源汽车的分类"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "纯电动汽车"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "混合动力汽车"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "燃料电池汽车"
    },
    {
        "head_level": 1,
        "need_txt": false,
        "head_txt": "新能源汽车的发展历程"
    },
    {
        "head_level": 2,
        "need_txt": true,
        "head_txt": "新能源汽车的起源"
    },
    {
        "head_level": 2,
        "need_txt": false,
        "head_txt": "新能源汽车的发展阶段"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "初级阶段"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "中级阶段"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "成熟阶段"
    },
    {
        "head_level": 1,
        "need_txt": false,
        "head_txt": "新能源汽车的优势与挑战"
    },
    {
        "head_level": 2,
        "need_txt": false,
        "head_txt": "优势"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "环保与减排"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "节能与资源优化"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "技术创新与发展"
    },
    {
        "head_level": 2,
        "need_txt": false,
        "head_txt": "挑战"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "充电设施建设"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "电池技术与续航里程"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "价格与成本"
    },
    {
        "head_level": 1,
        "need_txt": false,
        "head_txt": "新能源汽车的政策支持"
    },
    {
        "head_level": 2,
        "need_txt": false,
        "head_txt": "国家层面政策"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "补贴政策"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "税收优惠政策"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "配套措施"
    },
    {
        "head_level": 3,
        "need_txt": true,
        "head_txt": "配套a措施"
    }
]

const tree = [
    {
        "head_level": 1,
        "need_txt": false,
        "head_txt": "新能源汽车的概述",
        children: [
            {
                "head_level": 2,
                "need_txt": true,
                "head_txt": "新能源汽车的定义"
            },
            {
                "head_level": 2,
                "need_txt": false,
                "head_txt": "新能源汽车的分类",
                children: [
                    {
                        "head_level": 3,
                        "need_txt": true,
                        "head_txt": "纯电动汽车"
                    },
                    {
                        "head_level": 3,
                        "need_txt": true,
                        "head_txt": "混合动力汽车"
                    },
                    {
                        "head_level": 3,
                        "need_txt": true,
                        "head_txt": "燃料电池汽车"
                    },
                ]
            }
        ]
    },
]




// <el-button @click="addBorthenHandle"> 添加同级</el-button>
//                     <el-button @click="addChilrenHandle"> 添加子级</el-button>
//                     <el-button @click="deleteItemHandle" type="danger">删除</el-button>


const addBorthenHandle = (data) => {

    findAndAddNode(dataSource.value, data)

}

const addChilrenHandle = (data) => {
    console.log(data);


    findAndAddChilrenNode(dataSource.value, data)

}
const deleteItemHandle = (data, node) => {

    // console.log(data, node);
    findAndRemoveNode(dataSource.value, data)

    // console.log(dataSource.value, data);

}


const findAndRemoveNode = (dataSource, data) => {


    dataSource.forEach((item, index) => {
        // console.log(item, "找到了");

        if (data === item) {
            console.log(item, "找到了");

            dataSource.splice(index, 1);
            return true; // Node found and removed
        }


        if (item.children) {
            if (findAndRemoveNode(item.children, data)) {
                // return true; // Node found and removed
            }
        }


    })
}
const findAndAddNode = (dataSource, data) => {


    dataSource.forEach((item, index) => {
        // console.log(item, "找到了");

        if (data === item) {
            // console.log(item, "找到了");
            const obj = {}
            obj.head_level = item.head_level
            obj.head_txt = "xxxxx"

            if (Number(item.head_level) !== 1) {
                obj.need_txt = true
                obj.start = '0'
                obj.end = '0'
            } else {
                obj.need_txt = false

            }


            // dataSource.push({
            //     // "head_level": item.head_level,
            //     // "need_txt": false,
            //     // "head_txt": "xxxxx",

            // })
            dataSource.push(obj)



            return true; // Node found and removed
        }



        if (item.children) {
            if (findAndAddNode(item.children, data)) {
                // return true; // Node found and removed
            }
        }


    })
}
const findAndAddChilrenNode = (dataSource, data) => {


    dataSource.forEach((item, index) => {
        // console.log(item, "找到了");

        if (data === item) {
            console.log(item, "找到了");

            const muluItem = {

                // "head_level": item.head_level + 1,
                "head_level": Number(item.head_level) + 1,
                "need_txt": true,

                "head_txt": "xxxxx",
                "start": "0",
                "end": "0"


            }

            console.log("添加的chilren是", muluItem);


            if (data.children) {
                data.children.push(muluItem)
            } else {
                data.children = []
                data.children.push(muluItem)
            }


            // dataSource.splice(index, 1);
            // dataSource.push(muluItem)
            return true;
        }


        if (item.children) {
            if (findAndAddChilrenNode(item.children, data)) {

            }
        }


    })
}

const moneyPlayHandle = () => {

    ReBornPapers(reqPayForBalance)

}

</script>

<style scoped>
.queisonFont {
    font-size: 15px;
    color: #a8abb2;
}

.min_title {
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 12px;
}

.exportImg {
    position: absolute;
    bottom: 30px;
    right: 150px;
}

#content {
    /* padding-right: 200px; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-image: url('./lunwen.png'); */
    background-image: url('../../assets/backgroudBody.png');
    background-size: cover;
}



.button {
    /* margin-top: 200px; */
    padding: 40px;
}

.contentSearch {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: nowrap;
    /* padding-left: 160px; */
}

.contentSearchP {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: nowrap;
    padding-left: 160px;
}

/* .is-checked,.el-radio {
    color: #467af2 !important;
} */



/* .el-tree-node { */


/* :deep(.el-tree-node) {

    height: 31px
}

:deep(.el-tree-node__content) {

    height: 31px
} */
.contesntBody {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    /* background-image: url('./lunwen.png'); */
    /* background-image: url('../../../assets/paper.png'); */
    background-size: cover;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
}

.sum {
    /* width: 40px; */
}
</style>
