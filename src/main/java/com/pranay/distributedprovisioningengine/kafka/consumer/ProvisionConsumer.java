package com.pranay.distributedprovisioningengine.kafka.consumer;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.entity.Status;
import com.pranay.distributedprovisioningengine.exception.ResourceNotFoundException;
import com.pranay.distributedprovisioningengine.kafka.producer.ProvisionProducer;
import com.pranay.distributedprovisioningengine.repository.ProvisionRequestRepository;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ProvisionConsumer {

    private final ProvisionRequestRepository repository;
    private final ProvisionProducer producer;
    private static final int MAX_RETRIES = 3;

    public ProvisionConsumer( ProvisionRequestRepository repository, ProvisionProducer producer) {
        this.repository = repository;
        this.producer = producer;
    }

    @KafkaListener(
            topics = "provision-requests",
            groupId = "provision-worker-group"
    )
    public void consumer(ProvisionRequest request) {

        System.out.println("Received Provision Event: " + request);

        ProvisionRequest existing = repository.findById(request.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Provision request not found"
                        ));

        // Mark as IN_PROGRESS
        existing.setStatus(Status.IN_PROGRESS);

        repository.save(existing);

        try {

            System.out.println(
                    "Provisioning started for request: "
                            + existing.getId()
            );

            // Simulate provisioning delay
            Thread.sleep(3000);

            // Simulate random failure
            Random random = new Random();

            boolean failed = random.nextBoolean();

            if (failed) {

                throw new RuntimeException(
                        "Cloud provisioning failed temporarily"
                );
            }

            // SUCCESS
            existing.setStatus(Status.SUCCESS);

            repository.save(existing);

            System.out.println(
                    "Provisioning SUCCESS for request: "
                            + existing.getId()
            );

        } catch (Exception e) {

            System.out.println(
                    "Provisioning FAILED for request: "
                            + existing.getId()
            );

            int retries = existing.getRetryCount();

            // RETRY
            if (retries < MAX_RETRIES) {

                existing.setRetryCount(retries + 1);

                existing.setStatus(Status.PENDING);

                repository.save(existing);

                System.out.println(
                        "Retrying request "
                                + existing.getId()
                                + " attempt "
                                + (retries + 1)
                );

                // Re-send to Kafka
                producer.sendProvisionEvent(existing);

            } else {

                // PERMANENT FAILURE
                existing.setStatus(Status.FAILED);

                repository.save(existing);

                System.out.println(
                        "Provisioning permanently FAILED for request: "
                                + existing.getId()
                );
            }
        }
    }
}