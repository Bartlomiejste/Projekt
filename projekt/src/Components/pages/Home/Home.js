import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import style from "../Home/Home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import AddMachine from "./AddMachine";
import { supabase } from "../../../supabase/config";
import Delete from "@mui/icons-material/Delete";

export default function Home() {
  const { isDarkTheme } = useContext(AppContext);

  const [errors, setErrors] = useState(null);
  const [namerow, setNamerow] = useState([]);

  useEffect(() => {
    getAllMachnies();
  }, []);

  const getAllMachnies = async () => {
    let { data: Machine, error } = await supabase.from("Machine").select("*");
    if (error) {
      setErrors(null);
      console.log(error);
    }
    if (Machine) {
      setNamerow(Machine);
      setErrors(null);
    }
  };

  const handleDelete = async () => {
    const { data: Machine, error } = await supabase
      .from("Machine")
      .delete()
      .eq("id", Machine.id);

    if (error) {
      console.log(Machine);
    }
    if (Machine) {
      console.log(Machine);
    }
  };

  return (
    <div className={style.home__section}>
      <AddMachine />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* zmiana koloru nagłówków !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! bg-black/ color:white*/}

              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Kategoria
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Nazwa
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Stan
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Uszkodzenia
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Cena w zł
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  background: "#4caf4faf",
                }}
              >
                Akcja
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {namerow.map((name, id) => (
              <TableRow
                key={id}
                sx={
                  ({ "&:last-child td, &:last-child th": { border: 0 } },
                  {
                    "&:nth-of-type(odd)": {
                      backgroundColor: "lightgray",
                    },
                  })
                }
              >
                <TableCell component="th" scope="row" align="center">
                  {name.Category}
                </TableCell>

                <TableCell align="center">{name.Name}</TableCell>

                <TableCell align="center">
                  {name.Condition === "Nowy" ? "Nowy" : "Używany"}
                </TableCell>

                <TableCell align="center">
                  {name.Damage === "Tak" ? "Tak" : "Nie"}
                </TableCell>

                <TableCell align="center">{name.Price}</TableCell>
                <TableCell align="left" sx={{ width: 90 }}>
                  <div className={style.table__icon}>
                    <EditIcon color="primary" />
                    <DeleteIcon onClick={handleDelete} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
