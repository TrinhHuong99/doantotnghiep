<template>
    <div id="header">
        <b-container >
            <div class="flex-header">
                <!-- <b-col cols='12'>
                    <div id="logo" >
                        <router-link to="/">
                        <div class="logo-image">
                            <img src="@/assets/logo1.png">
                        </div>
                        </router-link>
                    </div>
                </b-col> -->
                <b-col cols='12' class="d-flex justify-content-center align-items-center">
                    <div class="title-header">
                        <img class="hide-mb" src="@/assets/text-header.png" alt="">
                        <img class="hide-pc" src="@/assets/text-headermb.png" alt="">
                    </div>
                </b-col>
            </div>
        </b-container>
    </div>
</template>
<style scoped>
    #logo img {
        width: 100%;
        z-index: 1;
    }

    #logo {
        position: relative;
    }
    #logo .logo-image{
        width: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        margin: auto;
    }
    .title-header span{
       text-shadow: 1px 2px 1px #87d2fd, 2px 5px 4px #1567bd;
        color: #f7c41a;
        font-size: 35px;
        font-weight: 900;
    }
  
    @media only screen and (max-width : 1024px) {
        .title-header span{
            font-size: 33px;
        }
        .row1 {
            margin-bottom: 30px;
        }
    }
    @media only screen and (max-width: 768px){
        #logo .logo-image {
            width: 100%;
            min-height: 100px;
            padding: 15px;
            margin: auto;
             max-width: 100px;
        }
        .title-header{
            text-align:center;
            margin-left: 10px;
        }
        .title-header span{
            font-size: 21px;
        }
    }
    @media only screen and (min-width: 768px)  and (max-width: 1023px){
        .title-header span {
            font-size: 24px;
        }
    }

    @media only screen and (max-width: 560px){
        #logo .logo-image {
            min-height: 80px;
            padding: 10px;
        }
    }

    @media only screen and (max-width: 400px){
        #logo .logo-image {
            min-height: 60px;
            padding: 0;
            max-width: 100px;
        }
    }
</style>