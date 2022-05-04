<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useQuery, useQueryClient, useMutation } from 'vue-query'
import {
  apiNote2_List,
  apiNote2_Delete,
  apiNote2_Edit,
  apiNote2_Create
} from '@/apis/note2'
import Item from '@/components/Item.vue'
import { PlusIcon } from '@heroicons/vue/outline'
import MainDialog from '@/components/MainDialog.vue'
import type { Note2 } from '@/apis/note2'
import { cloneDeep } from 'lodash-es'
import { computed } from '@vue/reactivity'

/**
 * 使用refetchOnWindowFocus參數，避免開發時，因為devtools的開啟，多打api
 */

const queryClient = useQueryClient()

const { mutate: editMutate, isLoading: editLoading } = useMutation(
  (item: Note2) => apiNote2_Edit(item),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('list')
      isOpen.value = false
    }
  }
)

const { mutate: createMutate, isLoading: createLoading } = useMutation(
  (note: string) => apiNote2_Create(note),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('list')
      isOpen.value = false
    }
  }
)
const { mutate: deleteMutate, isLoading: deletLoading } = useMutation(
  (id: number) => apiNote2_Delete(id),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('list')
      isOpen.value = false
    }
  }
)

const isWIPLoading = computed(() => editLoading.value || createLoading.value)

const { isLoading, data: list } = useQuery('list', () => apiNote2_List(), {
  refetchOnWindowFocus: false
})

const isOpen = ref(false)

const WIPData = ref(createNewList()) as Ref<Note2>

const WIP_Type = ref('create')

function handlePlusClick() {
  WIP_Type.value = 'create'
  WIPData.value = createNewList()
  isOpen.value = true
}

function handleEditClick(item: Note2) {
  WIP_Type.value = 'edit'
  WIPData.value = cloneDeep(item)
  isOpen.value = true
}

function handleRemoveClick(item: Note2) {
  let [id] = item
  deleteMutate(id)
}

function handleSubmit() {
  if (WIP_Type.value === 'create') {
    createMutate(WIPData.value[1])
  } else {
    editMutate(WIPData.value)
  }
}

function createNewList(): Note2 {
  return [0, '']
}
</script>

<template>
  <div>
    <template v-if="isLoading">isLoading</template>

    <template v-else>
      <div class="flex flex-col gap-3">
        <Btn
          :initMoveUp="true"
          class="w-auto mx-auto rounded-full"
          @click="handlePlusClick"
        >
          <PlusIcon class="h-5 w-5" />
        </Btn>
        <Item
          v-for="item in list"
          :item="item"
          :key="item[0]"
          @remove="handleRemoveClick"
          @edit="handleEditClick"
        >
        </Item>
      </div>
    </template>

    <MainDialog v-model:isOpen="isOpen">
      <template #title v-if="WIP_Type === 'create'"> 新增 </template>
      <template #title v-else>
        {{ `修改: ${WIPData[0]}` }}
      </template>
      <template #description>
        <form @submit.prevent="handleSubmit">
          <label for="note" class="block text-sm font-medium text-gray-700"
            >Note</label
          >
          <input
            v-model="WIPData[1]"
            type="text"
            name="note"
            id="note"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </form>
      </template>

      <template #button>
        <div class="flex gap-3 justify-end">
          <Btn @click="handleSubmit" :disabled="isWIPLoading">送出</Btn>
          <Btn @click="isOpen = false" :disabled="isWIPLoading">關閉</Btn>
        </div>
      </template>
    </MainDialog>
  </div>
</template>
