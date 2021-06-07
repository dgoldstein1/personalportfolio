docker login --username=_ --password=$(heroku auth:token) registry.heroku.com

export $(cat VERSION | grep VERSION)
docker tag \
 	dgoldstein1/personal-website:$VERSION \
 	registry.heroku.com/dg-personal-portfolio/web

docker push registry.heroku.com/dg-personal-portfolio/web

heroku container:release web --app dg-personal-portfolio
heroku logs --tail