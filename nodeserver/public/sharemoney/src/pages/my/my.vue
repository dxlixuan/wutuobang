<template>
    <div>
        <div>
            <div class="my_tx_warp">
                <img src="../../assets/tx.jpg" alt="">
                <div>
                    <p v-text="user.name" @click="chang_user_name"></p>
                </div>
            </div>
            <div class="my_btn_list">
                <div>
                    <mt-cell title="群消息" is-link>
                        <span style="color: green">
                            <mt-badge size="small" color="#ff5000">10</mt-badge>
                        </span>
                    </mt-cell>
                </div>
                <div>
                    <mt-cell title="查找群" is-link>
                        <span style="color: green"></span>
                    </mt-cell>
                </div>
                <div>
                    <mt-cell title="创建群" is-link>
                        <span style="color: green"></span>
                    </mt-cell>
                </div>
                <mt-button @click="logout" size="large" style="background: #ff5000;color: #ffffff;margin-top: 1rem">退出登录</mt-button>
            </div>
        </div>
        <tabs currentTab="3"></tabs>
    </div>
</template>
<script>
import axios from 'axios'
import Tabs from '../../component/tabs.vue'
import { MessageBox } from 'mint-ui';
import { Cell } from 'mint-ui';

export default {
    components: {
        Tabs,
    },
    data () {
        return {
            user:{
                name:'小轩在不在',
                phone:''
            },
        }
    },
    mounted (){// TODO: mounted中部分方法需改用Promise
            //this.user.phone = localStorage.getItem('wutuobang_user');
    },
    computed: {
    },

    methods: {
        chang_user_name(){
            MessageBox.prompt('请输入姓名',"更改用户名").then(({ value, action }) => {
                /*axios.post('/changeusername', {
                    user_phone: this.phone,
                    user_name : value
                })
                    .then(function (response) {
                        if(response.status == 200){
                            localStorage.setItem("wutuobang_user",{phone:response.phone})
                            mint.Toast({
                                message: '登录成功',
                                position: 'bottom',
                                duration: 3000,
                                className : "chengtoast"
                            });
                        }else {
                            mint.Toast({
                                message: response.data,
                                position: 'bottom',
                                duration: 3000,
                                className : "redtoast"
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });*/
            });
        },
        logout(){
            localStorage.removeItem("wutuobang_user");
            window.location.reload();
        }
    }
}
</script>
<style>
    .my_tx_warp{
        padding:1.5rem 1rem;
        background: #555555;
        position: relative;
    }
    .my_tx_warp > div{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .my_tx_warp > div p{
        color: #ffffff;
        width:4rem;
        font-size: .5rem;
        line-height:1.5rem;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .my_tx_warp img{
        display: block;
        width:1.5rem;
        border-radius: 1.5rem;
    }
    .my_btn_list{
        padding-top: 1rem;
    }

</style>