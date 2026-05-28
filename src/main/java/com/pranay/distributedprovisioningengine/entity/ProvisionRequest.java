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

    @Enumerated(EnumType.STRING)
    private ResourceType resourceType;

    @Column(unique = true, nullable = false)
    private String idempotencyKey;

    @Enumerated(EnumType.STRING)
    private Status status;

    private int retryCount;

    @Column(unique = true, nullable = false)
    private String serverName;

}
