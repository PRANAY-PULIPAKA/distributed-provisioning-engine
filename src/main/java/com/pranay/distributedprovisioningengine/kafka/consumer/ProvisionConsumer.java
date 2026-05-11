package com.pranay.distributedprovisioningengine.kafka.consumer;

import com.pranay.distributedprovisioningengine.entity.Status;
import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.exception.ResourceNotFoundException;
import com.pranay.distributedprovisioningengine.repository.ProvisionRequestRepository;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ProvisionConsumer {
    private final ProvisionRequestRepository repository;

    public ProvisionConsumer(ProvisionRequestRepository repository){
        this.repository = repository;
    }
    @KafkaListener(
            topics = "provision-requests",
            groupId = "provision-worker-group"
    )
    public void consumer(ProvisionRequest request){

        System.out.println("Received Provision Event: " + request);
        ProvisionRequest existing = repository.findById(request.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Provision request not found"));

        // Mark as IN_PROGRESS
        existing.setStatus(Status.IN_PROGRESS);
        repository.save(existing);

        System.out.println("Provisioning started for request: " + existing.getId());

        try {
            // Simulate cloud provisioning delay
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            existing.setStatus(Status.FAILED);
            repository.save(existing);
            return;
        }

        // Mark as SUCCESS
        existing.setStatus(Status.SUCCESS);
        repository.save(existing);

        System.out.println("Provisioning completed successfully for request: " + existing.getId());
    }
}
