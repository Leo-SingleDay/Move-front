<template>
  <div>
    <p>내용 : {{comment.content}}</p>
    <p>작성일: {{comment.created_at}}</p>
    <p>닉네임: {{comment.username}}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    comment : Object,
  },
  methods: {

  },
  created: function() {
    const created = new Date(this.comment.created_at)
    const timeDifference = new Date(Date.now())-created

    const diff_day = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24));
    const diff_hour = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diff_minute = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (diff_day) {
      this.comment.created_at = `${diff_day}일전`
    } else if(diff_hour) {
      this.comment.created_at = `${diff_hour}시간전`
    } else {
      this.comment.created_at = `${diff_minute}분전`
    }
  }
}
</script>

<style>

</style>