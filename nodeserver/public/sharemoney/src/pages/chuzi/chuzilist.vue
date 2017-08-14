<template>
    <div>
        <mt-header :title="tittle" style="background: #555">
            <router-link to="/teaminfo" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
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
                        <mt-cell title="出资时间">
                            <span style="color: green">2012-12-12</span>
                        </mt-cell>
                    </div>
                    <div>
                        <mt-cell title="出资金额">
                            <span style="color: green">11</span>
                        </mt-cell>
                    </div>
                    <div>
                        <mt-cell title="用途">
                            <span style="color: green">大撒旦撒旦撒旦撒大苏打撒打算dad撒打算打</span>
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
            tittle:"2dada"
        }
    },
    mounted (){// TODO: mounted中部分方法需改用Promise
        if(this.$route.params.userId == "all"){
            this.tittle="全部出资列表"
        }else {
            this.tittle="近期出资列表"
        }
        console.log(this.$route.params.userId)
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
    .chuzi_one{
        position: relative;
        padding:.5rem;
        border: 1px solid #555555;
        overflow: hidden;
        border-radius: 3px;
        margin-top: .05rem;
    }

</style>