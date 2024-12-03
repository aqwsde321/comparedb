package all.db.compare.rdbms.service;

import all.db.compare.rdbms.enums.DatabaseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;

@Component
public class DatabaseServiceFactory {

    private final Map<DatabaseType, DatabaseService> services;

    @Autowired
    public DatabaseServiceFactory(Map<String, DatabaseService> databaseServices) {
        this.services = new EnumMap<>(DatabaseType.class);

        databaseServices.forEach((name, service) -> {
            DatabaseType dbType = DatabaseType.valueOf(name.toUpperCase());
            services.put(dbType, service);
        });
    }

    public DatabaseService getDatabaseService(DatabaseType dbType) {
        return services.get(dbType);
    }
}
