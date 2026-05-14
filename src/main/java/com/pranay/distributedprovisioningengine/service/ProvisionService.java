package com.pranay.distributedprovisioningengine.service;

import com.pranay.distributedprovisioningengine.dto.ProvisionRequestDto;
import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.entity.Status;
import com.pranay.distributedprovisioningengine.exception.InvalidStateTransitionException;
import com.pranay.distributedprovisioningengine.exception.ResourceNotFoundException;
import com.pranay.distributedprovisioningengine.kafka.producer.ProvisionProducer;
import com.pranay.distributedprovisioningengine.repository.ProvisionRequestRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvisionService {

    private final ProvisionRequestRepository repository;
    private final ProvisionProducer producer;

    public ProvisionService(ProvisionRequestRepository repository,
                            ProvisionProducer producer) {

        this.repository = repository;
        this.producer = producer;
    }

    public ProvisionRequest create(ProvisionRequestDto dto, String idempotencyKey) {

        return repository.findByIdempotencyKey(idempotencyKey)
                .orElseGet(() -> {
                    ProvisionRequest request = new ProvisionRequest();

                    request.setResourceType(dto.getResourceType());
                    request.setIdempotencyKey(idempotencyKey);
                    request.setStatus(Status.PENDING);

                    ProvisionRequest saved = repository.save(request);

                    producer.sendProvisionEvent(saved);

                    return saved;
                });
    }

    public List<ProvisionRequest> getAll() {
        return repository.findAll();
    }

    public ProvisionRequest updateStatus(Long id, Status newStatus) {

        ProvisionRequest request = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Request not found"));

        Status current = request.getStatus();

        if (!isValidTransition(current, newStatus)) {

            throw new InvalidStateTransitionException(
                    "Invalid status transition: "
                            + current + " -> " + newStatus
            );
        }

        request.setStatus(newStatus);

        return repository.save(request);
    }

    private boolean isValidTransition(Status current, Status next) {

        return switch (current) {

            case PENDING ->
                    next == Status.IN_PROGRESS;

            case IN_PROGRESS ->
                    (next == Status.SUCCESS
                            || next == Status.FAILED);

            case SUCCESS, FAILED -> false;
        };
    }
}