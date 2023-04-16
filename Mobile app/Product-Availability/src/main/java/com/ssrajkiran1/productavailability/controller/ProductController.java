package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.ProductModel;
import com.ssrajkiran1.productavailability.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;
    private com.ssrajkiran1.productavailability.model.ProductModel ProductModel;


    @PostMapping("/Product")
    public BaseResponseModel<ProductModel> createProduct(@RequestBody ProductModel productModel) {
        return productService.save(productModel);
    }

    @GetMapping("/Product")
    public BaseResponseModel<ProductModel> getAllProduct() {

        return productService.getAllProduct();
    }

    @DeleteMapping("/Product")
    public BaseResponseModel<ProductModel> deleteProductById(@RequestBody String product_name,String shop_id) {
        return  productService.deleteProductById(product_name,shop_id);

    }


}
