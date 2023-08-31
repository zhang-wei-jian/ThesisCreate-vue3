<template>
    <div id="content">

        <p class="pWordSty">1、请上传需要转换的文件（pdf格式）
        </p>
        <p style="font-weight: bold;line-height: 50px;color: #93969c;font-size: 14px;" >注：文件上传过程中，请勿刷新页面，以免造成数据丢失、导致操作失败！</p>
        <el-upload   class="upload-demo" drag :action="uploadUrl" multiple :on-success="handleSuccess"
            :on-error="handleError">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖拽文件到这里 或者 <em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    （注：请上传pdf格式的文件）
                </div>
            </template>
        </el-upload>


        <div v-show="downFileUrl">
            <!-- <a :href="downFileUrl">点击下载word文件{{ downFileUrl }}</a> -->


            <el-tooltip class="box-item" effect="dark" :content="downFileUrl" placement="top-start">
                <a :href="downFileUrl"> <el-button style="background-color: #467af2;border: #467af2;width: 150px;"
                        type="primary">
                        点击下载文件</el-button></a>
            </el-tooltip>




            <!-- <a :href="downFileUrl" target="_blank">点击下载word文件{{ downFileUrl }}</a> -->
        </div>

        <!-- </el-card> -->
    </div>
</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 被代理转发，或上线当前地址
const uploadUrl = import.meta.env.VITE_API_BASE_URL + '/api/pdf2word'

const downFileUrl = ref('')

const handleSuccess = (res: any, file: any, fileList: any) => {
    console.log(res, file, fileList, '上传成功');

    if (res) {
        // 'https://s4.s100.vip:7147'
        const downUrl = res.url
        // 这里有值就是开发环境就使用固定的的地址，否则就是线上的地址使用当前地址
        downFileUrl.value = `${import.meta.env.VITE_API_BASE_URL ? 'https://s4.s100.vip:7147' : import.meta.env.VITE_API_BASE_URL}${downUrl}`
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
const handleError = (res: any, file: any, fileList: any) => {
    ElMessage.error('上传失败')
}
</script>



  
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
  
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

#content {
    /* padding-right: 200px; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-image: url('../../assets/backgroudBody.png'); */
    background-image: url('../../assets/backgroudBody.png');
    background-size: cover;
}

.pWordSty {
    font-weight: bold;
    line-height: 30px;
    /* margin-bottom: 20px; */
}

.titleShow{
    font-weight: bold;
    line-height: 50px;
    color: #93969c;
    font-size: 14px;
}
</style>
