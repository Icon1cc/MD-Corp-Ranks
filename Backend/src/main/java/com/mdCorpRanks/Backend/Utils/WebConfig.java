package com.mdCorpRanks.Backend.Utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Hopefully this applies it to all endpoints.
                .allowedOrigins("http://localhost:5173") 
                .allowedMethods("GET", "POST")  
                .allowCredentials(true);  
    }
}
