import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const SetupSpark = ({ svgRef }) => {
  return (
    <>
      <style>
        {`
            svg.sparkSvg {
              pointer-events: none;
              position: absolute;
              rotate: -20deg;
              stroke: white; /* 設定為白色線條 */
            }

            line {
              stroke-dasharray: 30;
              stroke-dashoffset: 30;
              transform-origin: center;
            }
          `}
      </style>
      <svg
        className='sparkSvg'
        width='30'
        height='30'
        viewBox='0 0 100 100'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='4'
        ref={svgRef}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1='50' y1='30' x2='50' y2='4' />
        ))}
      </svg>
    </>
  );
};

SetupSpark.propTypes = {
  svgRef: PropTypes.object.isRequired,
};

const ClickSpark = () => {
  const svgRef = useRef();

  const animateSpark = () => {
    // 火花的子元素(線條)
    const sparks = [...svgRef.current.children];
    const size = parseInt(sparks[0].getAttribute("y1"));
    const offset = size / 2 + "px";

    // 定義動畫效果
    const keyframes = (i) => [
      {
        strokeDashoffset: size * 3,
        transform: `rotate(calc(${i} * (360deg / ${sparks.length}))) translateY(${offset})`,
      },
      {
        strokeDashoffset: size,
        transform: `rotate(calc(${i} * (360deg / ${sparks.length}))) translateY(0)`,
      },
    ];

    // 動畫設定
    const options = {
      duration: 660,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      fill: "forwards",
    };

    // 遍歷所有火花元素，動畫觸發
    sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
  };

  const setSparkPosition = (e) => {
    // 設定火花位置，以滑鼠點擊位置為基準，將SVG元素中心移動到點擊位置
    svgRef.current.style.left =
      e.clientX - svgRef.current.clientWidth / 2 + "px";
    svgRef.current.style.top =
      e.clientY - svgRef.current.clientHeight / 2 + "px";
  };

  useEffect(() => {
    // 假設在元件中有點擊事件的處理函式
    const handleClick = (e) => {
      setSparkPosition(e);
      animateSpark();
    };

    // 事件監聽器
    document.addEventListener("click", handleClick);

    return () => {
      // 清除事件監聽器
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <SetupSpark svgRef={svgRef} />;
};

export default ClickSpark;
