require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ email: 'admin@demo.com' });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('Admin@123', salt);
  const admin = new User({ name: 'Admin', email: 'admin@demo.com', password: hashed, role: 'admin' });
  await admin.save();
  console.log('Admin seeded: email=admin@demo.com password=Admin@123');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
