package all.db.compare.cache;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Slf4j
@Component
public class RedisHealthCheck {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public boolean testConnection() {
        try (RedisConnection connection = Objects.requireNonNull(redisTemplate.getConnectionFactory()).getConnection()) {
            // Redis 연결 테스트 (PING 명령)
            return Objects.equals(connection.ping(), "PONG");
        } catch (Exception e) {
            log.error("Redis 연결 실패: {}", e.getMessage());
            return false;
        }
    }


}