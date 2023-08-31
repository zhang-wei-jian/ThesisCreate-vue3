<template>
    <div id="content">


        <h2>确认订单</h2>

        <el-form :model="form" label-width="120px">
            <el-form-item label="核对订单:">
                <!-- <div style="margin-right: 200px;"> 核对订单</div> -->
            </el-form-item>
            <el-form-item label="标题">
                标题内容
            </el-form-item>
            <el-form-item label="资料清单">
                <el-input type="file" />
            </el-form-item>
            <el-form-item label="增值服务">
                <!-- <el-radio-group v-model="radio1" class="ml-4">
                    <el-radio label="1" size="large">大专</el-radio>
                    <el-radio label="1" size="large">本科</el-radio>
                    <el-radio label="1" size="large">硕士</el-radio>
                </el-radio-group> -->
                <el-radio-group v-model="radio1">
                    <el-radio label="1" size="large" border>Option A</el-radio>
                    <el-radio label="2" size="large" border>Option B</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="支付订单">


            </el-form-item>
        </el-form>






    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const form = ref({
    name: '',
    region: ''
})
</script>

<style scoped>
#content {
    widows: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cheecked {
    /* margin-top: 200px; */
    /* padding: 50px; */
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
}
</style>
