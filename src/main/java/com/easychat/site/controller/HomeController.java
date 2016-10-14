package com.easychat.site.controller;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@EnableAutoConfiguration
public class HomeController {

	@RequestMapping(value = {"/","/home"})
    public String home(Model model) {
        return "html/home.html";
    }
    
}