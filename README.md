First you need to set up confi files. Copy auth.config.js.local and db.config.js.local from dev folder into app/config. Remove .local from them. Then change fields marked with //change.

Then create a database useng scripts from dev/dbScheme.sql.

To run application, use command node server.js

Application runs on http://localhost:3000/api/*