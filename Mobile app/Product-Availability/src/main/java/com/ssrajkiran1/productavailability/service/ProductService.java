package com.ssrajkiran1.productavailability.service;

import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.ProductModel;
import com.ssrajkiran1.productavailability.model.ShopModel;
import com.ssrajkiran1.productavailability.model.UserModel;
import com.ssrajkiran1.productavailability.repository.ProductRepository;
import com.ssrajkiran1.productavailability.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {


    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShopRepository shopRepository;

    public BaseResponseModel<ProductModel> save(ProductModel productModel) {
        List<ProductModel> product = productRepository.findByProductName(productModel.getProductName());
        Optional<ShopModel> shopid = shopRepository.findById(productModel.getShopId());
        if (product.isEmpty()) {
                productRepository.save(productModel);

                List<Object> dataList = new ArrayList<>();

                List<ProductModel> details = productRepository.findByShopIdAndProductName(productModel.getShopId(), productModel.getProductName());

                dataList.add(new ProductModel(productModel.getShopId(), productModel.getProductDescription(), productModel.getBrandName(), productModel.getShopId(), productModel.getProductAvailability()));

                BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
                resp.setStatusCode(HttpStatus.OK.hashCode());
                resp.setStatus("True");
                resp.setError("");
                resp.setMessage("User Account Fetched Successfully");
                resp.setData(dataList);
            return resp;
            }

        else {

            BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("Product Aldready Exists");
            resp.setMessage("Product data Aldready Found!");
            resp.getData();
            return resp;

        }

}
public BaseResponseModel<ProductModel> getAllProduct() {

    List<ProductModel> product_data = productRepository.findAll();

    if (product_data.isEmpty()){
        BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
        resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
        resp.setStatus("False");
        resp.setError("Database Empty Error");
        resp.setMessage("Database is empty");
        resp.getData();
        return resp;
    }
    else{
        BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
        List<Object> dataList = new ArrayList<>();
        for(ProductModel user : product_data){
            dataList.add(new ProductModel(user.getShopId(),user.getProductName(),user.getProductDescription() ,user.getBrandName(),user.getProductAvailability()));
        }
        resp.setStatusCode(HttpStatus.OK.hashCode());
        resp.setStatus("True");
        resp.setError("");
        resp.setMessage("Database Fetched Successfully");
        resp.setData(dataList);
        return  resp;
    }
    }


    public boolean shopExists(String id) {
        return productRepository.existsById(id);
    }


    public BaseResponseModel<ProductModel> deleteProductById(String product_name,String shop_id) {


        List<ProductModel> getId = productRepository.findByShopIdAndProductName(shop_id,product_name);

        if (getId.isEmpty()) {

            BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("Shop Not Found");
            resp.setMessage("Shop not deleted!");
            return resp;

        } else {

            shopRepository.deleteById(product_name);
            BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Successfully Product deleted!");
            return resp;
        }
    }
}
