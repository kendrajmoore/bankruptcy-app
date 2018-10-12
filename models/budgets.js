const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BudgetSchema = new Schema({
    createdAt: Date ,
    updatedAt: Date ,
    name: String,
    amount:  String ,
    category: String
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
