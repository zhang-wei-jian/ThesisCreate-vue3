



<template>
    <!-- 4777f6 -->
    <!-- text-color="#fffff" background-color="#d5e3ff" -->
    <el-menu active-text-color="#467af2" :default-active="activeIndex" style="height: 50px;" class="el-menu-demo nav_style"
        mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="-1">
            <img style="margin-right: 5px; width: 28px; height: 25px;" src="../../assets/log2.jpg" alt="">
            <span class="nav_sty">
               梵高智能生成系统
            </span>
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="0"> <span class="nav_sty">首页</span></el-menu-item>

        <el-sub-menu index="1">
            <template #title> <span class="nav_sty">论文参考生成</span></template>
            <el-menu-item index="12"> <span class="nav_sty">普通生成</span></el-menu-item>

            <el-menu-item index="11"> <span class="nav_sty">自定义目录生成</span></el-menu-item>
        </el-sub-menu>


        <el-sub-menu index="3">
            <template #title> <span class="nav_sty">论文降重</span></template>
            <el-menu-item index="32"> <span class="nav_sty">AI降重</span></el-menu-item>

            <el-menu-item index="31"> <span class="nav_sty">手动降重</span></el-menu-item>
        </el-sub-menu>

        <el-menu-item index="4"> <span class="nav_sty">查询结果</span></el-menu-item>



        <el-sub-menu index="8">
            <template #title> <span class="nav_sty">便捷工具</span></template>
            <el-menu-item index="81"> <span class="nav_sty">PDF转WORD</span></el-menu-item>
            <!-- <el-menu-item index="32"> <span class="nav_sty">AI降重</span></el-menu-item> -->
        </el-sub-menu>


        <!-- <el-menu-item index="8"> <span class="nav_sty">文件格式转换</span></el-menu-item> -->
        <el-menu-item index="5" v-if="username"> <span class="nav_sty">个人中心</span></el-menu-item>
        <el-sub-menu index="6" v-if="is_superuser">
            <template #title> <span class="nav_sty">系统管理</span></template>
            <el-menu-item index="61"> <span class="nav_sty">用户管理</span></el-menu-item>
            <el-menu-item index="62"> <span class="nav_sty">订单管理</span></el-menu-item>
            <el-menu-item index="63"> <span class="nav_sty">模版管理</span></el-menu-item>
            <el-menu-item index="64"> <span class="nav_sty">密钥管理</span></el-menu-item>
            <el-menu-item index="65"> <span class="nav_sty">公告管理</span></el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="9">
            <template v-if="username" #title>
                <img class="touxiang"
                    src="https://th.bing.com/th/id/R.66daef0d6a43ac9362c91423e83c0fbf?rik=puht1eQ2uBLuRA&pid=ImgRaw&r=0" />
                <span class="nav_sty">{{ username }}</span>

            </template>
            <template v-else index="9" #title> <span class="nav_sty">登录/注册</span></template>
            <el-menu-item v-if="username" @click="removeUserHandle">退出登录
                <!-- {{ username }} -->
            </el-menu-item>

            <el-menu-item v-else index="9"> <span class="nav_sty">登录</span></el-menu-item>
        </el-sub-menu>

    </el-menu>

    <!-- <div style="z-index: 99999;margin-top: 100px;">123</div> -->
</template>
<script setup>
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/user.js'
import { storeToRefs } from 'pinia'


const userStore = useUserStore()
const { user, removeUserStore } = storeToRefs(userStore)
console.log(userStore.user.password, 'store');

const { username, password, is_superuser } = toRefs(userStore.user)
console.log(username, password, is_superuser, "xxxx");

const removeUserHandle = () => {
    // console.log(user);
    userStore.removeUserStore()
}

// import { useUserStore } from '@/store/counter.js'

// console.log(useUserStore().user, 'ssss');


const router = useRouter();
const activeIndex = ref('1');

const handleSelect = (key, keyPath) => {
    switch (key) {
        case '81':
            router.push('/pdf2word');
            break;
        case '9':
            router.push('/login');
            break;
        case '11':
            router.push('/CustomCatalog');
            break;
        case '12':
            router.push('/ThesisCreate/NormalCreate');
            break;
        case '13':
            router.push('PaperTitle');
            break;
        case '21':
        case '22':

        case '23':
            router.push('/OpeningReport');
            break;
        case '3':
            router.push('/PaperReduction');
            break;
        case '31':
            router.push('/PaperReduction');
            break;
        case '32':
            router.push('/dropWeight');
            break;
        case '4':
            router.push('/QueryResults');
            break;
        case '5':
            router.push('/CheckBalance');
            break;
        case '6':
        case '61':
            router.push('/SystemManagement');
            break;
        case '62':
            router.push('/ordersearch');
            break;
        case '63':
            router.push('/templateManagement');
            break;
        case '64':
            router.push('/keyManagement');
            break;
        case '65':
            router.push('/NoticeConfig');
            break;
        default:
            router.push('/');
            break;
    }
};
</script>
<style>
.nav_sty {
    font-weight: bold;
}

.nav_style {
    width: 100%;
    /* padding: 1px; */
    position: fixed;
    top: 0;
    z-index: 999;
}

.touxiang {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px
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

