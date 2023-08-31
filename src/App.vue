<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navigation from './views/navigation/index.vue'

</script>

<template>
  <div id="body">


    <!-- HelloWorld HelloWorld! -->

    <Navigation />
    <!-- <HelloWorld msg="You did it!" /> -->
    <div class="routerView">
      <RouterView />
    </div>

    <el-popover placement="left" :width="200" trigger="click" >
      <template #reference>
        <div class="customer-service">
          联<br />
          系<br />
          客<br />
          服<br />
        </div>
      </template>
      <template #default>
        <div
         
        >
          <!-- <el-avatar
            :size="60"
            src="./assets/kefu.jpg"
            style="margin-bottom: 8px"
          /> -->
          <div>
            <img style="width: 180px;" src="./assets/kefu.jpg" alt="">
          </div>

          <p  style="margin: 0;text-align: center;">
            请扫码添加客服联系方式！
          </p>
        </div>
      </template>
    </el-popover>

<!-- 
    <el-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
      </template>
      <template #default>
        <div
          class="demo-rich-conent"
          style="display: flex; gap: 16px; flex-direction: column"
        >
          <el-avatar
            :size="60"
            src="https://avatars.githubusercontent.com/u/72015883?v=4"
            style="margin-bottom: 8px"
          />
          <div>
            <p
              class="demo-rich-content__name"
              style="margin: 0; font-weight: 500"
            >
              Element Plus
            </p>
            <p
              class="demo-rich-content__mention"
              style="margin: 0; font-size: 14px; color: var(--el-color-info)"
            >
              @element-plus
            </p>
          </div>

          <p class="demo-rich-content__desc" style="margin: 0">
            Element Plus, a Vue 3 based component library for developers,
            designers and product managers
          </p>
        </div>
      </template>
    </el-popover> -->



    <!-- <div class="hoverShow">
      123123
    </div> -->
    <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->

  </div>
</template>





<!-- 
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->


<style scoped>
#body {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color:#fff;
}


.customer-service {
  position: fixed;
  right: 10px;
  bottom: 160px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 99999;
  cursor: pointer
}

.hoverShow {
  position: fixed;
  right: 60px;
  z-index: 99999;
  bottom: 160px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: 160px;
  width: 160px;
}

.routerView {
  width: 100%;
  height: 100%;
}
</style>


