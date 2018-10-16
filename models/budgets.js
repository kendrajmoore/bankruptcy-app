const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    housingName: { type: String, default: "housing" },
    housingAmount: { type: String, default: 0 },
    housingCategory: { type: String, default: "None" },
    foodName: { type: String, default: "food" },
    foodAmount: { type: String, default: 0 },
    foodCategory: { type: String, default: "None" },
    transportationName: { type: String, default: "transportation" },
    transportationAmount: { type: Number, default: 0 },
    transportationCategory: { type: String, default: "None" },
    insuranceName: { type: String, default: "insurance" },
    insuranceAmount: { type: Number, default: 0 },
    insuranceCategory: { type: String, default: "None" },
    clothingName: { type: String, default: "clothing" },
    clothingAmount: { type: Number, default: 0 },
    clothingCategory: { type: String, default: "None" },
    entertainmentName: { type: String, default: "entertainment" },
    entertainmentAmount: { type: Number, default: 0 },
    entertainmentCategory: { type: String, default: "None" },
    savingName: { type: String, default: "saving" },
    savingAmount: { type: Number, default: 0 },
    savingCategory: { type: String, default: "None" }
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
