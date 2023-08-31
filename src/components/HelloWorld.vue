<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="0"><img style="margin-right: 5px;width: 15px;height: 15px;" src="../assets//logo.svg" alt="">
      有限责任公司1</el-menu-item>
    <!-- <div class="flex-grow" /> -->
    <!-- <el-menu-item index="1">论文参考生成 </el-menu-item> -->
    <el-sub-menu index="1">
      <template #title>12</template>
      <el-menu-item>论文参考生成 </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">开题报告生成</el-menu-item>
    <el-menu-item index="3">论文降重</el-menu-item>
    <el-menu-item index="4">查询结果</el-menu-item>
    <el-menu-item index="5">签到领余额</el-menu-item>
    <el-menu-item index="6">系统管理</el-menu-item>
    <el-menu-item index="7">联系客服</el-menu-item>
    <el-menu-item index="8">PDF转Word</el-menu-item>
    <el-menu-item index="9">登录/注册/注销</el-menu-item>

    <!-- <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu> -->
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const activeIndex = ref('0')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  if (key == 1) {
    console.log("触发内容！");
    router.push('about')
  } else {
    router.push('/')
  }
}


</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>