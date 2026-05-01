package com.pranay.distributedprovisioningengine.repository;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProvisionRequestRepository extends JpaRepository<ProvisionRequest, Long>{

}
