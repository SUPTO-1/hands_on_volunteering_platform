
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import first from '../../Images/1.jpg';
import second from '../../Images/2.jpg';
import third from '../../Images/3.jpg';

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function(currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function(currentSlide) {
      console.log("after change", currentSlide);
    }
  };

  return (
    <div className='w-full px-0' data-aos="fade-down" data-aos-duration="1500">
      <Slider {...settings}>
        <div className='slide md:h-[700px] w-full'>
          <img className='rounded-lg md:h-[700px] w-full' src={third} alt="First Slide" />
        </div>
        <div className='slide md:h-[700px] w-full'>
          <img className='rounded-lg md:h-[700px] w-full' src={second} alt="Second Slide" />
        </div>
        <div className='slide md:h-[700px] w-full'>
          <img className='rounded-lg md:h-[700px] w-full' src={first} alt="Third Slide" />
        </div>
      </Slider>
    </div>
  );
}

export default Banner;