<template>
  <div class="sign-body">
    <img src="https://resources.iyanghong.cn/global/bg.jpg" class="bg-img">
    <div class="form-container sign-in-container">
      <div class="form-main">
        <h1>登录</h1>
        <div class="account-header-panel">
          <div class="header-border" v-if="loading"></div>
          <img
              :class="['account-header', { 'rotate-loop': loading }]"
              :src="userHeader"
              alt=""
          />
        </div>

        <div class="input-item">
          <i class="ts-icon-account"></i>
          <input type="text" v-model="account" placeholder="用户名|学号|工号">
        </div>

        <div class="input-item">
          <i class="ts-icon-lock"></i>
          <input type="password" v-model="password" placeholder="密码" @keyup.enter.native="handleLogin">
        </div>

        <button @click="handleLogin">立即登录</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      userHeader: 'https://resources.iyanghong.cn/global/noheader.jpg',
      account: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('account/login',{
        account : this.account,
        password : this.password
      }).then(response =>{
        if(response.success === true){
          this.$message.success("登录成功");
          this.$router.push('/console')
        }else{
          this.$message.error(response.message);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.sign-body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .bg-img {
    width: 1920px;
    height: 1080px;
    -o-object-fit: cover;
    object-fit: cover;
    z-index: -1;
    filter: blur(3px);
  }
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  transition: all .6s ease-in-out;

  button {
    margin-top: 15px;
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    -webkit-transition: -webkit-transform 80ms ease-in;
    transition: -webkit-transform 80ms ease-in;
    transition: transform 80ms ease-in;
    transition: transform 80ms ease-in, -webkit-transform 80ms ease-in;
    cursor: pointer;
  }

  .form-main {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }

  .icon-right {
    position: absolute;
    top: 50%;
    margin-top: -9px;
    right: 15px;
    font-size: 18px;
    cursor: pointer;
  }

  .account-header-panel {
    --account-header-size: 80px;
    height: calc(var(--account-header-size) + 4px);
    width: calc(var(--account-header-size) + 4px);
    margin: 10px 0;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    .header-border {
      width: 0;
      height: 0;
      border-width: var(--account-header-size);
      border-style: solid;
      border-top-color: #00ffff;
      border-left-color: #ff0000;
      border-bottom-color: #ffff00;
      border-right-color: #00ff00;
      position: relative;
      left: calc(var(--account-header-size) / 2 * -1);
      top: calc(var(--account-header-size) / 2 * -1);
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(359deg);
        }
      }
      animation: rotate 1s linear infinite;
    }

    .account-header {
      height: var(--account-header-size);
      width: var(--account-header-size);
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      z-index: 50;
    }
  }

  .input-item {
    position: relative;
    margin: 8px 0;
    width: 100%;

    .icon-right {
      top: 0;
      margin-top: 0;
      right: 5px;
      left: unset;
    }

    & > i {
      position: absolute;
      left: 2px;
      line-height: 36px;
      font-size: 20px;
    }

    & > i.right-icon {
      left: unset;
      right: 10px;
    }

    .login-account-list {
      top: 36px;
      padding-top: 10px;
      box-sizing: border-box;
    }

    &.email-verify-code {
      display: flex;
      flex-wrap: nowrap;
      height: 40px;

      button {
        display: block;
        padding: 8px;
        width: 140px;
        margin-left: 8px;
        box-sizing: border-box;
      }
    }
  }

  .login-account-list {
    width: 285px;
    background-color: #ffffff;
    position: absolute;
    top: 40px;
    border-radius: 0 0 20px 20px;
    z-index: 9999;
    padding-top: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .select-other-account {
      display: inline-block;
      text-align: center;
      width: 100%;
      height: 35px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .account-item {
      height: 50px;
      display: flex;
      flex-wrap: nowrap;
      position: relative;
      padding-bottom: 10px;

      .account-item-left {
        width: 60px;
        height: 50px;
        cursor: pointer;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 10px 0 0 10px;
        }
      }

      .account-item-right {
        position: relative;
        padding-left: 6px;

        span {
          display: block;
          text-align: left;
          width: 200px;
          cursor: pointer;
        }

        .account-name {
          font-weight: 600;
          font-size: 16px;
          margin-top: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .account-id {
          position: absolute;
          top: 22px;
          color: #888888;
          font-size: 14px;
        }
      }

      .icon-right {
        position: absolute;
        top: 50%;
        margin-top: -9px;
        right: 15px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }

  input {
    background: #eee;
    border: none;
    padding: 12px 25px;
    width: 100%;
    box-sizing: border-box;
    outline: none;
  }
}

</style>
