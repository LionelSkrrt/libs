const express = require('express');
const cors = require('cors');
require('dotenv').config();

const loanRoutes = require('../routes/loanRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'Library Book Loan REST API',
    status: 'Active',
    endpoints: {
      loans: '/api/loans'
    }
  });
});

app.use('/api/loans', loanRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

if (process.env.NODE_ENV !== 'production' && require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
