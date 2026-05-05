package com.pranay.distributedprovisioningengine.service;

import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.dto.ProvisionRequestDto;
import com.pranay.distributedprovisioningengine.entity.Status;
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

           request.setStatus(Status.PENDING);
           return repository.save(request);

        }
        public List<ProvisionRequest> getAll(){
            return repository.findAll();
        }

        public ProvisionRequest updateStatus(Long id, Status newStatus){

            ProvisionRequest request = repository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));

            Status current = request.getStatus();

            if(!isValidTransition(current, newStatus)){
                throw new RuntimeException("Invalid status transition: " + current + " -> " + newStatus);
            }

            request.setStatus(newStatus);
            return repository.save(request);
        }

        private boolean isValidTransition(Status current, Status next){

            return switch (current){
                case PENDING -> next == Status.IN_PROGRESS;
                case IN_PROGRESS -> (next == Status.SUCCESS || next == Status.FAILED);
                case SUCCESS, FAILED -> false;
            };
        }
}
