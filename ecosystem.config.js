module.exports = {
  apps : [{
    id: 2,
    name: 'unblockneteasemusic',
    script: './app.js',
    watch: '.',
    env: {
      ENABLE_FLAC: true,
      ENABLE_LOCAL_VIP: true,
      QQ_COOKIE: "uin=1147050160@qq.com;euin=oK6P7inkoe6son**;fqm_pvqid=98526151-e2a0-4409-8cf6-893f693f7164;fqm_sessionid=568571b3-71f3-42de-aa9c-af99bb21c703;qm_keyst=Q_H_L_5mhlHzw4ffnciKeRU83WzpLmFJY3PLBPCfwgyEpk0IUKBFrw5jAANig;qqmusic_key=Q_H_L_5mhlHzw4ffnciKeRU83WzpLmFJY3PLBPCfwgyEpk0IUKBFrw5jAANig;"
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
