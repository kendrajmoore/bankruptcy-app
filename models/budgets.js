const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    housingName: String,
    housingAmount: String,
    housingCategory: String,
    foodName: String,
    foodAmount: String,
    foodCategory: String,
    transportationName: String,
    transportationAmount: String,
    transportationCategory: String,
    insuranceName: String,
    insuranceAmount: String,
    insuranceCategory: String,
    clothingName: String,
    clothingAmount: String,
    clothingCategory: String,
    entertainmentName: String,
    entertainmentAmount: String,
    entertainmentCategory: String,
    savingName: String,
    savingAmount: String,
    savingCategory: String
});

BudgetSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("Budget", BudgetSchema);
