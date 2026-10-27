package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(properties = "jwt.secret=cle-de-test-uniquement-au-moins-32-caracteres-0123456789")
class DemoApplicationTests {

    @Test
    void contextLoads() {
    }

}
