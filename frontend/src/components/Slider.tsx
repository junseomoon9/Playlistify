import React from "react";
import ReactSlider from "react-slider";
import { SliderData } from "../interfaces/dataInterfaces";
import { useDispatch } from 'react-redux';
import { updateSettings } from "../redux/settingsSlice";
import "./Slider.css"

export const Slider = (data: SliderData) => {
  const dispatch = useDispatch();
  const handleSliderChange = (res: any) => {
    dispatch(updateSettings({id: data.id, range: res}))
  }

  return (
    <div className="horizontal-slider-container">
      <h2>{data.title}</h2>
      <ReactSlider
        className="horizontal-slider"
        defaultValue={data.range}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        renderThumb={(props, state) => <div {...props}></div>}
        onAfterChange={(res) => handleSliderChange(res)}
        minDistance={10}
        withTracks
      />
      <div className="horizontal-slider-option-labels-container">
        <p>{data.rangeLabels[0]}</p>
        <p>{data.rangeLabels[1]}</p>
      </div>
    </div>
  );
};
