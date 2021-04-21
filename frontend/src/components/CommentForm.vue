<template>
  <form @submit.prevent="submit" class="d-flex">
    <input v-model="commentText" placeholder="Текст комментария" type="text"
           class="form-control mr-3"
    >
    <button type="submit" class="btn btn-primary">
      Добавить
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommentForm',
  data() {
    return {
      commentText: '',
    };
  },
  methods: {
    ...mapActions(['addNewComment']),
    submit() {
      this.addNewComment({
        comment_text: this.commentText,
      });
      this.commentText = '';
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  form {
    width: 80% !important;
  }
}

@media (max-width: 576px) {
  * {
    font-size: 0.7rem;
  }
  form {
    width: 100% !important;
  }
}
</style>