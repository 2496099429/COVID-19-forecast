<template>

    <div style="width: 100%;margin-top: 15px">

        <div style="position:relative;width: 19rem;max-width: 1035px;height: 130px;left: 50%;transform: translateX(-50%);background-color:white">

            <table style="width: 100%;height: 100%" >
                <tr>
                    <td><my-span c-color="pink"><span slot="name">新增确诊</span><span slot="data">{{addIll}}</span></my-span></td>
                    <td><my-span c-color="#77787b"><span slot="name">新增死亡</span><span slot="data">{{addDead}}</span></my-span></td>
                    <td><a href="javascript: void(0)" @click="dateClick" style="text-decoration: none;">
                        <svg t="1622120766471" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1693" width="32" height="32"><path d="M512 170.666667A341.333333 341.333333 0 1 1 170.666667 512 341.333333 341.333333 0 0 1 512 170.666667m0-85.333334a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z" p-id="1694" fill="#1296db"></path><path d="M648.746667 588.586667L554.666667 494.506667V277.333333a42.666667 42.666667 0 0 0-85.333334 0v234.666667a37.333333 37.333333 0 0 0 0 8.533333v2.346667a42.666667 42.666667 0 0 0 1.92 5.546667v1.706666a38.613333 38.613333 0 0 0 8.32 12.16l106.666667 106.666667A42.666667 42.666667 0 0 0 618.666667 661.333333a42.666667 42.666667 0 0 0 30.08-12.373333 42.666667 42.666667 0 0 0 0-60.373333z" p-id="1695" fill="#1296db"></path></svg>

                    </a> </td>
                </tr>
                <tr>
                    <td><my-span c-color="red"><span slot="name">累积确诊</span><span slot="data">{{totalIll}}</span></my-span></td>
                    <td><my-span c-color="black"><span slot="name">累积死亡</span><span slot="data">{{totalDead}}</span></my-span></td>
                    <td  ><my-span c-color="black"><span slot="name">病死率</span><span slot="data">{{deathRate}}</span></my-span></td>

                </tr>
            </table>


        </div>

    </div>

</template>

<script>
    import NowTime from "./childcom/NowTime";
    import MySpan from './childcom/MySpan'
    import axios from 'axios'
    import {getState} from "network/request";

    export default {
        name: "MyComponent",
        components: {
            NowTime,
            MySpan
        },
        data(){
            return {
                addIll: 0,
                totalIll: 0,
                addDead: 0,
                totalDead: 0
            }
        },
        computed: {
            deathRate(){
                return (this.totalDead/this.totalIll*100).toFixed(2)+'%';
            }
        },
        mounted() {
            this.getTotal();
        },
        methods: {
            getTotal(){
                getState({
                    url: 'http://192.168.31.206:8888/queryTotalEpidemicListByDate',
                    methods: 'get',
                    params: {
                        date_: '2020-5-19'
                    }
                },'totalByDate').then(res => {
                    let data = res[0];
                    this.addIll = data.addIll;
                    this.totalIll = data.totalIll;
                    this.addDead = data.addDead;
                    this.totalDead = data.totalDead;
                })
            },
            dateClick(){
                this.$router.push('/datepage')
            }
        }

    }
</script>

<style scoped>

    td {
        width: 33%;
        height: 50%;
    }

</style>