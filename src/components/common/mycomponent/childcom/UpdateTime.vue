<template>
    <div class="update_time">
        <div>数据更新至</div>
        <div>{{updateTime}}</div>
    </div>
</template>

<script>
    export default {
        name: "UpdateTime",
        mounted() {
            this.getTime();
        },
        data(){
            return {
                updateTime: ''
            }
        },
        methods: {
            getTime(){
                let localStorage = window.localStorage;
                let JTime = localStorage.getItem('lastTime');
                let Time = JSON.parse(JTime);
                let date = new Date(Time);
                this.updateTime = date.getFullYear() + '.' + (date.getMonth()+1) + '.' +date.getDate() + ' ' +
                    (date.getHours() < 10? '0'+ date.getHours() : date.getHours()) + ':' +
                    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
                    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

            }
        }
    }
</script>

<style scoped>

</style>