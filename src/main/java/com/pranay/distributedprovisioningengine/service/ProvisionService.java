package com.pranay.distributedprovisioningengine.service;

import com.pranay.distributedprovisioningengine.dto.ProvisionRequestDto;
import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.entity.Status;
import com.pranay.distributedprovisioningengine.exception.InvalidStateTransitionException;
import com.pranay.distributedprovisioningengine.exception.ResourceNotFoundException;
import com.pranay.distributedprovisioningengine.kafka.producer.ProvisionProducer;
import com.pranay.distributedprovisioningengine.repository.ProvisionRequestRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvisionService {

    private static final Logger logger =
            LoggerFactory.getLogger(ProvisionService.class);

    private final ProvisionRequestRepository repository;

    private final ProvisionProducer producer;

    public ProvisionService(
            ProvisionRequestRepository repository,
            ProvisionProducer producer
    ) {

        this.repository = repository;
        this.producer = producer;
    }

    public ProvisionRequest create(
            ProvisionRequestDto dto,
            String idempotencyKey
    ) {

        logger.info(
                "Creating provision request for resourceType={} serverName={}",
                dto.getResourceType(),
                dto.getServerName()
        );

        // VALIDATION
        if (
                dto.getServerName() == null
                        || dto.getServerName().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Server name cannot be empty"
            );
        }

        // DUPLICATE SERVER NAME CHECK
        if (
                repository.existsByServerName(
                        dto.getServerName()
                )
        ) {

            throw new IllegalArgumentException(
                    "Server name already exists"
            );
        }

        // IDEMPOTENCY CHECK
        return repository
                .findByIdempotencyKey(idempotencyKey)
                .orElseGet(() -> {

                    ProvisionRequest request =
                            new ProvisionRequest();

                    request.setResourceType(
                            dto.getResourceType()
                    );

                    request.setServerName(
                            dto.getServerName()
                    );

                    request.setIdempotencyKey(
                            idempotencyKey
                    );

                    request.setStatus(
                            Status.PENDING
                    );

                    request.setRetryCount(0);

                    ProvisionRequest saved =
                            repository.save(request);

                    logger.info(
                            "Provision request saved with id={} serverName={}",
                            saved.getId(),
                            saved.getServerName()
                    );

                    producer.sendProvisionEvent(saved);

                    return saved;
                });
    }

    public List<ProvisionRequest> getAll() {

        logger.info(
                "Fetching all provision requests"
        );

        return repository.findAll();
    }

    public ProvisionRequest updateStatus(
            Long id,
            Status newStatus
    ) {

        ProvisionRequest request =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Request not found"
                                ));

        Status current =
                request.getStatus();

        logger.info(
                "Updating request id={} status {} -> {}",
                id,
                current,
                newStatus
        );

        if (
                !isValidTransition(
                        current,
                        newStatus
                )
        ) {

            logger.error(
                    "Invalid status transition {} -> {} for request id={}",
                    current,
                    newStatus,
                    id
            );

            throw new InvalidStateTransitionException(
                    "Invalid status transition: "
                            + current
                            + " -> "
                            + newStatus
            );
        }

        request.setStatus(newStatus);

        ProvisionRequest updated =
                repository.save(request);

        logger.info(
                "Request id={} updated successfully to status={}",
                updated.getId(),
                updated.getStatus()
        );

        return updated;
    }

    private boolean isValidTransition(
            Status current,
            Status next
    ) {

        return switch (current) {

            case PENDING ->
                    next == Status.IN_PROGRESS;

            case IN_PROGRESS ->
                    (
                            next == Status.SUCCESS
                                    || next == Status.FAILED
                    );

            case SUCCESS, FAILED -> false;
        };
    }

    public void delete(Long id) {

        ProvisionRequest request =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Request not found"
                                ));

        try {

            logger.info(
                    "Stopping Docker container={}",
                    request.getServerName()
            );

            ProcessBuilder builder =
                    new ProcessBuilder(
                            "docker",
                            "rm",
                            "-f",
                            request.getServerName()
                    );

            Process process =
                    builder.start();

            int exitCode =
                    process.waitFor();

            if (exitCode != 0) {

                throw new RuntimeException(
                        "Failed to delete Docker container"
                );
            }

            logger.info(
                    "Docker container deleted={}",
                    request.getServerName()
            );

        } catch (Exception e) {

            logger.error(
                    "Container deletion failed for server={} error={}",
                    request.getServerName(),
                    e.getMessage()
            );

            throw new RuntimeException(
                    "Infrastructure deletion failed"
            );
        }

        repository.delete(request);

        logger.info(
                "Provision request metadata deleted id={}",
                id
        );
    }
}