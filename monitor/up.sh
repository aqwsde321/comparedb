# 1. node-exporter만 먼저 실행
docker-compose up -d node-exporter
docker-compose logs -f node-exporter
docker-compose ps

# 2. 정상 작동 확인 후 prometheus 추가
docker-compose up -d prometheus
docker-compose logs -f prometheus
docker-compose ps

# 3. 마지막으로 grafana 추가
docker-compose up -d grafana
docker-compose logs -f grafana
docker-compose ps

