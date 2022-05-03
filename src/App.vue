<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import Header from '@/components/Header.vue'
import PageContent from '@/components/PageContent.vue'
</script>

<template>
  <div>
    <Layout>
      <Header></Header>
      <PageContent>
        <router-view></router-view>
      </PageContent>
    </Layout>
  </div>
</template>
