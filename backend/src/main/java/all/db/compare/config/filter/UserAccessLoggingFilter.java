package all.db.compare.config.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
public class UserAccessLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String clientIp = httpRequest.getRemoteAddr();
        String requestURL = httpRequest.getRequestURL().toString();
        String httpMethod = httpRequest.getMethod();

        // 로그 기록
        log.debug("User access - IP: {}, Method: {}, URL: {}", clientIp, httpMethod, requestURL);

        // 다음 필터로 요청을 전달
        chain.doFilter(request, response);
    }

}