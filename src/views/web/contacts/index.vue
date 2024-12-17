<script setup lang="ts">
</script>
<template>
	<div class="contact_view">
	   <div class="contact_slide">
       <div class="head">
         <span><i class="iconfont icon-sousuo"></i>搜索</span>
         <span><i class="iconfont icon-tianjiaqunliao"></i>添加群聊</span>
       </div>
       <div class="contact_menu">
         <el-menu default-active="3">
           <el-sub-menu index="1">
             <template #title>
               <span>我创建的群聊</span>
             </template>
           </el-sub-menu>
           <el-sub-menu index="2">
             <template #title>
               <span>我加入的群聊</span>
             </template>
           </el-sub-menu>
           <el-sub-menu index="3">
             <template #title>
               <span>我的好友 2/4</span>
             </template>
             <div class="friend_list">
                <div class="item" v-for="item in 12" :key="item.id">
                 <div class="avatar">
                   <img src="https://cn.bing.com/images/search?view=detailV2&ccid=w7DxxcsE&id=B6754DC871A2AEC7A0118D7868A9B83A5CB46EA4&thid=OIP.w7DxxcsEH2Gvgl9tHU2ijwAAAA&mediaurl=https%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202209%2F24%2F20220924192544_94973.thumb.400_0.jpg&exph=400&expw=400&q=%E5%A4%B4%E5%83%8F%E5%8A%A8%E6%BC%AB&simid=608048738745918039&FORM=IRPRST&ck=B7912B944793E8692401676A6C20C570&selectedIndex=107&itb=0&cw=1145&ch=608&ajaxhist=0&ajaxserp=0" alt="">
                   <div class="online_status"></div>
                 </div>
                 <div class="info">
                   <div class="nickname">mimi(<span class="notice">xxx</span>)</div>
                   <div class="abstract">这是我的简介</div>
                 </div>
               </div>
             </div>
           </el-sub-menu>
         </el-menu>
       </div>
	   </div>
    <div class="contact_main">
      <router-view></router-view>>
    </div>
	</div>
</template>

<style lang="scss">
.contact_view {
  width: 100%;
  display: flex;
  height: 100%;
  .contact_slide{
    width: 200px;
    border-right: 1px solid #e7e7e7;
    height: 100%;
    .head{
      height: 40px;
      padding: 0 5px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content:space-between;
      border-bottom: 1px solid #e7e7e7;
      color:#555;
      span{
        cursor: pointer;
      }
      i{
        margin-right: 5px;
      }
    }
  }
  .contact_menu{
    height:calc(100% - 40px);
    overflow: auto;
     .el-menu{
       .el-sub-menu__title{
         height:40px;
         font-weight:600;
         padding:0 10px;
       }
       .friend_list{
         width: 100%;
         .item{
           height:40px;
           display: flex;
           padding:10px;
           align-items: center;
           cursor: pointer;

           &:hover{
             background-color: #f6f6f6;
           }
           .avatar{
             position: relative;
             width:40px;
             display: flex;
             align-items: center;

             img{
               width:35px;
               height:35px;
               border-radius: 5px;
               object-fit:cover;
             }
           }
           .info{
             width:calc(100% - 45px);
             font-size: 14px;
             .nickname{
               font-weight: 600;
             }
             .abstract{
               color: #555;
             }
           }
         }
       }
     }
  }

  .contact_main{
    width: calc(100% - 200px);
  }
}

</style>
