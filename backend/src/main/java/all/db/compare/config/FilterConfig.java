package all.db.compare.config;


import all.db.compare.config.filter.UserAccessLoggingFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<UserAccessLoggingFilter> loggingFilter() {
        FilterRegistrationBean<UserAccessLoggingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new UserAccessLoggingFilter());
        registrationBean.addUrlPatterns("/*"); // 모든 요청에 대해 필터 적용
        return registrationBean;
    }
}