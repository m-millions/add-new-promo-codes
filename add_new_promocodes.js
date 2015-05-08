/*
  To run the script type, in the directory where teh app lives, type the
  following: node add-promo-codes.js 1 511 0 2015 05 01 2015 05 14
  - where "2015 05 01 2015 05 14" represents start and end dates.
  If promotion code is set with leading zeros it will truncate at the position
  of the nearest whole number > 0 <<< entering '007' at command prompt,
  yeilds '7' in code
*/
if (process.argv.length != 11){
    console.log("usage: node add-promo-codes.js num_codes \
                        promotion_id unlimited start_year start_month \
                        start_day end_year end_month end_day");
    return;
}

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
var mongoose = require("mongoose");
var ShortId = require("shortid");
var uristring = 'mongodb://localhost/picasso';
mongoose.connect(uristring, function (err, res) {
  if (err) {
    //TODO: Write exceptions and erros to log file(s)
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    return;
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});
// Define and populate the a PromoCode related variables for storing to the
// collection
var num_codes = parseInt(process.argv.slice(2)),
    promotion_id = parseInt(process.argv.slice(3)),
    // Handles the conversion of the START DATE for the Promotion
    start_year = parseInt(process.argv.slice(5)),
    start_month = parseInt(process.argv.slice(6)),
    // handles bug in Nodejs date conversion because month get sets to +1 in the
    // future - detailed in full in README.md
    // TODO: Test code against iojs to see if bug persists
    start_month = start_month - 1
    start_day = parseInt(process.argv.slice(7)),
    start = new Date(start_year, start_month, start_day)
    // Handles the conversion of the END DATE for the Promotion
    end_year = parseInt(process.argv.slice(8)),
    end_month = parseInt(process.argv.slice(9)),
    // handles bug in JS date conversion because month get set to +1 in the
    // future - detailed in full in README.md
    end_month = end_month - 1
    end_day = parseInt(process.argv.slice(10)),
    end = new Date(end_year, end_month, end_day)
    unlimited = parseInt(process.argv.slice(4)),
    updated = new Date(),
    created = new Date(),
    //TODO: Changed consumption variable to a boolean
    consumed = 0;
// Remove persistance to the console at will
console.log ('Successfully created and set PromoCode variables.');

// Create Promocode Schema
var promocodeSchema = new mongoose.Schema({
    promocode: String,
    promotion_id: Number,
    start: Date,
    end: Date,
    unlimited: Number,
    created: Date,
    updated: Date,
    consumed: Number
});
// Remove persistance to the console at will
console.log ('Successfully created promocodeSchema.');

// This funciton creates and saves the new PromoCode to the Mongodb
// collection: promocodes
function addNewPromoCode(PromoCode, promocodesi){
    // Instanciate a promocodeModel
    var newPromoCode = new PromoCode({
        promocode: promocodesi, promotion_id: promotion_id,
        start: start, end: end, unlimited: unlimited,
        updated: updated, created: created,
        consumed: consumed
    });
    // Remove persistance to the console at will
    console.log ('Successfully created newPromoCode.');
    // Save newPromoCode to the database
    // TODO: Throw/Catch additional exceptions/erros and write
    // them to a log file
    newPromoCode.save(function(err) {
        if (err) {
        console.log ('Error on save!' + err);
        return;
        }
    });
};

// Create PromoCode Model
var PromoCode = mongoose.model('PromoCodes', promocodeSchema);
// Remove persistance to the console at will
console.log ('Successfully created PromoCode.');
// Iterate through the number of promocodes to be created
// Creates one unique PromoCode per earch iteration
for (var i = 0; i < num_codes; i++){
    var promocodesi = ShortId.generate();
    addNewPromoCode(PromoCode, promocodesi);
};
