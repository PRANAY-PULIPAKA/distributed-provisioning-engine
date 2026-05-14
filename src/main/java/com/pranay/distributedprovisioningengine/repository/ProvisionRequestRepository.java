package com.pranay.distributedprovisioningengine.repository;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProvisionRequestRepository extends JpaRepository<ProvisionRequest, Long>{

    Optional<ProvisionRequest> findByIdempotencyKey(String idempotencyKey);

}
