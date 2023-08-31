<template>
    <div id="content">

        <p class="min_title"> <span>1、输入标题</span> </p>
        <div class="contentSearch">
            <el-select style="width: 150px;" filterable v-model="form.action" placeholder="选择生成类式">
                <el-option v-for="item in paperRed" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="form.subject" placeholder="输入论文标题，5-20字效果最佳" style="margin-left: 17px;width: 300px;" />
        </div>

        <p class="min_title" style="margin-top: 20px;"> <span>2、选择模版</span> </p>
        <div class="contentSearch">
            <el-select style="width: 150px;" filterable v-model="form.model_id" placeholder="选择论文模版">
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
        <el-dialog v-model="centerDialogVisible" @close="close" :title="dialogTitle" width="571px" center>
            <div v-if="downFileUrl === ''">
                <el-row>
                    <!-- <el-col :span="12">
                        生成成功，是否立即支付？ <a :href="resForm.pay_url" target="_blank">去支付</a>
                    </el-col> -->
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center;">
                        <span style="color: black;font-weight: bold;">
订单：{{ resForm.order_id }} <el-button style="background-color: #467af2;border: #467af2;" type="primary" size="small"
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
                <div>
                    <!-- <label style="width: 160px;font-size: 15px;">请选择支付方式</label> -->
                    <el-radio-group style="width: 390px;margin-left: 100px;text-align: center;" v-model="payForTwoChooseOne"
                        @change="playTypeChange" class="ml-4">
                        <el-radio label="wx" size="large">微信支付</el-radio>
                        <el-radio label="ali" size="large">支付宝支付</el-radio>
                        <div>
                            <el-radio v-if="username" label="money" size="large">余额支付</el-radio>
                            <!-- <el-button v-if="payForTwoChooseOne === 'money'" @click="moneyPlayHandle">使用余额支付</el-button> -->

                        </div>
                    </el-radio-group>
                </div>
                <canvas style="margin-left: 180px;" v-show="payForTwoChooseOne !== 'money'" ref="qrCodeRef"
                    id="canvas"></canvas>

                <p style="margin-left: 215px;margin-top: 10px;">
                    <el-button size="small" v-if="payForTwoChooseOne === 'money'"
                        style="background-color: #467af2;border: #467af2;margin-bottom: 14px;" type="primary"
                        @click="moneyPlayHandle">
                        使用余额支付</el-button>
                </p>


            </div>

            <div v-else-if="downFileUrl === 'loading'" style="text-align: center;">
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

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>

                    <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                        @click="centerDialogVisible = false">
                        确定</el-button>

                </span>
            </template>

        </el-dialog>

        <!-- 判断支付方式 -->
        <!-- <el-dialog v-model="payForWhat" title="Warning" width="30%" center>
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
        </el-dialog> -->


    </div>
</template>

<script  setup>
import { reactive, ref, nextTick, toRefs } from "vue"
import { reBornPaper } from "../../../api/paperReBorn";
import { ElMessage, ElMessageBox } from 'element-plus'
import { reqModules, reqAliPay, reqWeChatPay, reqCheckOrderIsPlay, reqGenArticle, reqGenReport, reqPayForBalance } from "@/api/NormalCreate"
import { useUserStore } from '@/store/user.js'
import { storeToRefs } from 'pinia'

import { useRouter } from 'vue-router';

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
        ReBornPapers(reqWeChatPay)
    } else if (value === 'ali') {
        ReBornPapers(reqAliPay)

        ReBornPapers(reqAliPay)

    } else if (value === 'money') {
        // ReBornPapers(reqPayForBalance)
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
    // {
    //     key: 2,
    //     label: '生成可修改目录的论文',
    //     value: '2'
    // },
    {
        key: 3,
        label: '生成开题报告',
        value: '3'
    },
    // {
    //     key: 4,
    //     label: '去重',
    //     value: '4'
    // },
    // {
    //     key: 5,
    //     label: '手动去重',
    //     value: '5'
    // },
])
const router = useRouter();

const routerTo = () => {
    console.log("页面跳转");
    router.push('/QueryResults');
}

const copyOrderId = ()=>{
    let copyValue = document.createElement("input");
    let copyUrl = resForm.order_id;
    copyValue.value = copyUrl;
    document.body.appendChild(copyValue);
    copyValue.select();
    document.execCommand("Copy");
    ElMessage.success("复制成功！")
}

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
    "amount": '60',
    "action": '',
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
        ElMessage.error('请确认条款！')
        return
    } else if (form.action == '') {
        ElMessage.error('请选择生成类型！')
        return
    } else if (form.model_id == '') {
        ElMessage.error('请选择模版！')
        return
    }


    ReBornPapers(reqWeChatPay)

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




            try {



                switch (form.action) {
                    case '1':
                        getGenArticle()
              


                        break;
                    case '3':
                        getGenReport()
          

                        break;
                }

            } catch (error) {
                ElMessageBox.alert('请联系客服，订单为' + resForm.order_id, '请求错误', {
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
        const res = await reqGenArticle(obj)
        // const res = await Promise.reject("500!!!err")
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
// report
const getGenReport = async () => {

    downFileUrl.value = 'loading'
    dialogTitle.value = '正在生成文章'

    const obj = {
        "model_id": form.model_id,
        "title": form.subject,
        "order_id": resForm.order_id

    }
    try {
        const res = await reqGenReport(obj)
        // downFileUrl.value = res.url
        downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}${res.url}`
        ElMessage.success('生成成功')
        dialogTitle.value = '生成成功'

    } catch (error) {
        ElMessageBox.alert('请联系客服，订单为' + resForm.order_id, '请求错误', {
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
        isLoding.value = false;
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
    background-image: url('../../../assets/paper.png');
    background-size: cover;
    /* overflow: scroll */
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
}

/* .is-checked,.el-radio {
    color: #467af2 !important;
} */

#canvas {
    height: 240px;
    width: 240px;
}
</style>
