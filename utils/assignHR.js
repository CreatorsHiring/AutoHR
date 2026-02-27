const HR = require("../models/HR");

async function assignHR() {
  const hr = await HR.findOne({ isActive: true }).sort({ currentLoad: 1 });

  if (!hr) {
    throw new Error("No active HR available for assignment");
  }

  hr.currentLoad += 1;
  await hr.save();

  return hr;
}

module.exports = assignHR;

