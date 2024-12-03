package all.db.compare.utils;


public class SqlUtils {
    public static String filterSql(String sql) {
        String filteredSql = sql.trim();
        if (filteredSql.endsWith(";")) {
            filteredSql = filteredSql.substring(0, filteredSql.length() - 1);
        }
        //filteredSql = filteredSql.replaceAll("\\s+", " ");
        return filteredSql;
    }
}
