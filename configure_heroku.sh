heroku config:set ui_incoming_path=/
heroku config:set ui_outgoing_url=file:///static-files
heroku config:set backend_incoming_path=/api/metrics/
heroku config:set backend_outgoing_url=https://quiet-brushlands-26130.herokuapp.com
heroku config:set geoip_incoming_path=/api/geoIpServer/
heroku config:set geoip_outgoing_url=http://api.ipstack.com