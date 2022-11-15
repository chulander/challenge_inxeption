Disclaimer: This is a fictional assignment based on a fictional book. But, the applications to the real world are REAL.

The attack on Mordor is imminent so Saruman has haried a lot of Orcs to build out weapons. But some of the Orcs are not doing their job so Saruman wants to build a time-tracker system

The Orcs are being told to log the time the work in the time tracker system. Your job is to build a set of API to be able to do the following:
1. Create new Orcs in the system. No need to update or delete. Table to add the worker information is `mordor_worker`
2. Ability to let the Orcs log the following
	- Start a particular activity
	- Stop the previous activity
	- If an orc forgets to stop their previous activity, but start the new activity; the previous activity should be stopped with the current time as start time.

All activities should be stored in the worker_activity table

Example JSON for logging an activity
`{
"name": "Uruk Hai",
"activity_name": "melting",
"action": "Start"
}`


**Assignment**:
1. Build REST APIs to do what is described in the section above
2. Provide details on what the JSON and URIs look like
3. Provide test scripts that you use to test the API

**Additional information**
1. Attached is the SQLite Database
2. You can browse the SQLite database using the tool here https://sqlitebrowser.org/
3. The database.js has an sample code to connect to the database.
