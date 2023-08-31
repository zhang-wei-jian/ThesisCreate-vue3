<template>
    <div class="page_body">

        <el-card style="margin-bottom: 10px;">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text-large font-600 mr-3">个人信息</span>
                </template>
            </el-page-header>
        </el-card>
        <div class="common-layout">
            <el-container>
                <el-aside width="360px;">

                    <el-card>
                        <div class="card_sty">
                            <el-descriptions title="用户信息">
                                <el-descriptions-item label="头像：">
                                    <img class="touxiang"
                                        src="https://th.bing.com/th/id/R.66daef0d6a43ac9362c91423e83c0fbf?rik=puht1eQ2uBLuRA&pid=ImgRaw&r=0" />
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions>
                                <el-descriptions-item label="昵称："><!-- {{ username }} -->{{ userInfo.username }}
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions>
                                <el-descriptions-item label="余额：">{{ userInfo.yu_e }} B</el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions>
                                <el-descriptions-item label="签到天数：">{{ userInfo.days }} 天</el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions>
                                <el-descriptions-item label="订单数量：">{{ userInfo.order_count }} 个</el-descriptions-item>
                            </el-descriptions>
                            <el-divider />

                            <!-- background-color="#345aa8"
                            text-color="#fff"
                            active-text-color="#ffd04b" -->
                            <el-menu style="width: 100%;" default-active="1" class="el-menu-vertical-demo"
                                @select="handleSelect">

                                <el-menu-item index="1">
                                    <el-icon>
                                        <Calendar />
                                    </el-icon>
                                    <span>打卡签到</span>
                                </el-menu-item>

                                <el-menu-item index="2">
                                    <el-icon>
                                        <Ticket />
                                    </el-icon>
                                    <span>余额充值</span>
                                </el-menu-item>
                                <el-menu-item index="3">
                                    <el-icon>
                                        <Shop />
                                    </el-icon>
                                    <span>卡密领取</span>
                                </el-menu-item>
                                <!-- <el-menu-item index="4">
                                    <el-icon>
                                        <Promotion />

                                    </el-icon>
                                    <span>邀请有礼</span>
                                </el-menu-item> -->
                                <el-menu-item index="5">
                                    <el-icon>
                                        <setting />

                                    </el-icon>
                                    <span>修改密码</span>
                                </el-menu-item>
                                <el-menu-item index="6">

                                    <el-icon>
                                        <DocumentCopy />
                                    </el-icon>


                                    <span>查看订单</span>
                                </el-menu-item>

                            </el-menu>

                        </div>

                    </el-card>

                </el-aside>
                <el-main>
                    <el-card>
                        <div class="card_sty">
                            <div v-show="checkMeun == 1">
                                <el-calendar>

                                    <template #header="{ date }">
                                        <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                                            @click="qiandaoHandle">签 到</el-button>
                                        <!-- <el-button type="primary" @click="qiandaoHandle">
                                            签到
                                        </el-button> -->
                                    </template>

                                    <template #date-cell="{ data }">
                                        <p :class="data.isSelected ? 'is-selected' : ''">
                                            {{ data.day.split('-').slice(1).join('-') }}
                                            <!-- {{ data.isSelected ? '✔️' : '' }} -->
                                            <!-- {{ data.day }} -->
                                            {{ isDays[data.day] ? '✔️' : '' }}

                                        </p>
                                    </template>
                                </el-calendar>
                            </div>
                            <div v-show="checkMeun == 2">
                                <div class="addMoney">

                                    <div @click="chooseIndexVal(index)" class="addMoneydiv"
                                        v-for="(item, index) in getMoenyList" :key="index">
                                        <el-card :class="item.active" style="width: 100%;height: 100%;" v-if="index != 7">
                                            <p class="xuni">{{ item.xuni }} B</p>
                                            <p class="zhenshi">¥ {{ item.zhenshi }}</p>
                                            <p class="zhekou">赠送：{{ item.zhekou }} 元</p>
                                        </el-card>
                                        <el-card :class="item.active" style="width: 100%;height: 100%;" v-else>
                                            <p class="xuni">自定义金额</p>
                                            <el-input-number @change="editMoneySelf" style="height: 20px;width: 140px;"
                                                v-model="num" size="small" />
                                            <!-- <p class="zhekou">优惠{{ item.zhekou }}折</p> -->

                                        </el-card>
                                    </div>

                                </div>
                                <div class="bottomPayMoney">
                                    <div class="bottomQRCode">
                                        <!-- <div class="QRCodeCardSty">微信二维码</div>
                                        <div class="QRCodeCardSty">支付宝二维码</div> -->

                                    </div>
                                    <div class="bottomPayInfo">
                                        <p class="p1">当前余额：1433223</p>
                                        <p class="p2">充值余额：<span>{{ setMoney.money }} 元</span></p>
                                        <p class="p2">实际付款金额：<span>{{ truePayMoney.money }} 元</span></p>

                                        <!-- truePayMoney -->
                                        <p class="p3">使用微信、支付宝扫码支付 <span style="color: #cc7e20;">(扫码支付,请勿刷新页面)</span></p>

                                        <el-button style="background-color: #467af2;border: #467af2;margin-top: 12px;"
                                            type="primary" @click="gotoPlay">
                                            去 支 付
                                        </el-button>

                                        <!-- <el-button style="margin-top: 10px;" type="primary" @click="gotoPlay">去支付</el-button> -->
                                    </div>
                                </div>



                                <!-- 支付_dddd -->
                                <el-dialog v-model="centerDialogVisible" @close="close" :title="dialogTitle" width="571px"
                                    center>
                                    <div v-if="downFileUrl === ''">
                                        <!-- <el-row>
                                            <el-col :span="24" style="text-align: center;">
                                                生成成功，是否立即支付？ <a :href="resForm.pay_url" target="_blank">去支付</a>
                                            </el-col>
                                        </el-row> -->
                                        <el-row>
                                            <el-col :span="24" style="text-align: center;">
                                                <span style="color: black;font-weight: bold;">
                                                     订单：{{ resForm.order_id }} <span> <el-button style="background-color: #467af2;border: #467af2;" type="primary" size="small"
                                            @click="copyOrderId">复制</el-button></span>
                                                    </span>
                                                <p style="font-weight: bold;color: red;margin: 7px;">请牢记订单编号！订单编号即是相应付款记录中的订单编号，如果是系统用户，请到系统中查询。如有疑问，请联系客服！</p>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="24" style="text-align: center;">
                                                付款完成将自动跳转
                                            </el-col>
                                        </el-row>

                                        <!-- <el-button type="text" @click="testHandle">调试一键成功</el-button> -->

                                        <p class="min_title" style="margin-top: 20px;text-align: center;"> <span>付款方式</span>
                                        </p>
                                        <div class="contentSearch" style="padding-left: 140px;">
                                            <!-- <label style="width: 160px;font-size: 15px;">请选择支付方式</label> -->
                                            <el-radio-group style="width: 390px;margin-left: 14px;"
                                                v-model="payForTwoChooseOne" @change="playTypeChange" class="ml-4">
                                                <el-radio label="wx" size="large">微信支付</el-radio>
                                                <el-radio label="ali" size="large">支付宝支付</el-radio>
                                                <!-- <div> -->
                                                <!-- <el-radio v-if="username" label="money" size="large">余额支付</el-radio> -->
                                                <!-- <el-button v-if="payForTwoChooseOne === 'money'"
                                                        @click="moneyPlayHandle">使用余额支付</el-button> -->



                                                <!-- </div> -->
                                            </el-radio-group>
                                            <!-- <el-input v-model="form.subject" placeholder="输入论文标题，5-20字效果最佳" style="margin:5px;width: 300px;" /> -->
                                        </div>
                                        <canvas style="margin-left: 180px;" v-show="payForTwoChooseOne !== 'money'"
                                            ref="qrCodeRef" id="canvas"></canvas>
                                        <!-- <p  style="margin-left: 80px;">
                                            <el-button v-if="payForTwoChooseOne === 'money'"
                                                        style="background-color: #467af2;border: #467af2;margin-bottom: 14px;"
                                                        type="primary" @click="moneyPlayHandle">
                                                        使用余额支付</el-button>
                                                    </p> -->
                                    </div>

                                    <div v-else-if="downFileUrl === 'loading'" style="text-align: center;">
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



                                                <el-tooltip class="box-item" effect="dark" :content="downFileUrl"
                                                    placement="top-start">
                                                    <el-button
                                                        style="background-color: #467af2;border: #467af2;width: 150px;"
                                                        type="primary" @click="rePlayHandle">
                                                        再来一次</el-button>

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





                            </div>
                            <div v-show="checkMeun == 3" style="text-align: center;">
                                <div style="padding-right:30px ;">
                                    <el-card style="height: 300px;padding-top: 100px;">
                                        <p style="margin-top: 30px;padding-bottom: 30px;">当前余额：<span class="moneySty">
                                                {{ userInfo.yu_e }}</span> B</p>

                                        <span style="width: 100px;">
                                            卡密：
                                        </span>
                                        <el-input style="width: 300px;" v-model="card_str" placeholder="请输入卡密" />
                                        <el-button style="background-color: #467af2;border: #467af2;margin-left: 20px;"
                                            type="primary" @click="setYueFunu">确认领取</el-button>

                                        <!-- <el-button @click="setYueFunu()">确认领取</el-button> -->
                                    </el-card>
                                </div>

                            </div>
                            <!-- <div v-show="checkMeun == 4">
                                <el-button @click="getCodeReBron">生成邀请码</el-button>
                                <div v-for="(item,index) in codeList.list" :key="index">
                                    <p>
                                      <span>
                                          邀请码：{{ item.mstr }}
                                        </span>
                                        <span>
                                            状态：{{ item.used ? '已使用' : '未使用' }}
                                        </span>
                                    </p>
                                </div>
                            </div> -->
                            <div v-show="checkMeun == 5">
                                <div>
                                    <!-- class="changePassword" -->
                                    <el-card style="text-align: center;height: 300px;padding-top: 100px;">
                                        <span style="width: 100px;">
                                            填写新密码：
                                        </span>
                                        <el-input type="password" style="width: 300px;" v-model="xinMima"
                                            placeholder="请输入卡密" />
                                        <p style="margin-bottom: 20px;"></p>
                                        <span style="width: 100px;">
                                            确认新密码：
                                        </span>
                                        <el-input type="password" style="width: 300px;" v-model="configMima"
                                            placeholder="请输入卡密" />
                                        <p style="margin-bottom: 20px;"></p>
                                        <el-button style="background-color: #467af2;border: #467af2;margin-left: 20px;"
                                            type="primary" @click="configChange">确认修改</el-button> <!-- <el-form :model="form" label-width="120px">

                                        <el-form-item label="新密码：">
                                            <el-input style="width: 200px;" show-password type="password" v-model="xinMima"
                                                placeholder="请输入新密码" />
                                        </el-form-item>
                                        <el-form-item label="再次输入：">
                                            <el-input style="width: 200px;" show-password type="password"
                                                v-model="configMima" placeholder="请输入新密码" />
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button style="background-color: #467af2;border: #467af2;margin-left: 20px;"
                                                type="primary" @click="configChange">确认修改</el-button>
                                        </el-form-item>
                                    </el-form> -->
                                    </el-card>
                                </div>

                            </div>

                            <div v-show="checkMeun == 6">
                                <!-- 查看订单 -->



                                <el-card style="height: 100%;">
                                    <el-table height="550" :data="orderUserList.list" stripe style="width: 100%">
                                        <!-- <el-table-column label="金额">
                                            <template v-slot="scope">{{ scope.row.money }}</template>
                                        </el-table-column> -->
                                        <el-table-column label="文件名称">
                                            <template v-slot="scope">{{ scope.row.name }}</template>
                                        </el-table-column>
                                        <el-table-column label="订单id">
                                            <template v-slot="scope">{{ scope.row.order_id }}</template>
                                        </el-table-column>
                                        <el-table-column label="生成时间">
                                            <template v-slot="scope">{{ getParamsTime(scope.row.create_time, 'nyrsfm', true)
                                            }}</template>
                                        </el-table-column>
                                        <!-- <el-table-column label="操作">
                                            <el-button>下载</el-button>
                                        </el-table-column> -->
                                    </el-table>
                                    <!-- <div class="orderPg">
                                        <el-pagination v-model:current-page="orderList.offset" :page-sizes="[20, 30, 50]"
                                            :small="small" layout="total, sizes, prev, pager, next, jumper"
                                            :total="orderUserList.total" @current-change="changePage"
                                            @size-change="changeSize" />
                                    </div> -->

                                </el-card>

                                <!-- <el-button @click="getOrderListFunction">查看信息</el-button> -->
                            </div>
                        </div>
                    </el-card>

                </el-main>
            </el-container>
        </div>

    </div>
</template>

<script  setup>
import { getParamsTime } from '@/utils/formatData'

import { useUserStore } from '@/store/user.js'
import { storeToRefs } from 'pinia'
import { checkCome, reqGetDay, setUserPassword, setYue, getUserInfo, getOrderList, reqChanrge, reqDsicount } from "@/api/login"
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import {
    reqModules,
    reqAliPay, reqWeChatPay,
    reqCheckOrderIsPlay,
    reqGenArticle,
    reqPayForBalance,
    reqAIAliPay,
    reqAIWeChatPay,
    reqPayAIForBalance,
    reBronCode,
    getBronCode
} from "@/api/NormalCreate"


import { reactive, ref, toRefs, nextTick, watch } from 'vue';
import { ElMessage } from 'element-plus';
import QRCode from 'qrcode';

// const getCodeReBron = async () => {
//     const msg = await reBronCode();
//     console.log("msg ==> ", msg);
// }

const codeList = reactive({
    list: []
})

const letCodeList = async () => {
    const list = await getBronCode();
    console.log("list ==> ", list);
    codeList.list = list;
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

letCodeList();

const userInfo = reactive({
    id: "",
    username: "",
    is_active: true,
    yu_e: 0,
    update_time: "",
    date_joined: "",
    is_superuser: true,
    order_count: "",
    days: ''
})

const changePage = (e) => {
    orderList.offset = e;
    getOrderListFunction();
}

const changeSize = (e) => {
    orderList.limit = e;
    getOrderListFunction();

}

const orderList = reactive({
    limit: 9999999999,
    offset: 1
})

const orderUserList = reactive({
    list: [],
    total: '',
})

const getOrderListFunction = async () => {
    const call = await getOrderList({ limit: orderList.limit, offset: orderList.offset });
    orderUserList.list = call.items;
    orderUserList.total = call.count
    console.log("call ===> ", call);
}

getOrderListFunction();

// const tableData = reacttive({})


const checkDay = async () => {
    const res = await checkCome()
    return res
}

const xinMima = ref('');
const configMima = ref('');

const card_str = ref();

// 卡密充值
const setYueFunu = async () => {
    const callVal = await setYue({ card_str: card_str.value });
    console.log("callVall ==> ", callVal);
    if (callVal.detail == 'ok') {
        ElMessage.success("卡密领取成功！");
    } else {
        ElMessage.error(callVal.detail)
    }
    getUserInfos();
}

const getUserInfos = async () => {
    const call = await getUserInfo();
    console.log("call ==> ", call);
    for (let item in call) {
        userInfo[item] = call[item]
    }
    console.log("userInfo ==> ", userInfo);
}

getUserInfos();

const isDays = ref({})
const isdayList = ref([])
const getDay = async () => {
    const res = await reqGetDay()

    isdayList.value = res
    console.log(res, "已签到列表啊");
    isdayList.value = res.map(item => {
        return item['day']
    });

    console.log(isdayList.value, "isDayssssList");



    res.forEach(item => {
        isDays.value[item.day] = true
    });

    console.log(isDays.value, "sss");
    console.log("签到的日期有：", res);
    userInfo.days = res.length;

}

getDay()

const qiandaoHandle = async () => {
    const res = await checkDay()
    console.log(res, "签到后");
    isdayList.value.includes(res.day) ? ElMessage({
        message: `今天已经签到过了`,
        type: 'warning',
    }) : ElMessage({
        message: `恭喜你，签到成功${res.day}，余额+1`,
        type: 'success'
    });
    getUserInfos();
    getDay()
}

const configChange = () => {
    if (xinMima.value != configMima.value) {
        ElMessage.error("两次输入的密码不一致！")
    } else if (xinMima.value == '') {
        ElMessage.error("新密码不能为空！")
    } else if (configMima.value == '') {
        ElMessage.error("确认密码不能为空！")
    } else {
        setPw()
    }
}

const setPw = async () => {
    const call = await setUserPassword({ pw: configMima.value });
    console.log("call Val ===> ", call);
    if (call.detail == 'ok') {
        ElMessage.success("密码修改成功！")

    } else {
        ElMessage.error("密码更新失败！详细：" + call.detail)
    }
}



const userStore = useUserStore()
const { user, removeUserStore } = storeToRefs(userStore)
console.log(userStore.user.password, 'store');

const { username, password } = toRefs(userStore.user)



const router = useRouter();

const checkMeun = ref('1');

const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
    checkMeun.value = key;
}
const num = ref(0.0)

const setMoney = reactive({
    money: 0,
});

const truePayMoney = reactive({
    money: 0
})

const editMoneySelf = async (e) => {
    console.log("e ==> ", e);


    setMoney.money = e;

    setMoney.money = '计算中..'
    truePayMoney.money = '计算中'
    // setMoney.money = moneyItem.zhenshi;

    const obj = {
        charge: e
    }
    const res = await reqDsicount(obj)

    console.log(res);
    setMoney.money = res.discount + res.charge
    truePayMoney.money = res.charge



}

const chooseIndexVal = (index, item) => {
    console.log("e ===> ", index);

    getMoenyList.forEach(async (moneyItem, i) => {
        if (i === index) {
            moneyItem.active = 'checkCard';
            if (i !== 7) {
                num.value = 0;

                setMoney.money = '计算中..'
                truePayMoney.money = '计算中..'
                // setMoney.money = moneyItem.zhenshi;



                const obj = {
                    charge: moneyItem.zhenshi
                }
                const res = await reqDsicount(obj)

                console.log(res);
                setMoney.money = res.discount + res.charge
                truePayMoney.money = res.charge


            }
        } else {
            moneyItem.active = 'none';
        }
    });

    console.log(getMoenyList[9]);
};

const goBack = () => {
    router.go(-1);
}

const getMoenyList = reactive([
    {
        zhenshi: '50',
        xuni: '50',
        zhekou: '1.5',
        active: 'none',
    }, {
        zhenshi: '100',
        xuni: '100',
        zhekou: '5', active: 'none',

    }, {
        zhenshi: '150',
        xuni: '150',
        zhekou: '7.5', active: 'none',
    }, {
        zhenshi: '200',
        xuni: '200',
        zhekou: '20', active: 'none',
    }, {
        zhenshi: '300',
        xuni: '300',
        zhekou: '39', active: 'none',
    }, {
        zhenshi: '350',
        xuni: '350',
        zhekou: '70', active: 'none',
    }, {
        zhenshi: '400',
        xuni: '400',
        zhekou: '120', active: 'none',
    }, {
        zhenshi: '500',
        xuni: '500',
        zhekou: '123', active: 'none',
    },
])

//////////////////////////////////////////////////////////

// reqChanrge order_id
const qrCodeRef = ref()
const text = ref('')
const textarea = ref('')
// remnant: '0',
let remnant = ref(0);
const descInput = () => {
    var txtVal = textarea.value.length;
    remnant.value = txtVal;
}


const loading = ref(false)

const setGPT = async () => {
    // loading.value = true;
    // let question = textarea.value
    // const asd = await reqDiyDropWeight(question);
    // console.log("res ===> ".asd);
    // text.value = asd.answer
    // setTimeout(() => {
    //     loading.value = false;
    // }, 3000)




    if (downFileUrl.value) {
        downFileUrl.value = ''
        ReBornPapers(reqAIWeChatPay)
    }




    let question = textarea.value
    form.subject = question
    ReBornPapers(reqAIWeChatPay)
}



// import QRCode from 'qrcode';
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



const getModules = async () => {
    const res = await reqModules()
    console.log(res, "resss");
    schoolList.value = res
    console.log(schoolList.value, "schoolList");


}
const centerDialogVisible = ref(false)
// getModules()
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

const dialogTitle = ref('请支付')
const form = reactive({
    // type: '毕业论文',
    // title: '',
    model_id: '',

    // textVal: '',

    "subject": '',
    // "return_url": 'https://scpic.chinaz.net/Files/pic/pic9/201812/zzpic15903.jpg',
    "amount": '60',
    "action": '6',
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

    // form.amount = num.value
    // 余额充值
    // form.amount = setMoney.money

    form.amount = truePayMoney.money
    form.subject = '用户余额充值'


    // console.log(num.value, "sum");

    //  num.value
    isPlayTimeLoop && clearInterval(isPlayTimeLoop)
    isPlayTimeLoop = null


    isLoding.value = true;
    console.log("form ===> ", form);
    // const callVal = await reBornPaper({ title: form.title, model_id: form.model_id })
    // console.log("callVal ==> ", callVal);


    // const obj = {
    //     amount: 9999999
    // }


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


        if (downFileUrl.value !== '') return
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
    dialogTitle.value = '正在充值中'

    const obj = {
        // "model_id": form.model_id,
        // "words": textarea.value,
        "order_id": resForm.order_id

    }
    try {
        // const res = await reqGenArticle(obj)
        // downFileUrl.value = res.url


        const res = await reqChanrge(obj)
        console.log(res, "res");
        // text.value = res.answer


        downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}/download_file/${form.order_id}`

        // detail
        // :
        // "ok"
        // order_id
        // :
        // "20230811231647058767633835"
        // user_id
        // :
        // 33
        // yu_e
        // :
        // 1112121232132114.6
        ElMessage.success('充值成功，余额剩余' + res.yu_e)
        // dialogTitle.value = '充值成功'

        centerDialogVisible.value = false

    } catch (error) {
        // elMessage.error('服务器响应生成失败')

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
    console.log(qrCodeRef.value, canvas, "DOM");
    console.log("this", resForm.pay_url);

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




const rePlayHandle = () => {
    downFileUrl.value = ''
    ReBornPapers(reqAIWeChatPay)
}



const moneyPlayHandle = () => {

    ReBornPapers(reqPayAIForBalance)

}


const gotoPlay = () => {


    // setMoney.money 
    ReBornPapers(reqAIWeChatPay)

}


// watch(setMoney, async () => {
//     console.log("bianhua");

//     nextTick(async () => {
//         const obj = {
//             charge: setMoney.money
//         }
//         const res = await reqDsicount(obj)
//         // setMoney.money = '8888'
//         console.log(res);
//         setMoney.money = res.discount
//     })



// }, {
//     deep: true
// })



</script>

<style scoped>
.orderPg {
    float: right;
    margin: 20px;
}

.changePassword {
    padding: 10% 24% 10px 35%
}

.touxiang {
    height: 30px;
}

.addMoney {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.checkCard {
    background-color: #ecf5ff;
    border: 2px solid #467af2;

}

.bottomQRCode {
    margin-top: 30px;
    margin-left: 100px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    width: 260px;
}

.bottomPayInfo .p1 {
    margin-top: 15px;
    font-size: 14px;
}

.p2 span {
    color: #ee6360;
    font-weight: bold;
    font-size: 22px;
}

.moneySty {
    color: #ee6360;
    font-weight: bold;
    font-size: 22px;
}

/* .p1 */
.p3 {
    font-size: 14px;
    margin-top: 5px;
}

.bottomPayInfo {
    padding-top: 10px;
    margin-top: 30px;
}

.bottomPayMoney {
    display: flex;
    justify-self: start;
    margin-top: 50px;
    /* text-align: center; */
}

.QRCodeCardSty {
    width: 140px;
    height: 140px;
    margin-left: 10px;
    /* background-color: blue; */
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    color: black;
}

.addMoneydiv {
    width: 23%;
    margin-right: 2%;
    margin-top: 1.4%;
    /* padding: 10px; */
    height: 120px;
    /* background-color: pink; */
    border-radius: 5px;
    /* display: flex;
    align-items: center; */
    text-align: center;
    cursor: pointer;
}

.addMoneydiv div:hover {
    background-color: #ecf5ff;
    /* border: 2px solid #467af2; */
}

.xuni {
    font-weight: bold;
    /* padding-top: 20px; */
    font-size: 17px;
}

.zhenshi {
    font-size: 16px;
    color: #adadad;

}

.zhekou {
    font-size: 14px;
    color: #adadad;

}

.is-selected {
    color: #1989fa;
}

.el-main {
    padding: 0px !important;
    margin-left: 20px;
    /* padding-right: 0px !important; */
}

.card_sty {
    height: 70vh;
    overflow: auto;
}
</style>
