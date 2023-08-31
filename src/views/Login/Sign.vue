<template>
    <div id="content1">

        <el-card class="card">


            <div class="conetent">
                <h3 style="text-align: center;">用 户 注 册</h3> <br />
                <el-form ref="formRef" :model="formData" label-width="120px" class="">
                    <el-form-item label="账号" prop="user" :rules="rule.user">
                        <el-input  style="width:220px" v-model="formData.user" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :rules="rule.password">
                        <el-input  style="width:220px"  type="password"  v-model="formData.password" />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword" :rules="rule.confirmPassword">
                        <el-input  style="width:220px"  type="password" v-model="formData.confirmPassword" />
                    </el-form-item>
                    <!-- <el-form-item label="邀请码" prop="confirmPassword">
                        <el-input  style="width:220px" v-model="code" />
                    </el-form-item> -->
                    <el-form-item>
                        <!-- <el-button type="primary" @click="submitForm">Submit</el-button> -->
                        <el-button style="background-color: #467af2;border: #467af2;" type="primary"
                        @click="submitForm">注 册</el-button>
                        <el-button @click="resetForm">清 空</el-button>
                        <el-button @click=" emit('changeState', 'login')">返回</el-button>

                    </el-form-item>
                    <el-form-item>
                    </el-form-item>



                </el-form>

            </div>
        </el-card>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElMessage } from 'element-plus';
import { reqSign } from "@/api/login"
import { useState } from "./hook.tsx"

const { formData: LoginformData } = useState()
const emit = defineEmits(['changeState']);
const formRef = ref();
// const state = ref('login');
const formData = ref({
    user: '',
    password: '',
    confirmPassword: '',
});

const code = ref('')

const rule = ref({
    user: [
        {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
        },

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
    confirmPassword: [
        {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
        },
        {
            validator: checkConfirmPassword,
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
                password: formData.value.password,
                code:code.value
            }
            const res = await reqSign(obj)
            console.log(res);

            if (res) {
                localStorage.setItem('access_token', res.access_token)
                ElMessage.success(res.msg);
                // changeStateHandle('home')
                LoginformData.value.user = formData.value.user
                LoginformData.value.password = formData.value.password

                console.log(LoginformData.value);

                changeStateHandle('login')
                emit('changeState', 'login');


            } else {
                ElMessage.error('登录失败', res.msg);
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


function checkConfirmPassword(rule, value, callback) {
    if (value !== formData.value.password) {
        callback(new Error('两次输入的密码不一致'));
    } else {
        callback();
    }
}

const changeStateHandle = (newState) => {
    console.log(newState);
    emit('changeState', newState);
};

</script>
  
<style scoped>
.body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}

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
  