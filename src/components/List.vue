<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useQuery, useQueryClient, useMutation } from 'vue-query'
// https://tkdodo.eu/blog/effective-react-query-keys
// follow this post to find a place to store the query key, neither global nor local
import { listKeys } from '@/views/ListPage/queries.js'
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

/**
 * 使用refetchOnWindowFocus參數，避免開發時，因為devtools的開啟，多打api
 */

const queryClient = useQueryClient()

const creatMutationSuccess = () => ({
  onSuccess: () => {
    return queryClient.invalidateQueries(listKeys.all).then(() => {
      isOpen.value = false
    })
  }
})

const editList = useMutation(
  (item: Note2) => apiNote2_Edit(item),
  creatMutationSuccess()
)

const createList = useMutation(
  (note: string) => apiNote2_Create(note),
  creatMutationSuccess()
)
const deleteList = useMutation(
  (id: number) => apiNote2_Delete(id),
  creatMutationSuccess()
)

const { isLoading, data: list } = useQuery(
  listKeys.all,
  () => apiNote2_List(),
  {
    refetchOnWindowFocus: false
  }
)

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
  deleteList.mutate(id)
}

function handleSubmit() {
  if (WIP_Type.value === 'create') {
    createList.mutate(WIPData.value[1])
  } else {
    editList.mutate(WIPData.value)
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
          <Btn
            @click="handleSubmit"
            :disabled="editList.isLoading.value || createList.isLoading.value"
            >送出</Btn
          >
          <Btn
            @click="isOpen = false"
            :disabled="editList.isLoading.value || createList.isLoading.value"
            >關閉</Btn
          >
        </div>
      </template>
    </MainDialog>
  </div>
</template>
