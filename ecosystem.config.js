module.exports = {
  apps : [{
    id: 2,
    name: 'unblockneteasemusic',
    script: './app.js',
    watch: '.',
    env: {
      ENABLE_FLAC: true,
      ENABLE_LOCAL_VIP: true,
      QQ_COOKIE: "ptui_loginuin=1147050160@qq.com;o_cookie=1147050160;pac_uid=1_1147050160;fqm_pvqid=9adbedc5-c22f-4879-b4f5-fe90f00210cb;fqm_sessionid=2dce31b2-4ccf-43b1-a43a-03cde8c8731e;wxuin=1152921504875084851;wxrefresh_token=60_Iik9K0Gc3kEE-_HTOaPJrO1ZRhvwbBQejuLbSgJ0KdAtT0BiMOh_3KQCmB7zJWx1VIrh3xLCIpcdRf-1n7cCA-_o3OUWdaPeND6LGxHqZRc;wxopenid=opCFJw3eOH6o_2G2INjGNHMqbH4c;euin=oK6kowEAoK4z7ecl7KnF7eckov**;qm_keyst=W_X_5xAGqMtkH7dGiBenKuKhhoWGvXqEjHuPTH4HNoV69Td7qs_E1CMA53YA9IhDY9qtcPPSE-0frSys;qqmusic_key=W_X_5xAGqMtkH7dGiBenKuKhhoWGvXqEjHuPTH4HNoV69Td7qs_E1CMA53YA9IhDY9qtcPPSE-0frSys;wxunionid=oqFLxsskwddqsBi9zs_Ix-9Q1flk;"
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
