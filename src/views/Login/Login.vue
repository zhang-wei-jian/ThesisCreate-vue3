<template>
    <div id="content1">
        <el-card class="card">
            <div class="conetent">
                <br />
                <h3 style="text-align: center;">系 统 登 录</h3>
                <br />

                <el-form ref="formRef" :model="formData" label-width="120px" class="">
                    <!-- <el-form-item label="昵称" prop="user" :rules="rule.user">
                    <el-input v-model="formData.user" />
                </el-form-item> -->
                    <el-form-item label="账号" prop="user" :rules="rule.user">
                        <el-input style="width:220px" v-model="formData.user" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :rules="rule.password">
                        <el-input type="password" style="width:220px" v-model="formData.password" />
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button style="margin-left: 20px;" type="primary" @click="submitForm">登 录</el-button> -->
                        <el-button style="background-color: #467af2;border: #467af2;margin-left: 20px;" type="primary"
                        @click="submitForm">登 录</el-button>
                        <el-button @click="resetForm">清 空</el-button>
                    </el-form-item>


                    <el-form-item>
                        <el-button  style="margin-left: 20px;" type="primary" link @click="changeStateHandle('sign')">还没有注册？去注册</el-button>
                    </el-form-item>
                </el-form>
            </div>


        </el-card>
    </div>
</template>
  
<script setup>
import { ref, toRefs } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElMessage } from 'element-plus';
import { reqLogin, reqUserInfo } from "@/api/login"
import { useState } from "./hook.tsx"
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore()
const { user } = userStore
console.log(userStore.user.password, 'store');

const { username, password } = user
// console.log(user);

const { formData } = useState()

const formRef = ref();
const props = defineProps({
    state: {
        type: String,

    },
});
const emit = defineEmits(['changeState']);
const { state } = toRefs(props);
// const formData = ref({
//     user: '',
//     password: '',

// });

const rule = ref({
    user: [
        {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
        },
        // {
        //     type: 'email',
        //     message: '请输入正确的邮箱',
        //     trigger: ['blur', 'change'],
        // },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
        {
            min: 6,
            message: '密码长度不能少于6位',
            trigger: 'blur',
        },
    ],

});

const submitForm = () => {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            console.log('submit!');
            const obj = {
                username: formData.value.user,
                password: formData.value.password
            }
            const res = await reqLogin(obj)


            console.log(res);
            console.log(res.access_token);
            if (res.access_token) {
                // localStorage.setItem('access_token', res.access_token)
                userStore.setUserStore({ access_token: res.access_token, ...obj })



                const resInfo = await reqUserInfo()
                console.log(resInfo, 'resInfo');
                userStore.setUserInfo(resInfo)



                ElMessage.success('登录成功');
                router.push('/')
                // changeStateHandle('home')
            } else {
                ElMessage.error('该账号存在异常！请联系系统管理员或客服！');
            }


        } else {
            ElMessage.error('请输入正确的账号密码');
            console.log('error submit!');
            return false;
        }
    });
};

const resetForm = () => {
    formRef.value?.resetFields();
};

const changeStateHandle = (newState) => {
    emit('changeState', newState);
};
const setUserAndPassword = (newState) => {

};


// function checkConfirmPassword(rule, value, callback) {
//     if (value !== formData.value.password) {
//         callback(new Error('两次输入的密码不一致'));
//     } else {
//         callback();
//     }
// }


</script>
  
<style scoped>
.card {
    width: 24%;
    height: 50%;
    border-radius: 10px;
    padding: 30px 50px;
}

.el-form {
    width: 100%;
    height: 100%;
}

.conetent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

#content1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-image: url('./lunwen.png'); */
    background-image: url('../../assets/backgroudBody.png');
    background-size: cover;
    padding-top: 200px;
}
</style>
  