<template>
    <div style="background-color: #f1f1f1;">
        <div class="topPublicShow">

            <div class="textArr">
                <p class="slice-enter-active"  :key="text.id">
                    <!-- <el-icon><ChatLineRound /></el-icon> -->
                    系统公告： {{ text.value }}</p>
            </div>

            <!-- 公告：这是一条公告这是一条公告这是一条公告这是一条公告这是一条公告这是一条公告这是一条公告这是一条公告这是一条公告。。。 -->
            <!-- <p>
            <div id="wrapper" ref="wrapper">
                <div ref="notice_ul1">
                    <div v-for="item in noticeData" :key="item">{{ item }}</div>
                </div>
                <div ref="notice_ul2"></div>
            </div>

            </p> -->

        </div>
        <el-carousel :interval="5000" height="600px">
            <el-carousel-item>
                <div><img class="lunbo_img" src="./lunbo1.png" alt="">
                </div>
                <div @click="routerGO('lunwen')" class="twoImg"></div>

            </el-carousel-item>
            <!-- <el-carousel-item>
                <div><img class="lunbo_img" src="./lunbo2.png" alt="">
                </div>
                <div @click="routerGO('haoyou')" class="twoImg"></div>

            </el-carousel-item> -->
            <el-carousel-item>
                <div><img class="lunbo_img" src="./lunbo3.png" alt="">
                </div>
                <div @click="routerGO('qiandao')" class="threeImg"></div>
            </el-carousel-item>
        </el-carousel>

        <div class="center_body">
            <!-- <img style="border-radius: 5px;" src="./mode02.gif" alt=""> -->

            <p class="aboutUs">
                功能特点&nbsp;&nbsp;｜&nbsp;&nbsp;产品介绍&nbsp;&nbsp;｜&nbsp;&nbsp;关于我们
            </p>


            <div class="center_item">
                <img style="border-radius: 5px;" src="../../assets/lw.gif" alt="">
                <p>
                    "<span
                        style="color: #2163d9;font-size: 20px;font-weight: bold;">高效</span>学习，轻松无压力——通过友好的用户界面和简单的步骤，轻松生成高质量的论文和开题报告。无论处于学术生涯的哪个阶段，都能找到帮助，让学习变得轻松无压力。"
                </p>
            </div>

            <div class="center_item">
                <p> "珍惜时间，提高<span style="color: #2163d9;font-size: 20px;font-weight: bold;">效率</span>——一键 PDF 转 Word
                    功能，让文件格式转换不再困扰。专注于更重要的学术追求，通过智能论文助手，享受快速高效的服务，让时间可以更有价值地利用，让学习变得轻松愉快。"
                </p>
                <img style="border-radius: 5px;" src="../../assets/bj.gif" alt="">

            </div>

            <div class="center_item">
                <img style="border-radius: 5px;" src="../../assets/jc.gif" alt="">
                <p> "保护学术<span
                        style="color: #2163d9;font-size: 20px;font-weight: bold;">诚信</span>——智能降重功能，让论文原创性有了保障。智能论文工具，提供更高效、更简单的方式完成学术任务，提高学术成果的质量和影响力。每一篇论文都是独特思考的体现，这里提供的工具，旨在帮助更好地表达思考。"
                </p>
            </div>

            <div class="center_item">
                <p> "<span
                        style="color: #2163d9;font-size: 20px;font-weight: bold;">随时随地</span>，尽在掌握——无论何时何地，处理论文问题都不再困扰。手动降重功能，确保论文完全符合学术规范，让论文写作过程更放心、更有保障。无论在家里，图书馆，甚至在旅途中，智能论文助手都能提供服务，让学术生涯更无忧无虑。"
                </p>
                <img style="border-radius: 5px;" src="../../assets/sd.gif" alt="">

            </div>
            <!-- <div class="center_item">
                <img style="border-radius: 5px;" src="./mode02.gif" alt="">
                <p>123123</p>
            </div> -->
        </div>
        <div class="bottomSlogin">
            <el-row>
                <el-col :span="8">
                    <div class="Slogin_model">
                        <p>联系热线：231231123</p>
                        <p>线上联系：234234</p>
                        <p>邮箱联系：15123123@xx.com</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="Slogin_model">
                        <p>合作意向</p>
                        <p>商务合作</p>
                        <p>改进意见</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="Slogin_model">
                        <p>系统反馈</p>
                        <p>优化方案</p>
                        <p>©️版权说明</p>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script setup>

import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router';
import { getNotice } from '@/api/indexconfig'

const router = useRouter();


const scroll = reactive({
    number: 0,
    textArr: [
   {
    content:'公告生成中 ...'
   }
]
})

//滚动公告
const startMove = () => {
    let timer = setInterval(() => {
        if (scroll.number === scroll.textArr.length - 1) {
            scroll.number = 0;
        } else {
            scroll.number += 1;
        }
    }, 5000); // 滚动不需要停顿则将2000改成动画持续时间
}
startMove()
// startMove() {
//     // eslint-disable-next-line
//     let timer = setInterval(() => {
//         if (this.scroll.number === this.scroll.textArr.length - 1) {
//             this.scroll.number = 0;
//         } else {
//             this.scroll.number += 1;
//         }
//     }, 5000); // 滚动不需要停顿则将2000改成动画持续时间
// },

const getNoticeList = async ()=>{
    const list = await getNotice();
    console.log("list ===> ",list);
    scroll.textArr = list
}

getNoticeList();

const text = computed(() => {
    // 注意必须return(否则newMoney没有值)
    return {
        id: scroll.number,
        value: scroll.textArr[scroll.number].content
        // color: scroll.textArr[scroll.number].color,
    }
})
const routerGO = (params) => {
    console.log("emit @")
    if (params == 'lunwen') {
        router.push('/ThesisCreate/NormalCreate');
    } else if (params == 'haoyou') {

    } else if (params == 'qiandao') {
        router.push('CheckBalance')
    }
}

</script>

<style scoped>

.textArr{
    text-align: center;
    font-weight: bold;
    /* color: #2163d9; */
    color: #000000;
    /* background-color: #f1f1f1; */
}
.topPublicShow {
    padding-top: 5px;
    margin-top: 50px;
    height: 35px;
    /* text-align: center; */
    padding-left: 30px;
    line-height: 35px;
    font-size: 14px;
    padding-bottom: 5px;
    background-color: #f1f1f1;
}

.aboutUs {
    font-weight: bold;
    line-height: 80px;
    background-color: white;
    font-size: 20px;
    /* margin-top: 30px; */
    /* border-radius: 15px; */
}

.center_item {
    /* background-color: white; */
    border-radius: 15px;
    /* padding: 20px; */
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    justify-content: center;
    margin-top: 45px;
    margin-bottom: 45px;
    background-color: white;
    margin-left: 240px;
    margin-right: 240px;
    /* width: 1200px; */
}

.center_item:hover {
    /* background-color: red; */
    transform: all 02s ease-in-out;
    box-shadow: 6px 6px 16px #2163d9;

}

.center_item p {
    width: 600px;
    /* font-weight: bold; */
    font-size: 16px;
    margin-left: 20px;
    margin-top: 60px;
    font-family: "楷体";
    cursor: pointer;

    /* display: flex;
    justify-self: start; */
}

.center_item img {
    margin-left: 20px;

}

.threeImg {
    z-index: 888;
    width: 220px;
    height: 65px;
    /* background-color: red; */
    position: absolute;
    bottom: 172px;
    left: 470px;
    cursor: pointer;
}

.twoImg {
    z-index: 888;
    width: 220px;
    height: 65px;
    /* background-color: red; */
    position: absolute;
    bottom: 188px;
    left: 484px;
    cursor: pointer;
}

.Slogin_model p {
    cursor: pointer;
}

.center_body {
    background-color: #f1f1f1;
    /* width: 100%; */
    /* margin-left: 7%;
    margin-right: 7%; */
    text-align: center;
    /* padding-top: 20px; */
    margin-top: 50px;
    padding-bottom: 20px;
}

.Slogin_model {
    color: #fff;
}

.Slogin_model p {
    margin-top: 30px;
    font-size: 14px;
}

.bottomSlogin {
    height: 200px;
    widows: 100%;
    background-color: #000000;
    text-align: center;
    /* position: absolute;
    bottom: 0; */
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.lunbo_img {
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
}
</style>

