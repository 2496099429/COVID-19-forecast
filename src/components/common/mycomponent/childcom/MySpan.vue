<template>
    <div class="my_span" >
        <div class="my_name"><slot name="name"></slot></div>
        <div class="my_data" :style="{color: cColor}"><strong><slot name="data"></slot></strong></div>
    </div>
</template>

<script>
    export default {
        name: "MySpan",
        props: {
            cColor: {
                type: String,
                default: 'rgba(9, 132, 227,1.0)'
            }
        }
    }
</script>

<style scoped>
    * {

    }

    .my_data {

    }


</style>