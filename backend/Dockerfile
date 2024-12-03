FROM openjdk:17-jdk-alpine
COPY ./build/libs/app.jar /app.jar
ENV TZ=Asia/Seoul
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]




