<template>
    <!-- 背景图 -->
    <div class="bjimg"></div>

    <!--  导航栏 -->
    <div class="tou">
        <sapn class="logo"> XXX有限责任公司</sapn>
        <ul class="biao">
            <li><a href="#">主页</a></li>
            <li><a href="#">个人简介</a></li>
            <li><a href="#">文章</a></li>
            <li><a href="#">留言版</a></li>
            <li><a href="#">友链</a></li>
        </ul>
    </div>

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

const { username, password } = toRefs(userStore.user)
console.log(user);

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
        case '8':
            router.push('/pdf2word');
            break;
        case '9':
            router.push('/login');
            break;
        case '11':
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
        default:
            router.push('/');
            break;
    }
};
</script>

<script>
// window.addEventListener('scroll', function () {
//     let tou = document.querySelector('.tou');


//     /*  tou.classList.toggle("bian",window.scrollY>0); */
//     if (window.scrollY > 0) {
//         tou.classList.add("bian");
//     } else {
//         tou.classList.remove("bian");
//     }
// })
</script>

<style>
.nav_style {
    width: 100%;
    padding: 1px;
    position: fixed;
    top: 0;
    z-index: 999;
}
</style>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

body {
    /* height: 120vh; */

}

.tou {
    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    padding: 25px 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    transition: 1s;
    background-color: #fff;
}

.logo {
    position: relative;
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 1px;
    color: #1c1c1d;
}

.logo::before {
    content: '';
    position: absolute;
    left: -50px;
    top: -15px;
    width: 50px;
    height: 50px;
    background-image: url(logo.png);
    background-size: 100%;
}

.biao {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    list-style: none;

}

.biao li {
    position: relative;
}

.biao a {
    position: relative;
    margin: 0 10px;
    font-size: 18px;
    font-family: 'fangsong';
    font-weight: bold;
    color: #1c1c1d;
    text-decoration: none;

}

.bian {
    padding: 10px 100px;
    background-color: #fff;
}

.bian .logo,
.tou.bian a {
    font: inherit;
    color: #1c1c1d;
}

/*  背景图样式 */
.bjimg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    background-color: #f1f3f5;
    background-image: url(11.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
}
</style>










<template>



    <el-menu background-color="#345aa8" text-color="#fff" active-text-color="#ffd04b" :default-active="activeIndex"
        class="el-menu-demo nav_style" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="-1">
            <img style="margin-right: 5px; width: 15px; height: 15px;" src="../../assets/logo.svg" alt="">
            XX有限责任公司
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="0">首页</el-menu-item>

        <el-sub-menu index="1">
            <template #title>论文参考生成</template>
            <el-menu-item index="11">自定义目录</el-menu-item>
            <el-menu-item index="12">普通生成</el-menu-item>
            <!-- <el-menu-item index="13">自定义模版</el-menu-item> -->
        </el-sub-menu>

        <!-- <el-sub-menu index="2">
            <template #title>开题报告生成</template>
            <el-menu-item index="21">自定义目录</el-menu-item>
            <el-menu-item index="22">普通生成</el-menu-item>
            <el-menu-item index="23">自定义模版</el-menu-item>
        </el-sub-menu> -->

        <el-sub-menu index="3">
            <template #title>论文降重</template>
            <el-menu-item index="31">手动降重</el-menu-item>
            <el-menu-item index="32">AI降重</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="4">查询结果</el-menu-item>

        <el-sub-menu index="6">
            <template #title>系统管理</template>
            <el-menu-item index="61">用户管理</el-menu-item>
            <el-menu-item index="62">订单管理</el-menu-item>
            <el-menu-item index="63">模版管理</el-menu-item>
        </el-sub-menu>

        <!-- <el-menu-item index="7">联系客服</el-menu-item> -->
        <el-menu-item index="8">文件格式转换</el-menu-item>
        <el-menu-item index="5">个人中心</el-menu-item>

        <!-- <el-menu-item index="9">登录/注册/注销</el-menu-item> -->
        <!-- <el-menu-item index="9">登录/注册/注销</el-menu-item> -->
        <!-- <el-menu-item v-if="username" index="9">{{ username }}/注销</el-menu-item>
        <el-menu-item v-else index="9">登录/注册/注销</el-menu-item> -->

        <el-sub-menu index="9">
            <template v-if="username" #title>{{ username }}</template>
            <template v-else index="9" #title>登录/注册</template>
            <el-menu-item v-if="username" @click="removeUserHandle">退出登录
                <!-- {{ username }} -->
            </el-menu-item>

            <el-menu-item v-else index="9">登录</el-menu-item>
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

const { username, password } = toRefs(userStore.user)
console.log(user);

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
        case '8':
            router.push('/pdf2word');
            break;
        case '9':
            router.push('/login');
            break;
        case '11':
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
        default:
            router.push('/');
            break;
    }
};
</script>
<style>
.nav_style {
    width: 100%;
    padding: 1px;
    position: fixed;
    top: 0;
    z-index: 999;
}
</style>

