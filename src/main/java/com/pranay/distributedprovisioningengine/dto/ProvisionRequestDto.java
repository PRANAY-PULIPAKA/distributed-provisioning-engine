package com.pranay.distributedprovisioningengine.dto;

import com.pranay.distributedprovisioningengine.entity.ResourceType;

import lombok.Data;

@Data
public class ProvisionRequestDto {

    private ResourceType resourceType;

    private String serverName;
}
