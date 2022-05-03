<script setup lang="ts"></script>

<template>
  <!-- NavBar Switch Page -->
  <div class="flex gap-3">
    <Btn>
      <router-link :to="{ path: '/translate' }">翻譯</router-link>
    </Btn>

    <Btn>
      <router-link :to="{ path: '/list' }">列表</router-link>
    </Btn>
  </div>


  <router-view></router-view>
</template>
