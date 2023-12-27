import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  editCurrentPage,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";

function AdminCreate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector(state => state.selectList.List)
  const { pages } = useSelector((state) => state.allProduct.product);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("type", activeTypeProduct);
    formData.append("image", image);
    
    // Nhom dien thoai
    formData.append("dienthoai", data.dienthoai);
    formData.append("sanhang", data.sanhang);
    formData.append("nhucausd", data.nhucausd);
    formData.append("loaidt", data.loaidt);
    formData.append("bonho", data.bonho);
    formData.append("dungluong", data.dungluong);
    formData.append("tinhnang", data.tinhnang);
    formData.append("camera", data.camera);
    formData.append("manhinh", data.manhinh);
    formData.append("tansoquet", data.tansoquet);

    //Nhom laptop
    formData.append("laptop", data.laptop);
    formData.append("sanh", data.sanh);
    formData.append("ssd", data.ssd);
    formData.append("ram", data.ram);
    formData.append("cpu", data.cpu);
    formData.append("kichthuoc", data.kichthuoc);
    formData.append("dpgiai", data.dpgiai);
    formData.append("card", data.card);
    
    await dispatch(saveProduct(formData));
    await dispatch(editCurrentPage(pages));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  return (
    <div className="admin-create">
      <span>Create Product</span>
      <form
        className="admin-create-product"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <input {...register("name")} placeholder="Name"></input>
        <input
          {...register("amount")}
          placeholder="Amount"
          type="number"
        ></input>
        <input {...register("price")} placeholder="Price" type="number"></input>
        <input
          {...register("salePrice")}
          placeholder="SalePrice"
          type="number"
        ></input>

        <div className="filter-menu-firm">
          {
            List ? (List.map((item) => MenuFirmProduct(item))) : ''
          }
        </div>

        {SelectList && SelectList.length > 0
          ? SelectList.map((item) => (
              <div className="select-type">
                <select {...register(`${item.property}`)}>
                  <option>{item.name}</option>
                  {item.options.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
              </div>
            ))
          : ""}

        <input
          type="file"
          {...register("image")}
          onChange={handleFileImageChange}
        ></input>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminCreate;
