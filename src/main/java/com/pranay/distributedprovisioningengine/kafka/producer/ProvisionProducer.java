package com.pranay.distributedprovisioningengine.kafka.producer;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProvisionProducer {

    private static final Logger logger =
            LoggerFactory.getLogger(ProvisionProducer.class);

    private final KafkaTemplate<String, ProvisionRequest> kafkaTemplate;

    public ProvisionProducer(
            KafkaTemplate<String, ProvisionRequest> kafkaTemplate
    ) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendProvisionEvent(ProvisionRequest request) {

        kafkaTemplate.send("provision-requests", request);

        logger.info(
                "Provision event sent for request id={}",
                request.getId()
        );
    }
}