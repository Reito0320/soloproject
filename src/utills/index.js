const { buildServer } = require('./app.js');
const app = buildServer();
const PORT = 3000;

app.listen(PORT, () => {
  console.log('サーバー起動します。');
});
