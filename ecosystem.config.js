module.exports = {
  apps : [{
    id: 2,
    name: 'unblockneteasemusic',
    script: './app.js',
    watch: '.',
    env: {
      ENABLE_FLAC: true,
      ENABLE_LOCAL_VIP: true,
      QQ_COOKIE: "uin=1147050160;qm_keyst=Q_H_L_56BwaKja2SIfGX2t3LE77hwAxUn8WfEM4MQdDW2lIVnh8tMLmU95tVA"
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
