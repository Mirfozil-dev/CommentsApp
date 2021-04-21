<template>
  <div id="app">
    <div class="container">
      <h1 class="text-center mt-3">
        Список комментяриев
      </h1>
      <comment-table :limit="3" class="mt-lg-5 mt-md-4 mt-sm-3" />
      <comment-form class="w-50 mt-3" />
    </div>
  </div>
</template>

<script>
import CommentTable from '@/components/CommentTable';
import CommentForm from '@/components/CommentForm';

export default {
  name: 'App',
  components: {
    CommentForm,
    CommentTable,
  },
};
</script>

<style scoped>
@media (max-width: 550px) {
  h1 {
    font-size: 2rem;
  }
}

@media (max-width: 450px) {
  h1 {
    font-size: 1.7rem;
  }
}
</style>
