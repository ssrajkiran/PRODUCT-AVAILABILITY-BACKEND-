package com.ssrajkiran1.productavailability.service;
import com.ssrajkiran1.productavailability.repository.ProductRepository;
import com.ssrajkiran1.productavailability.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
@Service
public class ProductService {


    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShopRepository shopRepository;

    public BaseResponseModel<ProductModel> save(ProductModel productModel) {
        Optional<ProductModel> product = productRepository.findByProductNameAndShopId(productModel.getProductName(),productModel.getShopId().toString());


        if (product.isEmpty()) {
            productRepository.save(productModel);

            List<Object> dataList = new ArrayList<>();

            ProductModel details = productRepository.findByShopIdAndProductName(productModel.getShopId(), productModel.getProductName());



            BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.value());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Product Created Successfully");
            resp.setData(details);
            return resp;
        }

        else{

            BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.value());
            resp.setStatus(false);
            resp.setError("ProductIdError");
            resp.setMessage("Product Already Exists!");
            resp.getData();
            return resp;

        }

    }
    public BaseResponseModel<List> getAllProduct() {

        List<ProductModel> product_data = productRepository.findAll();
        BaseResponseModel<List> resp = new BaseResponseModel<>();
        if (product_data.isEmpty()){

            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus(false);
            resp.setError("ProductIdError");
            resp.setMessage("No Record Product");
            resp.getData();

        }
        else{

            List<Object> dataList = new ArrayList<>();
            for(ProductModel user : product_data){
                dataList.add(new ProductModel(user.getShopId(),user.getProductName(),user.getProductDescription() ,user.getBrandName(),user.getProductAvailability()));
            }
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("List of Product Database");
            resp.setData(dataList);

        }
        return  resp;
    }



//    public BaseResponseModel<ProductModel> deleteProductById(String product_name,String shop_id) {
//
//
//        List<ProductModel> getId = productRepository.getByShopIdAndProductName(shop_id,product_name);
//
//        if (getId.isEmpty()) {
//
//            BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
//            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
//            resp.setStatus(false);
//            resp.setError("Shop Not Found");
//            resp.setMessage("Shop not deleted!");
//            return resp;
//
//        } else {
//
//            shopRepository.deleteById(product_name);
//            BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
//            resp.setStatusCode(HttpStatus.OK.hashCode());
//            resp.setStatus(true);
//            resp.setError("");
//            resp.setMessage("Successfully Product deleted!");
//            return resp;
//        }
//    }
}
