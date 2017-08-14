<template>
    <div>
        <mt-header title="全部出资详情" style="background: #555">
            <router-link to="/teaminfo" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right">结算</mt-button>
        </mt-header>
        <div>
            <div class="chuzi_list">
                <div class="chuzi_one">
                    <div>
                        <mt-cell title="出资人">
                            <span style="color: green">李轩</span>
                        </mt-cell>
                    </div>
                    <div>
                        <mt-cell title="需出资金额">
                            <span style="color: green">58</span>
                        </mt-cell>
                    </div>
                </div>
                <div class="chuzi_one">
                    <div>
                        <mt-cell title="出资人">
                            <span style="color: green">李轩</span>
                        </mt-cell>
                    </div>
                    <div>
                        <mt-cell title="需出资金额">
                            <span style="color: green">58</span>
                        </mt-cell>
                    </div>
                </div>
                <div class="chuzi_one">
                    <div>
                        <mt-cell title="出资人">
                            <span style="color: green">李轩</span>
                        </mt-cell>
                    </div>
                    <div>
                        <mt-cell title="需出资金额">
                            <span style="color: green">58</span>
                        </mt-cell>
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
            goto_quninfo(){

            }
        }
    }
</script>
<style>


</style>