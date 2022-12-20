<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus';
import { useAuthorStore } from '~/stores/author';

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  FormInstance,
  FormRules,
} from 'element-plus';

provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0,
});

const authorStore = useAuthorStore();
const authors = await authorStore.getAuthors();

// const { authors } = await useAsyncData('authors', () =>
//   $fetch('https://63a1958ba543280f775b0a50.mockapi.io/authors')
// );

const formRef = ref<FormInstance>();

const form = reactive({
  name: '',
  authors: authors,
  books: [
    {
      id: '',
      name: '',
      createdAt: ''
    },
  ],
});

async function changeAuthor(event) {
  const data = await $fetch(
    'https://63a1958ba543280f775b0a50.mockapi.io/books'
  );
  form.books = data;
}

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Please enter a suitable name.',
      trigger: 'blur',
    },
    {
      min: 3,
      message: 'Length should be minimum 3 characters.',
      trigger: 'blur',
    },
  ],
});

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', fields);
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>

<template>
  <div>
    <ClientOnly>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      size="large"
      label-position="top"
    >
      <el-form-item label="Library name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="Select author">
        <el-select
          v-model="form.authors"
          placeholder="Select author"
          @change="changeAuthor"
        >
          <el-option
            v-for="author in authors"
            :key="author.id"
            :label="author.name"
            :value="author.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Select book">
        <el-select v-model="form.books" default-first-option>
          <el-option
            v-for="book in form.books"
            :key="book.id"
            :value="book.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit(formRef)">Continue</el-button>
      </el-form-item>
    </el-form>
    </ClientOnly>
  </div>
</template>
