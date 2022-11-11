import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { forgetPassword } from "../../api-cilent/Auth";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
// import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";

type Props = {};
type Inputs = {
  password: string;
};

const ConfirmPassword = (props: Props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  console.log(token, id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    try {
      //   await forgetPassword(values.email);
      // console.log(values);

      toast.success("Thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //   setModal(true);
      //   dispatch(signinAction(user));
      //   setTimeout(() => {
      //     navigate("/");
      //   }, 1000);
    } catch (error: any) {
      console.log(error);

      //   const isVerify = error?.response.data.verified;
      //   if (isVerify === false && isVerify !== undefined) {
      //     Swal.fire({
      //       icon: "error",
      //       title: "Lỗi...",
      //       text: "Vui lòng kiểm tra email để xác thực tài khoản!",
      //     });
      //   }
      const message = error?.response.data.message;
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="pt-1">
      <div className="xl:w-[1200px] xl:mx-auto mt-5 mb-10 shadow-inner rounded-lg mx-3">
        <div className="content grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 shadow-lg">
          <img
            className="hidden xl:block lg:block bg-[#e7f6fb] rounded-l-lg"
            src="https://preview.colorlib.com/theme/bootstrap/login-form-14/images/xbg-1.jpg.pagespeed.ic.3OAd9jZTMD.webp"
          />
          <section>
            <div className="min-h-full flex items-center justify-center p-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 uppercase">
                    Đặt lại mật khẩu
                  </h2>
                </div>
                <form
                  className="mt-8 space-y-6"
                  id="form-signin"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="pb-4">
                      <label htmlFor="input-password" className="py-2">
                        Mật khẩu mới
                      </label>
                      <input
                        id="input-password"
                        {...register("password", {
                          required: "Vui lòng nhập mật khẩu",
                          minLength: {
                            value: 8,
                            message: "Vui lòng nhập nhập khẩu trên 8 ký tự",
                          },
                          // pattern: {
                          //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{8,30}$/,
                          //   message: "Vui lòng nhập nhập khẩu trên 8 ký tự bao gồm 'Chữ hoa, chữ thường, số và ký tự đặc biệt'"
                          // }
                        })}
                        type="password"
                        className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md ease-in-out duration-300 hover:border-blue-700 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        placeholder="Mật khẩu*"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.password?.message}
                      </p>
                    </div>

                    <div className="pb-4">
                      <label htmlFor="input-password" className="py-2">
                        Nhập lại mật khẩu
                      </label>
                      <input
                        id="input-password"
                        {...register("password", {
                          required: "Vui lòng nhập mật khẩu",
                          minLength: {
                            value: 8,
                            message: "Vui lòng nhập nhập khẩu trên 8 ký tự",
                          },
                          // pattern: {
                          //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{8,30}$/,
                          //   message: "Vui lòng nhập nhập khẩu trên 8 ký tự bao gồm 'Chữ hoa, chữ thường, số và ký tự đặc biệt'"
                          // }
                        })}
                        type="password"
                        className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md ease-in-out duration-300 hover:border-blue-700 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        placeholder="Mật khẩu*"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.password?.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group w-full relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đặt lại
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
