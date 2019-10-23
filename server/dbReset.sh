heroku pg:reset DATABASE -a ftmatcha --confirm ftmatcha
heroku run rake db:migrate -a ftmatcha --trace
cat ../Matcha.sql | heroku pg:psql --app ftmatcha
nodemon --exec babel-node seed/seed.js