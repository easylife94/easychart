package com.easychart.com.site.controller;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
public class HomeController {

	@RequestMapping("/home")
    public String home(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
        System.out.println("进入contorller:"+name);
		model.addAttribute("name", name);
        return "html/home.html";
    }
    
}