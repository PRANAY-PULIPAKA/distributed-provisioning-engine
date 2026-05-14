package com.pranay.distributedprovisioningengine.controller;

import com.pranay.distributedprovisioningengine.dto.ProvisionRequestDto;
import com.pranay.distributedprovisioningengine.entity.ProvisionRequest;
import com.pranay.distributedprovisioningengine.entity.Status;
import com.pranay.distributedprovisioningengine.service.ProvisionService;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/provision")
public class ProvisionController {

    private final ProvisionService service;
    public ProvisionController(ProvisionService service){
        this.service = service;
    }

    @PostMapping
    public ProvisionRequest create(@RequestBody ProvisionRequestDto dto, @RequestHeader("Idempotency-key") String idempotencyKey){

        return service.create(dto, idempotencyKey);
    }

    @GetMapping
    public List<ProvisionRequest> getAll(){
        return service.getAll();
    }

    @PutMapping("/{id}/status")
    public ProvisionRequest updateStatus(@PathVariable Long id, @RequestParam Status status){
        return service.updateStatus(id, status);
    }
}
