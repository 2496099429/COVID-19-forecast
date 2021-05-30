<template>
  <div >
    <div id="state-box" >
      <slot></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "StateBox"
  }
</script>

<style scoped>

  #state-box {
    /*border: 1px solid green;*/
    height: 430px;
    max-height: 430px;

    overflow: hidden;
    overflow-y: scroll;
    background-color: rgba(255,255,255,.6);
    padding-top: 2px;
    /*border-radius: 8px;*/
    /*margin-top: 2px;*/
    /*background-color: grey;*/
  }


</style>