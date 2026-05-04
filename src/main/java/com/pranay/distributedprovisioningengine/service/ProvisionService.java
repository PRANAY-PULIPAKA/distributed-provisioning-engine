package com.pranay.distributedprovisioningengine.service;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.dto.ProvisionRequestDto;
import com.pranay.distributedprovisioningengine.repository.ProvisionRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProvisionService {

        private  final ProvisionRequestRepository repository;

        public ProvisionService(ProvisionRequestRepository repository){
            this.repository = repository;
        }

        public ProvisionRequest create(ProvisionRequestDto dto){
           ProvisionRequest request = new ProvisionRequest();
           request.setResourceType(dto.getResourceType());

           request.setStatus("PENDING");
           return repository.save(request);

        }
        public List<ProvisionRequest> getAll(){
            return repository.findAll();
        }
}
