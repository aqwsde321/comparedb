docker run -d \
    --name redis-test \
    -p 6379:6379 \
    redis:6.2.14 \
    redis-server
