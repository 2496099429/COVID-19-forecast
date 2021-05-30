<template>
    <div>
        <div style="text-align: center">
            <h2>{{time}}</h2>
            <button @click="btnBack" >返回</button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "DatePage",
        data(){
            return {
                time: ''
            }
        },
        methods: {
            btnBack(){
                this.$router.push('/usa');
            },
            initTime(){
                setInterval(() => {
                    this.time = this.getTime()
                })
            },
            getTime(){
                let date = new Date();
                return date.getFullYear() + '.' + (date.getMonth()+1) + '.' +date.getDate() + ' ' +
                    (date.getHours() < 10? '0'+ date.getHours() : date.getHours()) + ':' +
                    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
                    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            },

        },
        mounted() {
            this.initTime();
        }
    }
</script>

<style scoped>

</style>