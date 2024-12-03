package all.db.compare.cache;

import all.db.compare.rdbms.enums.DatabaseType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
public class RedisCacheService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final Set<DatabaseType> cacheableDbTypes = Set.of(DatabaseType.ORACLE);

    @Autowired
    public RedisCacheService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Optional<Object> getFromCache(DatabaseType dbType, String sql) {
        if (!isCacheable(dbType)) return Optional.empty();
        log.debug("getFromCache: {} / {}", dbType, sql);
        try {
            Object cachedValue = redisTemplate.opsForValue().get(getCacheKey(dbType, sql));
            return Optional.ofNullable(cachedValue);
        } catch (Exception e) {
            log.error("Redis 조회 오류 ({}): {}", getCacheKey(dbType, sql), e.getMessage());
            return Optional.empty();
        }
    }

    public void saveToCache(DatabaseType dbType, String sql, Object result) {
        if (!isCacheable(dbType)) return;
        log.debug("saveToCache: {} / {}", dbType, sql);
        try {
            redisTemplate.opsForValue().set(getCacheKey(dbType, sql), result, Duration.ofMinutes(30));
        } catch (Exception e) {
            log.error("Redis 저장 오류 ({}): {}", getCacheKey(dbType, sql), e.getMessage());
        }
    }

    private String getCacheKey(DatabaseType dbType, String sql) {
        return dbType + ":" + sql;
    }

    private boolean isCacheable(DatabaseType dbType) {
        return cacheableDbTypes.contains(dbType);
    }
}
