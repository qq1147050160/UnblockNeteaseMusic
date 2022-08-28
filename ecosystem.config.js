module.exports = {
  apps : [{
    id: 2,
    name: 'unblockneteasemusic',
    script: './app.js',
    watch: '.',
    env: {
      ENABLE_FLAC: true,
      ENABLE_LOCAL_VIP: true,
      QQ_COOKIE: "pgv_pvid=147203025; ptui_loginuin=1147050160@qq.com; RK=Jnc9id6gaL; ptcz=f8479ef7ef49f548f35b8760599689f5f6d9e7bc1de1cea7949c8d4ec5fd3a5c; iip=0; tvfe_boss_uuid=c5e59f1ff79cb1f4; o_cookie=1147050160; _tc_unionid=10f8f599-52e7-49a9-a25f-cde86146e33c; pac_uid=1_1147050160; ariaDefaultTheme=undefined; fqm_pvqid=9adbedc5-c22f-4879-b4f5-fe90f00210cb; fqm_sessionid=957edcfd-8cbc-431a-a89e-4560dcb23ee8; pgv_info=ssid=s4053773218; ts_last=y.qq.com/; ts_refer=www.baidu.com/link; ts_uid=5952796572; euin=oK6kowEAoK4z7ecl7KnF7eckov**; wxuin=1152921504875084851; qm_keyst=W_X_5oPPTAV7Rm29LkoD-T_VgrsZG92UpBGREHO27JUln2duiBPu5GccEEkcGhY1O4XJnHGdG8VO3P3Y; wxopenid=opCFJw3eOH6o_2G2INjGNHMqbH4c; psrf_qqunionid=; psrf_qqopenid=; wxrefresh_token=60_T46N5ZV0epU5BgsjEvA5Ozu3p7yXtScrHdbJ8DgEOQqwt6s55dHQd1jRvoEPkNBJfHXXwxMDv0Ad8xLeutqGDhrQJoiFysm2nIZTjRzCT50; qqmusic_key=W_X_5oPPTAV7Rm29LkoD-T_VgrsZG92UpBGREHO27JUln2duiBPu5GccEEkcGhY1O4XJnHGdG8VO3P3Y; wxuin=1152921504875084851; tmeLoginType=1; psrf_qqaccess_token=; qm_keyst=W_X_5oPPTAV7Rm29LkoD-T_VgrsZG92UpBGREHO27JUln2duiBPu5GccEEkcGhY1O4XJnHGdG8VO3P3Y; psrf_qqrefresh_token=; wxunionid=oqFLxsskwddqsBi9zs_Ix-9Q1flk; login_type=2"
    },
    args: '-f 45.254.48.1',
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
