const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankruptcySchema = new Schema({
    housingBankruptcy: { type: Number, default: 0 },
    taxBankruptcy: { type: Number, default: 0 },
    housingCategory: { type: Number, default: 0 },
    mortageBankruptcy: { type: Number, default: 0 },
    rentBankruptcy: { type: Number, default: 0 },
    homeBankruptcy: { type: Number, default: 0 },
    carBankruptcy: { type: Number, default: 0 },
    insuranceBankruptcy: { type: Number, default: 0 },
    medicalBankruptcy: { type: Number, default: 0 },
    legalBankruptcy: { type: Number, default: 0 },
    pendingBankruptcy: { type: Number, default: 0 },
    pendingLegalBankruptcy: { type: Number, default: 0 },
    savingBankruptcy: { type: Number, default: 0 },
    totalSavingBankruptcy: { type: Number, default: 0 }
});

module.exports = mongoose.model("Bankruptcy", BankruptcySchema);
