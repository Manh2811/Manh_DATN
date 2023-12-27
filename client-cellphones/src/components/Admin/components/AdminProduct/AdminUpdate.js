import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  getproductById,
  removeProductById,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";

function AdminUpdate(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const detailProduct = useSelector((state) => state.getProductById.product);
  const SelectList = useSelector((state) => state.selectList.List);
  const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getproductById(id));

    return () => {
      dispatch(removeProductById());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("dienthoai", data.dienthoai);
    formData.append(
      "type",
      activeTypeProduct ? activeTypeProduct : detailProduct.type
    );
    formData.append("image", image);
    formData.append("_id", id);

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
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct
          ? activeTypeProduct === item.name
            ? `filter-menu-firm-item active`
            : "filter-menu-firm-item"
          : detailProduct.type === item.name
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
      <span>Update Product</span>
      {detailProduct ? (
        <form
          className="admin-create-product"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input
            {...register("name")}
            placeholder="Name"
            defaultValue={detailProduct.name}
          ></input>
          <input
            {...register("amount")}
            placeholder="Amount"
            type="number"
            defaultValue={detailProduct.amount}
          ></input>
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={detailProduct.price}
          ></input>
          <input
            {...register("salePrice")}
            placeholder="SalePrice"
            type="number"
            defaultValue={detailProduct.salePrice}
          ></input>

          <div className="filter-menu-firm">
          {
            List ? (List.map((item) => MenuFirmProduct(item))) : ''
          }
          </div>

          {SelectList && SelectList.length > 0
            ? SelectList.map((item) => (
                <div className="select-type">
                  <select
                    {...register(`${item.property}`)}
                    defaultValue={detailProduct[`${item.property}`]}
                  >
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
          <button type="submit">Update Product</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUpdate;
