import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import banner1 from '../../../assets/Banner-img/15855414_5678546.jpg';
import banner3 from '../../../assets/Banner-img/33584145_8074577.jpg';
import banner2 from '../../../assets/Banner-img/34484981_8169120.jpg';


const Banner = () => {
    const slider = (
      <AwesomeSlider>
        <div>
          <img src={banner1} alt="" />

        </div>
        <div>
          <img src={banner3} alt="" />
        </div>
        <div>
          <img src={banner2} alt="" />
        </div>
      </AwesomeSlider>
    );
    return (
      <div>
        <div className="mt-7">
          {slider}
        </div>
      </div>
    );
};

export default Banner;