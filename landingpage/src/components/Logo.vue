<template>
    <div id="logo">
        <router-link to="/">
            <div class="logo-image">
                <img src="@/assets/logo.png" alt="">
            </div>
        </router-link>
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
        width: 100px;
        padding: 10px 20px;
        background-color: #fff;
        border: 2px solid #000;
        border-top: none;
        border-radius: 0px 0px 15px 15px;
        position: relative;
        z-index: 2;
    }

    #logo::after {
        content: '';
        position: absolute;
        bottom: -5px;
        height: 39px;
        width: 100px;
        background-color: #c90606;
        left: 0;
        z-index: 0;
        border-radius: 0px 0px 15px 15px;
        border: 2px solid #000;
    }
</style>