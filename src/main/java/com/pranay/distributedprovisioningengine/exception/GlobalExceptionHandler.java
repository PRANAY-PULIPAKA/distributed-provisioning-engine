package com.pranay.distributedprovisioningengine.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidStateTransitionException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleInvalidState(
            InvalidStateTransitionException ex
    ) {

        Map<String, String> error =
                new HashMap<>();

        error.put("error", ex.getMessage());

        return error;
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNotFound(
            ResourceNotFoundException ex
    ) {

        Map<String, String> error =
                new HashMap<>();

        error.put("error", ex.getMessage());

        return error;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidation(
            IllegalArgumentException ex
    ) {

        Map<String, String> error =
                new HashMap<>();

        error.put("error", ex.getMessage());

        return error;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleGeneric(
            Exception ex
    ) {

        Map<String, String> error =
                new HashMap<>();

        error.put("error", ex.getMessage());

        return error;
    }
}