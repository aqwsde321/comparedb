package all.db.compare.controller;


import all.db.compare.cache.RedisCacheService;
import all.db.compare.dto.MetadataDTO;
import all.db.compare.dto.QueryResultDTO;
import all.db.compare.rdbms.enums.DatabaseType;
import all.db.compare.rdbms.service.DatabaseService;
import all.db.compare.rdbms.service.DatabaseServiceFactory;
import all.db.compare.utils.SqlUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Tag(name = "Customer API", description = "API for managing customers")
@Slf4j
@RestController
@RequestMapping("/api/database")
public class QueryController {
    private final RedisCacheService redisCacheService;
    private final DatabaseServiceFactory databaseServiceFactory;

    @Autowired
    public QueryController(RedisCacheService redisCacheService, DatabaseServiceFactory databaseServiceFactory) {
        this.redisCacheService = redisCacheService;
        this.databaseServiceFactory = databaseServiceFactory;
    }

    @GetMapping("/db-list")
    public List<String> getDatabaseList() {
        return Arrays.stream(DatabaseType.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @PostMapping("/execute")
    public ResponseEntity<QueryResultDTO> executeQuery(@RequestParam DatabaseType dbType, @RequestBody String sql) {
        String filteredSql = SqlUtils.filterSql(sql);
        // 캐시 조회
        Optional<Object> cachedResultOpt = redisCacheService.getFromCache(dbType, filteredSql);
        Optional<QueryResultDTO> cachedResultDTOOpt = cachedResultOpt.map(result -> (QueryResultDTO) result);
        if (cachedResultDTOOpt.isPresent()) return ResponseEntity.ok(cachedResultDTOOpt.get());

        try {
            DatabaseService service = databaseServiceFactory.getDatabaseService(dbType);
            QueryResultDTO result = service.executeQuery(filteredSql);
            // 결과를 캐시에 저장
            redisCacheService.saveToCache(dbType, filteredSql, result);
            return ResponseEntity.ok(result);
        } catch (BadSqlGrammarException e) {
            log.error("SQL syntax error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new QueryResultDTO(null, null, dbType, filteredSql, "SQL syntax error: " + e.getMessage()));
        } catch (DataAccessException e) {
            log.error("Data access error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new QueryResultDTO(null, null, dbType, filteredSql, "Database access error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new QueryResultDTO(null, null, dbType, filteredSql, "Unexpected error: " + e.getMessage()));
        }
    }

    @GetMapping("/metadata")
    public ResponseEntity<MetadataDTO> getMetadata(@RequestParam DatabaseType dbType, @RequestParam String tableName) {
        log.info("dbType: {}", dbType);
        DatabaseService service = databaseServiceFactory.getDatabaseService(dbType);
        MetadataDTO metadata = service.getMetadata(tableName);
        return ResponseEntity.ok(metadata);
    }
}
