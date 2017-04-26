<template>
    <div class="groupChatPage">
        
        <div class="tips">
            您将发送消息给：
            <div class="list" v-if="type == 0">
                <span v-for="user in chatUserList">
                    {{user.name}}，
                </span>
            </div>
            <div class="list" v-if="type == 1">所有患者</div>
        </div>
        <div class="chat_body clearfix" id="content">
            <!-- 左边 文字 -->
            <div v-bind:class="{'left_flex': chat.type==0, 'right_flex': chat.type==1}" v-for="chat in contentList">
                <div class="left_header" v-bind:class="{'left_header': chat.type==0, 'right_header': chat.type==1}">
                    <img :src="chat.headImg" alt="">
                </div>
                <div class="left_txt" v-bind:class="{'left_header': chat.type==0, 'right_txt': chat.type==1}">
                    {{chat.content}}
                </div>
            </div>
        </div>
    
        <div class="chat_zone">
            
            <div class="chat_footer chat_footer_center" v-if="msgType">
                <!-- 输入框状态 -->
                <textarea name="" id="" v-model="chatContent"></textarea>
                <!-- 语音状态-->
            </div>
          
            <div class="chat_footer" @click="sendMsg" v-if="msgType">
                发送
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './groupChat.scss';
</style>

<script src="./groupChat">
    
</script>