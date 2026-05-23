package com.pranay.distributedprovisioningengine.kafka.consumer;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.entity.Status;
import com.pranay.distributedprovisioningengine.exception.ResourceNotFoundException;
import com.pranay.distributedprovisioningengine.kafka.producer.ProvisionProducer;
import com.pranay.distributedprovisioningengine.repository.ProvisionRequestRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ProvisionConsumer {

    private static final Logger logger =
            LoggerFactory.getLogger(ProvisionConsumer.class);

    private final ProvisionRequestRepository repository;
    private final ProvisionProducer producer;

    private static final int MAX_RETRIES = 3;

    private final Random random = new Random();

    public ProvisionConsumer(
            ProvisionRequestRepository repository,
            ProvisionProducer producer
    ) {
        this.repository = repository;
        this.producer = producer;
    }

    @KafkaListener(
            topics = "provision-requests",
            groupId = "provision-worker-group"
    )
    public void consumer(ProvisionRequest request) {

        logger.info(
                "Received provision event for request id={}",
                request.getId()
        );

        ProvisionRequest existing = repository.findById(request.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Provision request not found"
                        ));

        existing.setStatus(Status.IN_PROGRESS);

        repository.save(existing);

        try {

            logger.info(
                    "Provisioning started for request id={}",
                    existing.getId()
            );

            Thread.sleep(3000);

            boolean failed = random.nextBoolean();

            if (failed) {

                throw new RuntimeException(
                        "Temporary cloud provisioning failure"
                );
            }

            existing.setStatus(Status.SUCCESS);

            repository.save(existing);

            logger.info(
                    "Provisioning SUCCESS for request id={}",
                    existing.getId()
            );

        } catch (Exception e) {

            logger.error(
                    "Provisioning FAILED for request id={}",
                    existing.getId()
            );

            int retries = existing.getRetryCount();

            if (retries < MAX_RETRIES) {

                existing.setRetryCount(retries + 1);

                existing.setStatus(Status.PENDING);

                repository.save(existing);

                logger.warn(
                        "Retrying request id={} attempt={}",
                        existing.getId(),
                        retries + 1
                );

                producer.sendProvisionEvent(existing);

            } else {

                existing.setStatus(Status.FAILED);

                repository.save(existing);

                logger.error(
                        "Provisioning permanently FAILED for request id={}",
                        existing.getId()
                );
            }
        }
    }
}