<template>
  <div id="header" class="flex gap-3 mb-5">
    <router-link :to="{ path: '/translate' }">
      <Btn>翻譯</Btn>
    </router-link>

    <router-link :to="{ path: '/listPage' }">
      <Btn>列表</Btn>
    </router-link>
  </div>
</template>
