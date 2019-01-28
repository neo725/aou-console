<template>
    <div id="app" class="wrapper">
        <div class="sidebar" data-color="purple" data-background-color="white" data-image="./theme/material-dashboard-html-v2.1.1/assets/img/sidebar-1.jpg">
            <div class="logo">
                <a href="/" class="simple-text logo-normal">
                    AOU Admin
                </a>
            </div>
            <div class="sidebar-wrapper ps-container ps-theme-default">
                <ul class="nav">
                    <li class="nav-item active  ">
                        <a class="nav-link" href="./schedule">
                            <i class="material-icons">dashboard</i>
                            <p>Schedule</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style lang="scss">
    // #app {
    //     font-family: 'Avenir', Helvetica, Arial, sans-serif;
    //     -webkit-font-smoothing: antialiased;
    //     -moz-osx-font-smoothing: grayscale;
    //     text-align: center;
    //     color: #2c3e50;
    //     margin-top: 60px;
    // }

    // h1,
    // h2 {
    //     font-weight: normal;
    // }

    // ul {
    //     list-style-type: none;
    //     padding: 0;
    // }

    // li {
    //     display: inline-block;
    //     margin: 0 10px;
    // }

    // a {
    //     color: #42b983;
    // }
</style>