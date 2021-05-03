import React, { useState } from "react";
import PieChart, {
  CommonSeriesSettings,
  Legend,
  Series,
  Export,
  Label,
  Title,
  Tooltip,
  Subtitle,
} from "devextreme-react/pie-chart";
import PlatFormViewsEarnings from "./PlatFormViewsEarnings";
import { getEarnigns } from "./utis/Utils";

function ViewAlbumStats({ stats }) {
  const [data, setdata] = useState(stats ? stats : []);

  console.log(data);
  function customizeTooltip(arg) {
    return {
      text: `${arg.argumentText}<br>${arg.seriesName}: ${arg.valueText}B`,
    };
  }
  return (
    <div>
      {data.length !== 0 ? (
        <PieChart
          id="pie"
          type="doughnut"
          innerRadius={0.3}
          palette="material"
          dataSource={data}
        >
          <Title text="Earnings and Streams">
            <Subtitle text="(From Music Platforms )" />
          </Title>

          <CommonSeriesSettings>
            <Label visible={false} />
          </CommonSeriesSettings>
          <Series name="views" argumentField="platform" valueField="views" />
          <Series
            name="earings"
            argumentField="platform"
            valueField="earnings"
          />

          <Export enabled={true} />
          <Legend visible={true} />

          <Tooltip
            enabled={true}
            format="currency"
            customizeTooltip={customizeTooltip}
          />
        </PieChart>
      ) : (
        <div className="flex items-center justify-center h-52">
          <h2>NO updates yet</h2>
        </div>
      )}
      <div className="my-5">
        <div className="shadow-lg flex justify-between items-center bg-white ">
          <h1 className="font-semibold text-lg mx-4 ">Earnings</h1>
          <span className="h-14 py-4 w-32 bg-blue-500 text-white text-center my-auto">
            <i className="fas fa-rupee-sign mx-2"></i>
            {getEarnigns(data)}
          </span>
        </div>
      </div>
      <div className="">
        <h1 className="m-5">Views and Earnings</h1>

        <PlatFormViewsEarnings data={data} />
      </div>
    </div>
  );
}

export default ViewAlbumStats;
