docker run -d --name db \
  -p 8080:8080 \
  --env-file .env \
  qrqr/allcomparedb:latest
