Sinatra
=============

Skeleton by Lighthouse Labs
Modified by Sida

## Getting Started

1. `bundle install`
2. `rake db:drop; rake db:create; rake db:migrate;`
3. `shotgun -p 3000 -o 0.0.0.0`
4. Visit `http://localhost:3000/` in your browser

=============

## Deploying on heroku without db:

- remove all rake tasks
- remove `require APP_ROOT.join('config', 'database')` from environment.rb

## Contributors

Sida Zhou
Krishna Jolliffe

