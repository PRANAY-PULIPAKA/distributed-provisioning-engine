package com.pranay.distributedprovisioningengine.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProvisionRequest{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String resourceType; // VM, CONTAINER
    private String status; //Pending, Success, Failed

}
