import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
//styles
import "./WinesTablePage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { Button } from "@mui/material";
import axios from "axios";

export const BOTTOM_PADDING = 60; // value computed by sum of paddingTop and paddingBottom of `Layout`
const HEADER_HEIGHT = 56;
export const ROW_HEIGHT = 52;
const TABS_HEIGHT = window.innerWidth < 600 ? 70 : 15;

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 50,
    hide: true,
  },
  {
    field: "vzorka",
    headerName: "Vzorka",
    flex: 2,
    align: "center",
    headerAlign: "center",
    minWidth: 150,
  },
  {
    field: "kategoria",
    headerName: "Kategoria",
    flex: 2.5,
    minWidth: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "komisia",
    headerName: "Komisia",
    flex: 1.5,
    align: "center",
    headerAlign: "center",
    minWidth: 150,
  },
  {
    field: "rocnik",
    headerName: "Rocnik",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 100,
  },
  {
    field: "vystavovatel",
    headerName: "Vystavovatel",
    flex: 1.5,
    align: "center",
    headerAlign: "center",
    minWidth: 150,
  },
  {
    field: "hodnotenie",
    headerName: "Hodnotenie",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 100,
  },
];

export const WinesTablePage = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loggedUser = useRef<any>();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/wines/wines/userId/${localStorage.getItem(
          "loggedUserId"
        )}`
      )
      .then((response) => {
        loggedUser.current = response.data;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        loggedUser.current?.prava === "0" || loggedUser.current?.prava === "1"
          ? axios
              .get("http://localhost:4000/wines/wines/all")
              .then((response) => {
                setRows(
                  response.data.map((i: any) => ({
                    ...i,
                    id: i._id,
                    hodnotenie: 100,
                    komisia: i.komisia.meno,
                    vystavovatel:
                      i.vystavovatel?.meno && i.vystavovatel?.priezvisko
                        ? `${i.vystavovatel.meno} ${i.vystavovatel.priezvisko}`
                        : i.vystavovatel.email,
                  }))
                );
              })
              .catch((err) => console.log(err))
              .finally(() => setIsLoading(false))
          : axios
              .get(
                `http://localhost:4000/wines/wines/komisiaWines/${loggedUser.current?.komisia}`
              )
              .then((response) => {
                setRows(
                  response.data.map((i: any) => ({
                    ...i,
                    id: i._id,
                    hodnotenie: 100,
                    komisia: i.komisia.meno,
                    vystavovatel:
                      i.vystavovatel?.meno && i.vystavovatel?.priezvisko
                        ? `${i.vystavovatel.meno} ${i.vystavovatel.priezvisko}`
                        : i.vystavovatel.email,
                  }))
                );
              })
              .catch((err) => console.log(err))
              .finally(() => setIsLoading(false));
      });
  }, []);

  const history = useHistory();
  const screenHeight = window.innerHeight - BOTTOM_PADDING;
  const rowCount = rows.reduce((val) => {
    return val + 1;
  }, 0);

  const tableHeight =
    rowCount * ROW_HEIGHT + HEADER_HEIGHT - TABS_HEIGHT > screenHeight
      ? screenHeight - TABS_HEIGHT
      : rowCount * ROW_HEIGHT + HEADER_HEIGHT;

  const onRowClick = useCallback(
    (id: number | string) => history.push(`/wines/detail/${id}`),
    [history]
  );

  columns.push(
    {
      field: "confirmed",
      headerName: "Potvrdene",
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              display: "block",
              width: "8px",
              height: "8px",
              borderRadius: "100%",
              backgroundColor: params.row.potvrdene ? "lime" : "red",
            }}
          ></span>
        </div>
      ),
    },
    {
      field: "detail",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation();
          onRowClick(params.id);
        };

        return <Button onClick={onClick}>Detail</Button>;
      },
    },
    {
      field: "rate",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation();
          history.push(`/wines/rate/${params.id}/${loggedUser.current?._id}`);
        };

        return <Button onClick={onClick}>Hodnotiť</Button>;
      },
    }
  );

  const tabs = [{ label: "Zoznam vín", onClick: () => history.push("/") }];

  if (loggedUser.current?.prava !== "3") {
    tabs.push({
      label: "Pridať vzorku",
      onClick: () => history.push("/wines/create"),
    });
  }

  return (
    <>
      <Tabs activeTab={0} tabs={tabs} />

      {!isLoading && (
        <div style={{ height: tableHeight, width: "100%" }}>
          <DataGrid
            // disableVirtualization //TODO: check with larger data
            className="tableGrid"
            hideFooter
            rows={rows}
            columns={columns}
            onCellClick={undefined}
            onRowClick={({ id }) => onRowClick(id)}
          />
        </div>
      )}
    </>
  );
};
