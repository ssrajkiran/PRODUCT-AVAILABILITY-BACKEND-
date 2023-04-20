package com.ssrajkiran1.productavailability.controller;
import com.ssrajkiran1.productavailability.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;

import java.util.List;

@RestController
public class ProductController extends BaseController{

    @Autowired
    private ProductService productService;

    @PostMapping("/createproduct")
    public BaseResponseModel<ProductModel> createProduct(@RequestBody ProductModel productModel) {
        return productService.save(productModel);
    }

    @GetMapping("/listproduct")
    public BaseResponseModel<List> getAllProduct() {

        return productService.getAllProduct();
    }

//    @DeleteMapping("/deleteproduct")
//    public BaseResponseModel<ProductModel> deleteProductById(@PathVariable String product_name,@PathVariable String shop_id) {
//        return  productService.deleteProductById(product_name,shop_id);
//
//    }


}
