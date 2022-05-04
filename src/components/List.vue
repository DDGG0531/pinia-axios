<script setup lang="ts">
import { useQuery } from 'vue-query'
import { apiNote2_List } from '@/apis/note2'
import Item from '@/components/Item.vue'
import { PlusIcon } from '@heroicons/vue/outline'

/**
 * 使用refetchOnWindowFocus參數，避免開發時，因為devtools的開啟，多打api
 */
const { isLoading, data: list } = useQuery('list', apiNote2_List, {
  refetchOnWindowFocus: false
})
</script>

<template>
  <template v-if="isLoading">isLoading</template>
  <template v-else>
    <div class="flex flex-col gap-3">
      <Btn :initMoveUp="true" class="w-auto mx-auto rounded-full">
        <PlusIcon class="h-5 w-5" />
      </Btn>
      <Item :id="item[0]" :note="item[1]" v-for="item in list" :key="item[0]">
      </Item>
    </div>
  </template>
</template>
