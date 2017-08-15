<template>
    <div>
        <mt-header title="群消息" style="background: #555">
            <router-link to="/my" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div>
            <div>
                <div class="qun_list">
                    <div class="qunone" @click="goto_quninfo">
                        <div>
                            <img src="../../assets/tx.jpg" alt="">
                        </div>
                        <div>
                            <div class="qun_inof">
                                <div>勤拂来敲门</div>
                                <button @click="confirm_team">确认</button>
                            </div>
                        </div>
                        <div class="shenqingren">申请人：小轩在1不在</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Cell } from 'mint-ui';
    import { Header } from 'mint-ui';
    export default {
        components: {

        },
        data () {
            return {

            }
        },
        mounted (){// TODO: mounted中部分方法需改用Promise

        },
        computed: {
        },

        methods: {
            confirm_team(){
                    
            }
        }
    }
</script>
<style>
    .qun_inof button{
        border: none;
        outline: none;
        color: #ffffff;
        background: #555555;
        position: absolute;
        right: 0.5rem;
        width: 1.5rem;
        height:.8rem;
        line-height:.8rem;
        bottom: .2rem;
    }
    .shenqingren{
        position: absolute;
        font-size: .4rem;
        text-align: center;
        bottom: 0.2rem;
        right: 50%;
        transform: translateX(50%);
    }
</style>