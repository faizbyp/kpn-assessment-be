module.exports = {
  apps: [
    {
      name: "assessment_app",
      script: "index.ts",
      exp_backoff_restart_delay: 100,
    },
  ],
};
