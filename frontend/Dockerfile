# 1. Nginx 베이스 이미지
FROM nginx:alpine

# 2. 커스텀 Nginx 설정 복사
COPY default.conf /etc/nginx/conf.d/default.conf

# 3. 정적 파일 복사
COPY . /usr/share/nginx/html

# 4. 포트 노출
EXPOSE 80
