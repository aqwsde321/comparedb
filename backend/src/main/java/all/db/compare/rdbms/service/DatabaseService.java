package all.db.compare.rdbms.service;


import all.db.compare.dto.MetadataDTO;
import all.db.compare.dto.QueryResultDTO;

public interface DatabaseService {
    QueryResultDTO executeQuery(String sql);

    MetadataDTO getMetadata(String tableName);

}