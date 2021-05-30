<template>
    <div class="now_time">
        <div >当地时间</div>
        <div>{{nowTime}}</div>
    </div>

</template>

<script>
    export default {
        name: "NowTime",
        data(){
            return {
                nowTime: '',
            }
        },
        mounted() {
            this.getTime();
            setInterval(this.getTime,1000);
        },
        updated() {

        },
        methods: {
            getTime(){
                let date = new Date();
                this.nowTime = date.getFullYear() + '.' + (date.getMonth()+1) + '.' +date.getDate() + ' ' +
                    (date.getHours() < 10? '0'+ date.getHours() : date.getHours()) + ':' +
                    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
                    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            }
        }
    }
</script>

<style scoped>

    .now_time {


    }


</style>