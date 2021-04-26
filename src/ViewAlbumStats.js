import React from "react";
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

function ViewAlbumStats() {
  var data = [
    {
      Country: "Brazil",
      Export: 243,
      Import: 233,
    },
    {
      Country: "Russia",
      Export: 529,
      Import: 335,
    },
    {
      Country: "India",
      Export: 293,
      Import: 489,
    },
    {
      Country: "China",
      Export: 2049,
      Import: 1818,
    },
    {
      Country: "Japan",
      Export: 799,
      Import: 886,
    },
    {
      Country: "USA",
      Export: 1547,
      Import: 2335,
    },
    {
      Country: "Canada",
      Export: 455,
      Import: 475,
    },
    {
      Country: "France",
      Export: 569,
      Import: 674,
    },
    {
      Country: "England",
      Export: 468,
      Import: 680,
    },
    {
      Country: "Germany",
      Export: 1407,
      Import: 1167,
    },
  ];

  function customizeTooltip(arg) {
    return {
      text: `${arg.argumentText}<br>${arg.seriesName}: ${arg.valueText}B`,
    };
  }
  return (
    <div>
      <PieChart
        id="pie"
        type="doughnut"
        innerRadius={0.6}
        palette="material"
        dataSource={data}
      >
        <Title text="Earnings and Streams">
          <Subtitle text="(From Music Platforms )" />
        </Title>

        <CommonSeriesSettings>
          <Label visible={false} />
        </CommonSeriesSettings>
        <Series name="Import" argumentField="Country" valueField="Import" />

        <Export enabled={true} />
        <Legend visible={true} />

        <Tooltip
          enabled={true}
          format="currency"
          customizeTooltip={customizeTooltip}
        />
      </PieChart>
      <div className="my-5">
        <div className="shadow-lg flex justify-between items-center bg-white ">
          <h1 className="font-semibold text-lg mx-4 ">Earnings</h1>
          <span className="h-14 py-4 w-32 bg-blue-500 text-white text-center my-auto">
            <i className="fas fa-rupee-sign mx-2"></i>100
          </span>
        </div>
      </div>
    </div>
  );
}

export default ViewAlbumStats;
