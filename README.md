CONFIGURATION INSTRUCTIONS
--------------------------
ubuntu
MacOSX
short-id
mongoose
Nodejs
mongodb


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
(4) interact with mongo at the command line to verity new discount codes have been added to the


WHAT the CODE DOES
------------------
Run the script at the command line with these trailing paramaters:

    node add-discount-codes.js 3 888 0 2015 05 01 2015 05 14

sample mongodb output to the console:

    { "promotion_id" : 888, "discount_code" : "4kf0Z7Yf", "promotion_start" : ISODate("2015-05-01T01:24:01.794Z", "promotion_end" : ISODate("2015-05-31T01:24:01.794Z", "used" : 0, "unlimited" : 0, "updated" : ISODate("2015-04-29T01:24:01.794Z"), "created" : ISODate("2015-04-29T01:24:01.794Z"), "_id" : ObjectId("554032b10107bae76682acb1"), "__v" : 0 }

    { "promotion_id" : 888, "discount_code" : "4ylzCWXFz", "promotion_start" : ISODate("2015-05-01T01:24:01.794Z", "promotion_end" : ISODate("2015-05-31T01:24:01.794Z", "used" : 0, "unlimited" : 0, "updated" : ISODate("2015-04-29T01:24:01.794Z"), "created" : ISODate("2015-04-29T01:24:01.794Z"), "_id" : ObjectId("554032b10107bae76682acb1"), "__v" : 0 }

    { "promotion_id" : 888, "discount_code" : "NkZzAbmtz", "promotion_start" : ISODate("2015-05-01T01:24:01.794Z", "promotion_end" : ISODate("2015-05-31T01:24:01.794Z", "used" : 0, "unlimited" : 0, "updated" : ISODate("2015-04-29T01:24:01.794Z"), "created" : ISODate("2015-04-29T01:24:01.794Z"), "_id" : ObjectId("554032b10107bae76682acb1"), "__v" : 0 }


KNOWN BUGS
----------
Entering this:

    node add-discount-codes.js 1 777 0 2015 07 01 2015 07 14

Produces the following output with errors in the ISODATE:

    { "promocode" : "VJgbdecz", "promotion_id" : 777, "start" : ISODate("2015-08-01T04:00:00Z"), "end" : ISODate("2015-08-14T04:00:00Z"), "unlimited" : 0, "updated_at" : ISODate("2015-04-29T16:37:51.946Z"), "created_at" : ISODate("2015-04-29T16:37:51.946Z"), "consumed" : 0, "_id" : ObjectId("554108dfd7d9da3874340e41"), "__v" : 0 }

Manipulate variables thusly, in order to get around this JS bug:

    start_month = parseInt(process.argv.slice(6)),
    // handles bug in conversion because month gets set to +1 in the future
    start_month = start_month - 1

    { "promocode" : "Vknuul5f", "promotion_id" : 777, "start" : ISODate("2015-07-01T04:00:00Z"), "end" : ISODate("2015-07-14T04:00:00Z"), "unlimited" : 0, "updated_at" : ISODate("2015-04-29T16:39:55.700Z"), "created_at" : ISODate("2015-04-29T16:39:55.700Z"), "consumed" : 0, "_id" : ObjectId("5541095b7596bd527492b8a2"), "__v" : 0 }


TESTING METHODOLOGY
-------------------
A stand-alone, server side script, made to run from the command line, or scheduled
via a job scheduler ( e.g. Cron )
Modify at-will to make it require-able/call-able by another program.
Application was tested and successfully worked on on Ubuntu and MacOSX.


WAYS TO IMPROVE ON THIS CODE
----------------------------
(1) Remove console-level messaging
(2) Add Logging to log file
(3) Add data validation where appropriate, and including start and end dates /
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
Dependencies include: Mongooose, Short-id ( not to be confused with Mongoose-shortid )


CREDITS and ACKNOWLEDGEMENTS
----------------------------
    www.google.com
    https://www.npmjs.com/package/mongoose
    https://www.npmjs.com/package/short-id


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
