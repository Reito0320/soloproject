const { buildServer } = require('../app.js');
const app = buildServer();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sever running on http://localhost:${PORT}`);
});
