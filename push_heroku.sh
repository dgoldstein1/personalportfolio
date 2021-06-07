docker login --username=_ --password=$(heroku auth:token) registry.heroku.com

export $(cat VERSION | grep VERSION)
docker tag \
 	dgoldstein1/personal-website:$VERSION \
 	registry.heroku.com/dg-personal-portfolio/web

docker push registry.heroku.com/dg-personal-portfolio/web

heroku container:release web --app dg-personal-portfolio

heroku config:set ui_incoming_path=/
heroku config:set ui_outgoing_url=file:///static-files
heroku config:set backend_incoming_path=/api/metrics/
heroku config:set backend_outgoing_url=https://quiet-brushlands-26130.herokuapp.com
heroku config:set geoip_incoming_path=/api/geoIpServer/
heroku config:set geoip_outgoing_url=http://api.ipstack.com

heroku open
heroku logs --tail