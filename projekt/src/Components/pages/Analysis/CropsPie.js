import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";
import styleAnalysis from "../Analysis/Analysis.module.css";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

const CropsPie = () => {
  const [crops, setCrops] = useState({
    datasets: [
      {
        data: "",
        backgroundColor: "",
      },
    ],
    labels: "",
  });
  const [nameCrops, setNameCrops] = useState([]);
  const [errors, setFormError] = useState();

  const getName = async () => {
    let { data: Crops, error } = await supabase
      .from("Crops")
      .select("kindofcrops");
    if (Crops) {
      setNameCrops(Crops);
    }
  };
  useEffect(() => {
    getCrops();
    getName();
  }, []);

  const getCrops = async () => {
    let { data: Crops, error } = await supabase.from("Crops").select("*");
    if (error) {
      setFormError(null);
      console.log(error);
    }

    if (Crops) {
      const id = [];
      let name = [...new Set(Crops.map((name) => name.kindofcrops))];

      const sumTotal = Crops.reduce((acc, cur) => {
        return (acc += cur.quantitycrops * cur.pricecrops);
      }, 0);

      const dataToDoghnut = Crops.reduce((acc, cur) => {
        const hasThisKindOfCrops = cur.kindofcrops.toString() in acc;

        let percentage = (cur.quantitycrops * cur.pricecrops * 100) / sumTotal;

        if (!hasThisKindOfCrops) {
          return {
            ...acc,
            [cur.kindofcrops]: percentage,
          };
        } else {
          return {
            ...acc,
            [cur.kindofcrops]: acc[cur.kindofcrops] + percentage,
          };
        }
      }, {});

      setCrops({
        datasets: [
          {
            data: Object.values(dataToDoghnut).map((el) => el.toFixed(2)),
            backgroundColor: [
              "Black",
              "Orange",
              "Yellow",
              "Green",
              "Blue",
              "Pink",
              "Brown",
              "Silver",
            ],
          },
        ],
        labels: name,
      });
      setFormError(null);
    }
  };
  return (
    <>
      <div
        className={styleAnalysis.analysis__pie}
        style={{ width: "20%", height: "20%" }}
      >
        <Doughnut data={crops} />
      </div>
    </>
  );
};

export default CropsPie;
