import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getProduct,
  updateProduct,
} from "../../../../redux/slices/productSlice";
import { RootState, useAppDispatch } from "../../../../redux/store";
import "../../../OrderStatus/Cancel/index.css"

type Inputs = {
  name: string;
  price: string;
  desc: string;
  image: string;
  categoryId: any;
};

const ProductEdit = () => {
  const categories = useSelector(
    (state: RootState) => state.catePro.cateproducts
  );

  const [preview, setPreview] = useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    try {
      const apiUrl = "https://api.cloudinary.com/v1_1/dmlv9tzte/image/upload";
      const images = values.image[0];
      const formdata = new FormData();
      formdata.append("file", images);
      formdata.append("upload_preset", "duanTn");
      const { data } = await axios.post(apiUrl, formdata, {
        headers: {
          "Content-type": "application/form-data",
        },
      });
      await dispatch(updateProduct({ ...values, image: data.url })).unwrap();
      toast.success("Cập nhật sản phẩm thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/products");
    } catch (error) {
      console.log("bạn đã cập nhật lỗi");
    }
  };

  useEffect(() => {
    (async () => {
      const cateproduct = await dispatch(getProduct(id));
      reset(cateproduct.payload);
    })();
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Sửa danh sách sản phẩm
          </h1>
          <Link to="/admin/products" className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A303B] hover:bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]"
            >
              <HiOutlineX className="text-[20px] mr-2" />
              Thoát
            </button>
          </Link>
        </div>
      </header>
      <div className="m-auto max-w-7xl pb-36 mt-5">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form
            action="#"
            id="form-add-product"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Tên sản phẩm
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("name")}
                      id="name-add-product"
                      className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="Name..."
                    />
                  </div>
                </div>
                {/* End name */}

                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Giá sản phẩm
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      {...register("price")}
                      id="price-add-product"
                      className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="Price..."
                    />
                  </div>
                </div>
                {/* End price */}

                {/* Size and color */}
                {/* <div>
                  <b>Size and color</b>
                </div> */}
                {/* End size and color */}

                {/* Categories */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Danh mục sản phẩm
                  </label>
                  <select
                    {...register("categoryId", {
                      required: "Vui lòng nhập chi tiết",
                    })}
                    autoComplete="category-name"
                    className="mt-1 block w-full py-2 px-3 appearance-none border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] sm:text-sm"
                  >
                    {categories &&
                      categories.map((category: any, index: number) => (
                        <option key={index++} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                  <div className="text-sm mt-0.5 text-red-500">
                    {errors.category?.message}
                  </div>
                </div>

                {/* End categories */}

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Chi tiết sản phẩm
                  </label>
                  <div className="mt-1">
                    <textarea  {...register("desc")} id="message"  className="scoll h-[200px] block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                  </div>
                </div>
                {/* End description */}

                {/* Image review */}
                <div className="col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Ảnh xem trước
                  </label>
                  <div className="mt-1 w-40 h-40 relative">
                    <img
                      src={
                        preview ||
                        "https://res.cloudinary.com/assignmentjs/image/upload/c_thumb,w_200,g_face/v1648723660/img/noimage_mzjwxl.png"
                      }
                      alt="Preview Image"
                      className="h-40 w-40 rounded-sm object-cover"
                    />
                  </div>
                </div>
                {/* End image review */}

                {/* Add image */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Hình ảnh
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <input
                          {...register("image", {
                            required: "Vui lòng chọn ảnh",
                          })}
                          onChange={(e: any) => {
                            setPreview(URL.createObjectURL(e.target.files[0]));
                          }}
                          id="file-upload"
                          type="file"
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.image?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End add image */}
              </div>

              {/* Button */}
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2A303B] hover:bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]"
                >
                  <HiOutlineCheck className="mr-2 text-[20px]" />
                  Sửa sản phẩm
                </button>
              </div>
              {/* End button */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
