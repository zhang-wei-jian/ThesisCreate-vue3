<template>
    <!-- <div class="page_body"> -->

    <div id="content">
        <!-- <h2 style="font-size: 20px;">1、提交去重报告</h2> -->
        <p class="pWordSty">1、提交查重报告（pdf格式）</p>
        <p class="pWordSty">2、上传成功后，系统会将报告信息显示在下方</p>
        <p class="pWordSty">3、信息显示成功后，点击“下载去重报告”即可获取去重后的报告（docx格式）</p>

        <el-divider style="width: 1277px;" />
        <div class="contentSearch">
            <p style="width: 100px;font-weight: bold;">上传报告：</p>
            <div style="width: 480px;">
                <el-upload accept=".pdf" style="height: 200px;" class="upload-demo" drag :action="uploadUrl" multiple
                    :on-success="handleSuccess" :on-error="handleError">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件到这里 <em>点击上传</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            (注：请上传pdf格式的查重文件)
                        </div>
                    </template>
                </el-upload>
            </div>
        </div>
        <div class="contentSearch" style="margin-top: 30px;">
            <p style="width: 100px;font-weight: bold;padding-left: 10px;">文件名称：</p>
            <div style="width: 480px;">
                <p>
                    {{ form.subject ? form.subject : '暂无内容' }}
                </p>

            </div>
        </div>
        <!-- wordsNum.count -->
        <div class="contentSearch">
            <p style="width: 100px;font-weight: bold;padding-left: 10px;">查重数量：</p>
            <div style="width: 480px;">
                <p>
                    {{ wordsNum.count ? wordsNum.count + ' 个' : '暂无内容' }}
                </p>

            </div>
        </div>
        <div class="contentSearch">
            <p style="width: 100px;font-weight: bold;padding-left: 10px">结算费用：</p>
            <div style="width: 480px;">
                <p>
                    {{ form.amount }} 元 （2元/千字）
                </p>

            </div>
        </div>

        <el-button style="width: 150px;" :disabled="!goPlay" @click="goplayHandle">
            {{
                goPlay ? '去支付 ' : '等待上传' }}</el-button>

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
                            订单：{{ resForm.order_id }} <el-button style="background-color: #467af2;border: #467af2;"
                                type="primary" size="small" @click="copyOrderId">复制</el-button></span>
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
                <div class="contentSearch" style="padding-left: 70px;">
                    <!-- <label style="width: 160px;font-size: 15px;">请选择支付方式</label> -->
                    <el-radio-group style="width: 390px;margin-left: 14px;" v-model="payForTwoChooseOne"
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
                <canvas style="margin-left: 180px;" v-show="payForTwoChooseOne !== 'money'" ref="qrCodeRef"
                    id="canvas"></canvas>
                <p style="margin-left: 210px;margin-top: 10px;">

                    <el-button v-if="payForTwoChooseOne === 'money'"
                        style="background-color: #467af2;border: #467af2;margin-bottom: 14px;" type="primary"
                        @click="moneyPlayHandle">
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
                        <p style="margin-top: 10px;"></p>文件生成成功！请在当前页面点击下载或是前往查询结果中，依据订单号查询下载！

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
                    <!-- <el-button @click="centerDialogVisible = false" @click="cancelHandle">取消</el-button> -->
                    <el-button @click="cancelHandle">取消</el-button>
                    <!-- <el-button type="primary" @click="centerDialogVisible = false"> 确定</el-button> -->
                </span>
            </template>

        </el-dialog>


    </div>
    <!-- </div> -->
</template>

<script  setup>
import { reactive, ref, nextTick, toRefs } from "vue"
// import { reBornPaper } from "../../../api/paperReBorn";
import { ElMessage } from 'element-plus'
import { reqModules, reqAliPay, reqWeChatPay, reqCheckOrderIsPlay, reqGenArticle, reqPayForBalance, reqAIAliPay, reqAIWeChatPay, reqPayAIForBalance } from "@/api/NormalCreate"
import { useUserStore } from '@/store/user.js'
import { storeToRefs } from 'pinia'

const goPlay = ref(false)

// 被代理转发，或上线当前地址
const uploadUrl = import.meta.env.VITE_API_BASE_URL + '/api/auto_reduce_duplicate'

const wordsNum = reactive({
    count: ''
})

const handleSuccess = (res, file, fileList) => {
    console.log(res, file, fileList, '上传成功');
    const name = file.name
    form.subject = name

    form.subject = form.subject.match(/[^.]+/)[0];

    if (res) {

        console.log(res, "res");
        const id = res.order_id
        wordsNum.count = res.word_count
        form.order_id = id

        const count_word = res.word_count

        form.amount = calculatePrice(count_word)

        console.log(form, "orderID");

        goPlay.value = true

        // ReBornPapers(reqAIWeChatPay)

        return

        // "/static/docx/国际人权法与少数群体权益保护_原文对照报告(3)_ok.docx"
        const downUrl = res.url
        // 这里有值就是开发环境就使用固定的的地址，否则就是线上的地址使用当前地址
        downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}${res.url}`
        // downFileUrl.value = 'https://s4.s100.vip:7147' + downUrl
        console.log(downFileUrl, '下载地址');
    }

    // if (res.code === 200) {
    //     console.log(res.data, 'aaaaaaa上传成功');
    //     const fileName = res.data[0].name
    //     const downUrl = import.meta.env.VITE_API_BASE_URL + '/static/docx/' + fileName
    //     console.log(downUrl, '下载地址');

    // }
}

// 计算金额
function calculatePrice(wordCount) {
    const ratePerThousandWords = 2; // 每千字 1 块钱
    const totalPrice = (wordCount / 1000) * ratePerThousandWords;
    return totalPrice.toFixed(2);
}

const copyOrderId = () => {
    let copyValue = document.createElement("input");
    let copyUrl = resForm.order_id;
    copyValue.value = copyUrl;
    document.body.appendChild(copyValue);
    copyValue.select();
    document.execCommand("Copy");
    ElMessage.success("复制成功！")
}

const userStore = useUserStore()
const { user, removeUserStore } = storeToRefs(userStore)


const { username, password } = toRefs(userStore.user)


import QRCode from 'qrcode';
// import {}
// action

const payForWhat = ref(false)

const payForTwoChooseOne = ref('wx');
const playTypeChange = (value) => {
    console.log(value);
    isPlayTimeLoop && clearInterval(isPlayTimeLoop)
    isPlayTimeLoop = null

    if (value === 'wx') {
        ReBornPapers(reqAIWeChatPay)
    } else if (value === 'ali') {
        ReBornPapers(reqAIAliPay)



    } else if (value === 'money') {
        // ReBornPapers(reqPayAIForBalance)
    }

}

const agrent = ref(false);

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
    // "return_url": 'https://scpic.chinaz.net/Files/pic/pic9/201812/zzpic15903.jpg',
    "amount": '0.00',
    "action": '4',
    "order_id": '',
})
const resForm = reactive({
    "order_id": '',
    "pay_url": '',

})
const status = ref(false)
let isPlayTimeLoop = null
const isLoding = ref(false);
const downFileUrl = ref('')


const typeOrFalse = () => {
    if (form.subject === '') {
        ElMessage.error('请填写论文标题！')
        return
    } else if (!agrent.value) {
        ElMessage.error('请确认条款')
        return
    }


    ReBornPapers(reqAIWeChatPay)

}


const ReBornPapers = async (playFn) => {


    clearInterval(isPlayTimeLoop)

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


const close = () => {

    downFileUrl.value = ''
    clearInterval(isPlayTimeLoop)

    isPlayTimeLoop = null


}
// 获取文章下载
const getGenArticle = async () => {

    downFileUrl.value = 'loading'
    dialogTitle.value = '正在生成文章'

    const obj = {
        "model_id": form.model_id,
        "title": form.subject,
        "order_id": resForm.order_id

    }
    try {
        // const res = await reqGenArticle(obj)
        // downFileUrl.value = res.url
        downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}/download_file/${form.order_id}`


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


const cancelHandle = () => {

    // downFileUrl.value = ''
    centerDialogVisible.value = false
}

const goplayHandle = () => {


    centerDialogVisible.value = true
    ReBornPapers(reqAIWeChatPay)

}


const moneyPlayHandle = () => {

    ReBornPapers(reqPayAIForBalance)

}





</script>

<style scoped>
#content {
    widows: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/ailoading.png');
    background-size: cover;

    overflow: auto;
}

.cheecked {
    /* margin-top: 200px; */
    /* padding: 50px; */
}

.button {
    /* margin-top: 200px; */
    padding: 40px;
}

.pWordSty {
    font-weight: bold;
    line-height: 30px;
}

.contentSearch {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 26px;
}

/* .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
} */

.upload :deep(.el-form-item__content) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

/* .contentSearch {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
} */
</style>
