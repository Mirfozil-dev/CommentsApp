<template>
  <div>
    <div v-if="status !== ''"
         :class="status === 'Коментарий добавлен!' ? 'badge-success' : 'badge-danger'"
         class="badge  px-2 px-1 mb-2">
      {{ status }}
    </div>
    <table class="table table-bordered">
      <thead class="font-weight-bold">
      <tr>
        <td>#</td>
        <td>Текст комментария</td>
        <td>Дата публикации</td>
        <td class="d-flex justify-content-center">Действия</td>
      </tr>
      </thead>
      <tbody>
      <comment-row @deleteComment="deleteComment" v-for="comment in comments" :comment="comment" :key="comment.id" />
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <button class="btn" @click="decrement">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button @click="changePage(page)" :class="{ 'active': page === currentPage }" v-for="page in pagesCount"
              :key="page"
              class="btn">{{ page }}
      </button>
      <button class="btn" @click="increment">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import CommentRow from '@/components/CommentRow';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CommentTable',
  components: {
    CommentRow,
  },
  data() {
    return {};
  },
  watch: {
    currentPage: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$store.dispatch('getComments', val);
      },
    },

  },
  updated() {
    this.$store.dispatch('getPagesCount');
    if (this.comments.length < 3 && this.pagesCount !== this.currentPage) {
      this.$store.dispatch('getComments', this.currentPage);
    }
    if (this.currentPage > this.pagesCount) {
      this.decrement();
    }
  },
  methods: {
    ...mapMutations(['setCurrentPage']),
    deleteComment(id) {
      this.$store.dispatch('deleteComment', id);
      this.$store.dispatch('getComments', this.currentPage);
    },
    changePage(page) {
      this.setCurrentPage(page);
    },
    increment() {
      if (this.currentPage < this.pagesCount) {
        this.setCurrentPage(this.currentPage + 1);
      }
    },
    decrement() {
      if (this.currentPage > 1) {
        this.setCurrentPage(this.currentPage - 1);
      }
    },
  },
  computed: {
    ...mapGetters(['comments', 'pagesCount', 'status', 'currentPage']),
  },
};
</script>

<style scoped>
.active {
  background: #dcdcdc;
}

@media (max-width: 550px) {
  * {
    font-size: 0.7rem;
  }
}

@media (max-width: 450px) {
  * {
    font-size: 0.6rem;
  }
}

@media (max-width: 360px) {
  td {
    font-size: 0.4rem;
  }
}
</style>