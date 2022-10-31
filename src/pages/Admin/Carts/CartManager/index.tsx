import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteCatePost, getAllCatePosts } from "../../../../redux/slices/catePostSlice";
import { getOrders, removeOrder } from "../../../../redux/slices/orderSlice";
import { formatCurrency } from "../../../../ultis";
import styles from "./Cart.module.css";

type Props = {};

const CartPostManager = () => {
  const dispatch = useDispatch<any>()
  const order = useSelector((state: any) => state.orders)
  const onDelete = async (id:any) => {
    const confirm = window.confirm("Bạn có chắc chắc muốn xoá đơn hàng này không?")
      if(confirm) { 
           await dispatch(removeOrder(id))
           toast.success("Xoá đơn hàng thành công")
      }
  }
  useEffect(() => {
        dispatch(getOrders())
  }, [dispatch])
  return (
    <div className={styles.content}>
      <header>
        <div className={styles.title}>Danh sách đơn hàng</div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Thông tin người nhận</td>
              <td>Phí giao hàng</td>
              <td>Tiền hàng</td>
              <td>Tổng tiền</td>
              <td>Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
         {order.orders?.map((item: any, index: number) => {
          let status = ""
          if(item.status == 0) {
              status = "Đang đợi xác nhận"
          }else if(item.status == 1 ) {
              status = "Đơn hàng đã được xác nhận."
          }else if(item.status == 2) {
              status = "Đã huỷ"
          }
          return <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>
          <div>{item.infomation.fullname}</div>
          <div>{item.infomation.address}</div>
          <div>{item.infomation.email}</div>
          <div>{item.infomation.phonenumber}</div>
          </td>
          <td>{ <NumberFormat
                            value={item?.fee}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={""}
                          />
                          } VNĐ </td> 
          <td>{ <NumberFormat
                            value={item?.productmonney}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={""}
                          />
                          } VNĐ </td> 
          <td>{ <NumberFormat
                            value={item?.totalprice}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={""}
                          />
                          } VNĐ </td> 
          <td>{status}</td>
          <td className={styles.action}>
            <Link to={`/admin/carts/update/${item._id}`}>
              <AiOutlineEdit className={styles.edit} />
            </Link>

            <AiOutlineDelete onClick={() => onDelete(item._id)}  className={styles.delete} />
          </td>
        </tr>
         })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default CartPostManager;
