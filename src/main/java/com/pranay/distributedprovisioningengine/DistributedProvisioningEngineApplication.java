package com.pranay.distributedprovisioningengine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class DistributedProvisioningEngineApplication {

	public static void main(String[] args) {

		TimeZone.setDefault(
				TimeZone.getTimeZone("UTC")
		);

		SpringApplication.run(
				DistributedProvisioningEngineApplication.class,
				args
		);
	}
}

