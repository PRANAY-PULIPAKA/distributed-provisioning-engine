package com.pranay.distributedprovisioningengine.kafka.producer;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProvisionProducer {

    private final KafkaTemplate<String, ProvisionRequest> kafkaTemplate;

    public ProvisionProducer(KafkaTemplate<String, ProvisionRequest> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendProvisionEvent(ProvisionRequest request) {

        kafkaTemplate.send("provision-requests", request);

        System.out.println("Provision Event Sent: " + request);
    }
}
