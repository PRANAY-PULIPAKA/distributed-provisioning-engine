package com.pranay.distributedprovisioningengine.kafka.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic provisionTopic(){
        return new NewTopic("provision-requests", 1, (short) 1);
    }
}
