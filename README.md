CONFIGURATION INSTRUCTIONS
--------------------------
ubuntu

MacOSX

mongodb

Nodejs

short-id

mongoose


INSTALLATION INSTRUCTIONS
-------------------------
clone/download this project

install all project dependencies


OPERATING INSTRUCTIONS
----------------------
(1) install and start mongod server

(2) launch mongo command line client

(3) run script  with appropriate parameter at the command line, like so:

    node add-discount-codes.js 1 511 0 2015 05 01 2015 05 14

(4) interact with mongo at the command line to verify that the new discount codes
have been successfully added to the promocode collection


WHAT the CODE DOES
------------------
Run the script at the command line with these trailing paramaters:

    node add-new-promocodes.js 2 888 0 2015 05 01 2015 05 14

Where:

    2 - is number of unique codes to be generated
    888 - is the id for the promotion where the new codes will be used against
    0 - is a boolean flag of 1 or zero - shows if code has already been consumed (i.e. re-deemed)
    2015 - is the year for the start of the promotion
    05 - is the month for the start of the promotion
    01 - is the day for the start of the promotion
    2015 - is the year for the end of the promotion
    05 - is the month for the end of the promotion
    14 - is the day for the end of the promotion

The out-put for this usecase will look like this:

    { "promotion_id" : 888,
    "discount_code" : "4kf0Z7Yf",
    "promotion_start" : ISODate("2015-05-01T01:24:01.794Z",
    "promotion_end" : ISODate("2015-05-31T01:24:01.794Z",
    "used" : 0, "unlimited" : 0,
    "updated" : ISODate("2015-04-29T01:24:01.794Z"),
    "created" : ISODate("2015-04-29T01:24:01.794Z"),
    "_id" : ObjectId("554032b10107bae76682acb1"),
    "__v" : 0 }

    { "promotion_id" : 888,
    "discount_code" : "4ylzCWXFz",
    "promotion_start" : ISODate("2015-05-01T01:24:01.794Z",
    "promotion_end" : ISODate("2015-05-31T01:24:01.794Z",
    "used" : 0, "unlimited" : 0,
    "updated" : ISODate("2015-04-29T01:24:01.794Z"),
    "created" : ISODate("2015-04-29T01:24:01.794Z"),
    "_id" : ObjectId("554032b10107bae76682acb1"),
    "__v" : 0 }


KNOWN BUGS
----------
Entering this at the command line:

    node add-new-promocodes.js 1 777 0 2015 07 01 2015 07 14

Produces the following out-put with errors in the ISODATE, where July (7) is converted to August (8):

    { "promocode" : "VJgbdecz",
      "promotion_id" : 777,
      "start" : ISODate("2015-08-01T04:00:00Z"),
      "end" : ISODate("2015-08-14T04:00:00Z"),
      "unlimited" : 0,
      "updated_at" : ISODate("2015-04-29T16:37:51.946Z"),
      "created_at" : ISODate("2015-04-29T16:37:51.946Z"),
      "consumed" : 0,
      "_id" : ObjectId("554108dfd7d9da3874340e41"),
      "__v" : 0 }

Manipulate variables thusly, in order to get around this Nodejs bug:

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

This yields the following results when storing to the collection:

    { "promocode" : "Vknuul5f",
      "promotion_id" : 777,
      "start" : ISODate("2015-07-01T04:00:00Z"),
      "end" : ISODate("2015-07-14T04:00:00Z"),
      "unlimited" : 0,
      "updated_at" : ISODate("2015-04-29T16:39:55.700Z"),
      "created_at" : ISODate("2015-04-29T16:39:55.700Z"),
      "consumed" : 0,
      "_id" : ObjectId("5541095b7596bd527492b8a2"),
      "__v" : 0 }


TESTING METHODOLOGY
-------------------
A stand-alone, server side script, made to run from the command line, or scheduled
via a job scheduler ( e.g. Cron ).

Modify at-will to make it require-able/call-able by another program.

Application was tested and successfully worked on on Ubuntu and MacOSX.


WAYS TO IMPROVE ON THIS CODE
----------------------------
(1) Remove console-level messaging

(2) Add Logging to log file

(3) Add data validation where appropriate, and including start and end dates
    ( e. g. end date should not be *before* start date, etc... )

(4) Improve on exception and error handling

(5) Incorporate as part of a larger project and include a client side app that displays/cosumes the contents of the collection


COPYRIGHT and LICENSING
-----------------------
Use and extend at will - credit the author.


TROUBLESHOOTING
---------------
console-level messaging for the app.

Standard admin-level troubleshooting for Mongodb and dependencies on Ubuntu and MacOSX.

Dependencies include: Mongooose, Short-id


CREDITS and ACKNOWLEDGEMENTS
----------------------------
    www.google.com
    https://www.npmjs.com/package/mongoose
    https://www.npmjs.com/package/short-id
    http://www.giantflyingsaucer.com/ - Chad Lung, who continues to be an incredible mentor
    on all things tech and I am forever grateful.


CHANGE LOG
---------
N/A


AUTHOR(S)
-------
Claudia Ventresca


CONTACT INFO
------------
Feel free to contact me via this github account to disucuss potential business
opportunities.
