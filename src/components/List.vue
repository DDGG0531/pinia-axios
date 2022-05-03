<script setup lang="ts">
import { useQuery } from 'vue-query'
import { apiNote2_List } from '@/apis/note2'
import Item from '@/components/Item.vue'

const { isLoading, data: list } = useQuery('list', apiNote2_List)
</script>

<template>
  <template v-if="isLoading">isLoading</template>
  <template v-else>
    <div class="flex flex-col gap-3">
      <Item :id="item[0]" :note="item[1]" v-for="item in list" :key="item[0]">
      </Item>
    </div>
  </template>
</template>
