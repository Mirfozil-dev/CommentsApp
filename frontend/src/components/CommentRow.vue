<template>
  <tr>
    <td>{{ comment.id }}</td>
    <td>{{ comment.comment_text }}</td>
    <td>{{ comment.created_at }}</td>
    <td class="d-flex justify-content-center">
      <button @click="deleteComment()" class="btn btn-danger">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CommentRow',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteComment() {
      this.$emit('deleteComment', this.comment.id);
    },
  },
};
</script>

<style scoped>
@media (max-width: 550px) {
  td {
    font-size: 0.7rem;
  }
}

@media (max-width: 450px) {
  td {
    font-size: 0.6rem;
  }
}

@media (max-width: 360px) {
  td {
    font-size: 0.5rem;
  }
}

</style>