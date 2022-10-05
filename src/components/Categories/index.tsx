import React, { useEffect, useState }  from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getCatePro } from '../../redux/slices/cateProductSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './Categories.module.css';
type Props = {}
function SampleNextArrow(props: { onClick: () => void; }) {
    const { onClick } = props;
    return (
      <div className={`${styles.next} ${styles.slickArrow}`} onClick={onClick}><HiOutlineChevronRight /></div>
    );
  }
  function SamplePrevArrow(props: { onClick: () => void; }) {
    const { onClick } = props;
    return (
      <div className={`${styles.prev} ${styles.slickArrow}`} onClick={onClick}><HiOutlineChevronLeft /></div>
    );
  }
const Categories = (props: Props) => {
  const catePro = useSelector((state : RootState) => state.catePro)
  console.log(catePro);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getCatePro()
    )
  }, [dispatch])
    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow:  <SampleNextArrow onClick={() => {}} />,
        prevArrow:  <SamplePrevArrow onClick={() => {}} />,
        cssEase: "linear"
  };
  return (
    <section className={styles.categories}>
        <div className={styles.categories__title}>
            <h2>Danh mục sản phẩm</h2>
        </div>
        <Slider className={styles.slider} {...settings}>
        {catePro?.cateproducts?.map((item : any)=>{
            return <div className={styles.categories__item}>
            <div className={styles.item__box}>
              <img src={item.image} alt='000017'/>
              <div className={styles.overlay}>
                <span>{item.name}</span>
              </div>
            </div>
          </div>
          })}
        
        {/* <div className={styles.categories__item}>
        <div className={styles.item__box}>
        <img src='https://img.cdn.vncdn.io/nvn/ncdn/store1/41786/ps/20220704/a__oa__o_copy_11.jpg' alt='Banner1-1'/>
        <div className={styles.overlay}>
              <span>Áo Thun</span>
          </div>
        </div>
        </div>
        <div className={styles.categories__item}>
        <div className={styles.item__box}>
        <img src='https://img.cdn.vncdn.io/nvn/ncdn/store1/41786/ps/20220704/qua____nqua____n_copy_4.jpg' alt='Banner1-1'/>
        <div className={styles.overlay}>
              <span>Quần Âu</span>
          </div>
        </div>
        </div>
        <div className={styles.categories__item}>
        <div className={styles.item__box}>
        <img src='https://img.cdn.vncdn.io/nvn/ncdn/store1/41786/ps/20220708/aoao_copy_9.jpg' alt='Banner1-1'/>
        <div className={styles.overlay}>
              <span>Áo Polo</span>
          </div>
        </div>
        </div> */}
        </Slider>
    </section>
  )
}

export default Categories