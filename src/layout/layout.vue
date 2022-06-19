<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Aside from './aside.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="h-screen">
        <el-aside width="200px" class="bg-gray-700 h-full">
          <Aside></Aside>
        </el-aside>
      <el-container class="h-full flex flex-col">
        <el-header class="h-12 bg-gray-700 shadow-md">
            <div class="text-white h-full flex items-center">
              早上好，灵希
            </div>
        </el-header>
        <el-main class="flex-1">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
</style>