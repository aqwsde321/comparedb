package all.db.compare.rdbms.service.impl;

import all.db.compare.dto.MetadataDTO;
import all.db.compare.dto.QueryResultDTO;
import all.db.compare.rdbms.enums.DatabaseType;
import all.db.compare.rdbms.metadata.MetadataQueryProvider;
import all.db.compare.rdbms.service.DatabaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service("MARIADB")
public class MariaDBDatabaseService implements DatabaseService {

    private final JdbcTemplate jdbcTemplate;
    private final MetadataQueryProvider metadataQueryProvider;

    @Autowired
    public MariaDBDatabaseService(@Qualifier("mariadbJdbcTemplate") JdbcTemplate jdbcTemplate,
                                  @Qualifier("mariadbMetadataQueryProvider") MetadataQueryProvider metadataQueryProvider) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcTemplate.execute("SELECT 1");
        this.metadataQueryProvider = metadataQueryProvider;
    }

    @Override
    public QueryResultDTO executeQuery(String sql) {
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);
        List<Map<String, Object>> executionPlan = getExecutionPlan(sql); // MariaDB에 맞는 실행 계획 로직 구현
        return new QueryResultDTO(results, executionPlan, DatabaseType.MARIADB, sql, null);
    }

    @Override
    public MetadataDTO getMetadata(String tableName) {
        // 로직 구현
        return null;
    }

    private List<Map<String, Object>> getExecutionPlan(String sql) {
        List<Map<String, Object>> executionPlan = new ArrayList<>();
        try {
            executionPlan = jdbcTemplate.queryForList("ANALYZE " + sql);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return executionPlan;
    }
}