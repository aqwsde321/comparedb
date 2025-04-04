# 1. oracle만 먼저 실행
docker-compose up -d oracle
docker-compose logs -f oracle
docker-compose ps

# 2. 정상 작동 확인 후 postgres 추가
docker-compose up -d postgres
docker-compose logs -f postgres
docker-compose ps

# 3. 마지막으로 mariadb 추가
docker-compose up -d mariadb
docker-compose logs -f mariadb
docker-compose ps
