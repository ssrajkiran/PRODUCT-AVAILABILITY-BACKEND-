package com.ssrajkiran1.productavailability.controller;
import com.ssrajkiran1.productavailability.service.ProductService;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;

import java.util.List;
import java.util.Map;

@RestController
public class ProductController extends BaseController{

    @Autowired
    private ProductService productService;

    @PostMapping("/createproduct")
    public BaseResponseModel<ProductModel> createProduct(@RequestBody @Valid ProductModel productModel) {
        return productService.save(productModel);
    }

    @GetMapping("/listproduct")
    public BaseResponseModel<List> getAllProduct() {

        return productService.getAllProduct();
    }

    @DeleteMapping("/deleteproduct")
    public BaseResponseModel<ProductModel> deleteProductById(@RequestBody @Valid Map<String, String> requestBody) {
        String shopId = requestBody.get("shop_id");
        String product_name = requestBody.get("product_name");
        System.out.println(shopId+"" +product_name);
        if(( StringUtils.isBlank(shopId) )|| (StringUtils.isBlank(product_name)) ){
            return new BaseResponseModel<>("Enter your user_id & ProductName");
        }
        return  productService.deleteProductById(product_name,shopId);

    }


}
