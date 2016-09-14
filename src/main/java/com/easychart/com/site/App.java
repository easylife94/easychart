package com.easychart.com.site;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class App {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(App.class, args);
    }
}