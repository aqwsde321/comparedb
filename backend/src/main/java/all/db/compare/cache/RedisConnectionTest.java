package all.db.compare.cache;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RedisConnectionTest implements CommandLineRunner {

    @Autowired
    private RedisHealthCheck redisHealthCheck;

    @Override
    public void run(String... args) throws Exception {
        if (redisHealthCheck.testConnection()) {
            log.info("Redis 연결 성공!");
        } else {
            log.info("Redis 연결 실패!");
        }
    }
}