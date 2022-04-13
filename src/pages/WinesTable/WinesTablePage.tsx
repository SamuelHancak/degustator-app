import React, { useCallback, useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
//styles
import "./WinesTablePage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { Button } from "@mui/material";
import { LoggedInUserContext } from "../../App";
import axios from "axios";

export const BOTTOM_PADDING = 60; // value computed by sum of paddingTop and paddingBottom of `Layout`
const HEADER_HEIGHT = 56;
export const ROW_HEIGHT = 52;
const TABS_HEIGHT = window.innerWidth < 600 ? 70 : 15;

// Test data
// let rows: GridRowsProp = [
//   {
//     id: 1,
//     name: "Chlorpromazine Hydrochloride",
//     color: "Purple",
//     year: 2006,
//     category: "Ornamental Railings",
//     number: 93,
//   },
//   {
//     id: 2,
//     name: "Capsaicin and Menthol",
//     color: "Aquamarine",
//     year: 1984,
//     category: "Drywall & Acoustical (FED)",
//     number: 17,
//   },
//   {
//     id: 3,
//     name: "Wart Remover Medicated Discs",
//     color: "Pink",
//     year: 2012,
//     category: "Structural & Misc Steel Erection",
//     number: 58,
//   },
//   {
//     id: 4,
//     name: "Echinacea Essence",
//     color: "Purple",
//     year: 2003,
//     category: "Ornamental Railings",
//     number: 96,
//   },
//   {
//     id: 5,
//     name: "metformin hydrochloride",
//     color: "Purple",
//     year: 1994,
//     category: "Wall Protection",
//     number: 25,
//   },
//   {
//     id: 6,
//     name: "Stavudine",
//     color: "Khaki",
//     year: 2003,
//     category: "Roofing (Metal)",
//     number: 11,
//   },
//   {
//     id: 7,
//     name: "eflornithine hydrochloride",
//     color: "Violet",
//     year: 1998,
//     category: "Ornamental Railings",
//     number: 53,
//   },
//   {
//     id: 8,
//     name: "Lisinopril",
//     color: "Turquoise",
//     year: 2004,
//     category: "Epoxy Flooring",
//     number: 62,
//   },
//   {
//     id: 9,
//     name: "Salt Grass",
//     color: "Crimson",
//     year: 2005,
//     category: "Ornamental Railings",
//     number: 24,
//   },
//   {
//     id: 10,
//     name: "Menthol and Camphor (Synthetic)",
//     color: "Fuscia",
//     year: 2003,
//     category: "Curb & Gutter",
//     number: 59,
//   },
//   {
//     id: 11,
//     name: "Promethazine hydrochloride",
//     color: "Green",
//     year: 2008,
//     category: "Termite Control",
//     number: 78,
//   },
//   {
//     id: 12,
//     name: "Menthol",
//     color: "Puce",
//     year: 2012,
//     category: "Drywall & Acoustical (MOB)",
//     number: 40,
//   },
//   {
//     id: 13,
//     name: "Nicotine",
//     color: "Red",
//     year: 2008,
//     category: "Temp Fencing, Decorative Fencing and Gates",
//     number: 92,
//   },
//   {
//     id: 14,
//     name: "Amoxicillin",
//     color: "Mauv",
//     year: 1993,
//     category: "RF Shielding",
//     number: 90,
//   },
//   {
//     id: 15,
//     name: "warfarin sodium",
//     color: "Pink",
//     year: 1998,
//     category: "HVAC",
//     number: 86,
//   },
//   {
//     id: 16,
//     name: "Ibuprofen",
//     color: "Green",
//     year: 1985,
//     category: "Plumbing & Medical Gas",
//     number: 95,
//   },
//   {
//     id: 17,
//     name: "Titanium Dioxide",
//     color: "Maroon",
//     year: 1996,
//     category: "Temp Fencing, Decorative Fencing and Gates",
//     number: 45,
//   },
//   {
//     id: 18,
//     name: "Metformin Hydrochloride",
//     color: "Purple",
//     year: 1992,
//     category: "Waterproofing & Caulking",
//     number: 55,
//   },
//   {
//     id: 19,
//     name: "Hydralazine Hydrochloride",
//     color: "Maroon",
//     year: 1993,
//     category: "Overhead Doors",
//     number: 21,
//   },
//   {
//     id: 20,
//     name: "Ciprofloxacin",
//     color: "Purple",
//     year: 2003,
//     category: "Epoxy Flooring",
//     number: 15,
//   },
//   {
//     id: 21,
//     name: "Omeprazole",
//     color: "Violet",
//     year: 2010,
//     category: "Fire Protection",
//     number: 65,
//   },
//   {
//     id: 22,
//     name: "Hops",
//     color: "Puce",
//     year: 2004,
//     category: "Framing (Steel)",
//     number: 29,
//   },
//   {
//     id: 23,
//     name: "simvastatin",
//     color: "Indigo",
//     year: 2011,
//     category: "Drilled Shafts",
//     number: 33,
//   },
//   {
//     id: 24,
//     name: "ESTROGENS, CONJUGATED",
//     color: "Green",
//     year: 2004,
//     category: "Electrical",
//     number: 57,
//   },
//   {
//     id: 25,
//     name: "Ropinirole Hydrochloride",
//     color: "Red",
//     year: 1993,
//     category: "Drilled Shafts",
//     number: 18,
//   },
//   {
//     id: 26,
//     name: "Naproxen Sodium",
//     color: "Crimson",
//     year: 2001,
//     category: "Electrical and Fire Alarm",
//     number: 11,
//   },
//   {
//     id: 27,
//     name: "Varicella Virus Vaccine Live",
//     color: "Orange",
//     year: 1995,
//     category: "Fire Sprinkler System",
//     number: 96,
//   },
//   {
//     id: 28,
//     name: "Salicylic acid",
//     color: "Yellow",
//     year: 2009,
//     category: "Glass & Glazing",
//     number: 60,
//   },
//   {
//     id: 29,
//     name: "cisatracurium besylate",
//     color: "Teal",
//     year: 1992,
//     category: "Construction Clean and Final Clean",
//     number: 26,
//   },
//   {
//     id: 30,
//     name: "Acetaminophen",
//     color: "Blue",
//     year: 1992,
//     category: "Fire Protection",
//     number: 97,
//   },
//   {
//     id: 31,
//     name: "ALCOHOL",
//     color: "Yellow",
//     year: 2006,
//     category: "Masonry",
//     number: 90,
//   },
//   {
//     id: 32,
//     name: "Estazolam",
//     color: "Red",
//     year: 2007,
//     category: "Electrical",
//     number: 20,
//   },
//   {
//     id: 33,
//     name: "Oxygen",
//     color: "Khaki",
//     year: 2002,
//     category: "Painting & Vinyl Wall Covering",
//     number: 64,
//   },
//   {
//     id: 34,
//     name: "Aconitum napellus, Apis mellifica, Arnica montana, Arsenicum album, Belladonna, Bellis perennis, Bryonia, Calendula officinalis, Chamomilla, Clematis erecta, Clematis vitalba, flos, Ferrum phosphoricum, Histaminum hydrochloricum, Hypericum perforatum, Ignatia amara, Impatiens glandulifera, flos, ornithogalum umbellatum, flos, Passiflora incarnata, Phosphorus, Prunus cerasifera, flos, Rhus toxicodendron, sulphur, symphytum officinale, Veratrum album",
//     color: "Maroon",
//     year: 2009,
//     category: "Masonry",
//     number: 75,
//   },
//   {
//     id: 35,
//     name: "Trazodone Hydrochloride",
//     color: "Red",
//     year: 2008,
//     category: "Glass & Glazing",
//     number: 32,
//   },
//   {
//     id: 36,
//     name: "Fentanyl",
//     color: "Crimson",
//     year: 1985,
//     category: "Electrical",
//     number: 61,
//   },
//   {
//     id: 37,
//     name: "prednicarbate",
//     color: "Yellow",
//     year: 2006,
//     category: "Electrical and Fire Alarm",
//     number: 86,
//   },
//   {
//     id: 38,
//     name: "Avobenzone, Homosalate, Octisalate, Octocrylene, Oxybenzone",
//     color: "Puce",
//     year: 1994,
//     category: "Wall Protection",
//     number: 53,
//   },
//   {
//     id: 39,
//     name: "Macadamia Nut",
//     color: "Mauv",
//     year: 2009,
//     category: "Overhead Doors",
//     number: 34,
//   },
//   {
//     id: 40,
//     name: "ziprasidone hydrochloride",
//     color: "Aquamarine",
//     year: 1997,
//     category: "Asphalt Paving",
//     number: 21,
//   },
//   {
//     id: 41,
//     name: "Ash Mixture",
//     color: "Maroon",
//     year: 2002,
//     category: "Painting & Vinyl Wall Covering",
//     number: 36,
//   },
//   {
//     id: 42,
//     name: "TRICLOSAN",
//     color: "Crimson",
//     year: 2004,
//     category: "Wall Protection",
//     number: 20,
//   },
//   {
//     id: 43,
//     name: "Fremont Cottonwood",
//     color: "Teal",
//     year: 1992,
//     category: "Ornamental Railings",
//     number: 41,
//   },
//   {
//     id: 44,
//     name: "METOPROLOL SUCCINATE",
//     color: "Crimson",
//     year: 2004,
//     category: "Exterior Signage",
//     number: 84,
//   },
//   {
//     id: 45,
//     name: "Lamotrigine",
//     color: "Orange",
//     year: 2002,
//     category: "Drywall & Acoustical (MOB)",
//     number: 99,
//   },
//   {
//     id: 46,
//     name: "Permethrin",
//     color: "Aquamarine",
//     year: 2011,
//     category: "Landscaping & Irrigation",
//     number: 63,
//   },
//   {
//     id: 47,
//     name: "cocoa butter, phenylephrine HCl",
//     color: "Puce",
//     year: 2004,
//     category: "Overhead Doors",
//     number: 34,
//   },
//   {
//     id: 48,
//     name: "potassium chloride",
//     color: "Goldenrod",
//     year: 2007,
//     category: "Casework",
//     number: 19,
//   },
//   {
//     id: 49,
//     name: "Elaps corallinus, Alumina, Carbo veg., Causticum, Conium, Graphites, Kali bic.,Kali mur., Lachesis, Lycopodium, Petroleum, Pulsatilla, Sabadilla, Sepia, Silicea, Spongia, Verbascum, Viola odorata",
//     color: "Maroon",
//     year: 2002,
//     category: "Fire Protection",
//     number: 68,
//   },
//   {
//     id: 50,
//     name: "Hyoscyamine Sulfate",
//     color: "Maroon",
//     year: 1985,
//     category: "RF Shielding",
//     number: 60,
//   },
//   {
//     id: 51,
//     name: "Allopurinol",
//     color: "Blue",
//     year: 1965,
//     category: "Site Furnishings",
//     number: 98,
//   },
//   {
//     id: 52,
//     name: "Wasp hymenoptera venom Multidose",
//     color: "Teal",
//     year: 1986,
//     category: "Framing (Wood)",
//     number: 56,
//   },
//   {
//     id: 53,
//     name: "benzocaine",
//     color: "Puce",
//     year: 2003,
//     category: "Plumbing & Medical Gas",
//     number: 72,
//   },
//   {
//     id: 54,
//     name: "Glycerin",
//     color: "Maroon",
//     year: 1993,
//     category: "Framing (Steel)",
//     number: 92,
//   },
//   {
//     id: 55,
//     name: "BENZALKONIUM CHLORIDE",
//     color: "Orange",
//     year: 2004,
//     category: "Landscaping & Irrigation",
//     number: 66,
//   },
//   {
//     id: 56,
//     name: "Ropinirole Hydrochloride",
//     color: "Goldenrod",
//     year: 1996,
//     category: "EIFS",
//     number: 45,
//   },
//   {
//     id: 57,
//     name: "Nicotine Polacrilex",
//     color: "Khaki",
//     year: 1995,
//     category: "Framing (Steel)",
//     number: 77,
//   },
//   {
//     id: 58,
//     name: "Ketotifen Fumarate",
//     color: "Yellow",
//     year: 1994,
//     category: "Landscaping & Irrigation",
//     number: 92,
//   },
//   {
//     id: 59,
//     name: "Benzalkonium Chloride",
//     color: "Pink",
//     year: 2009,
//     category: "Construction Clean and Final Clean",
//     number: 26,
//   },
//   {
//     id: 60,
//     name: "Diphenhydramine HCl",
//     color: "Blue",
//     year: 2001,
//     category: "Elevator",
//     number: 1,
//   },
//   {
//     id: 61,
//     name: "Treatment Set TS128871",
//     color: "Red",
//     year: 1991,
//     category: "Asphalt Paving",
//     number: 42,
//   },
//   {
//     id: 62,
//     name: "Oxcarbazepine",
//     color: "Pink",
//     year: 2005,
//     category: "EIFS",
//     number: 13,
//   },
//   {
//     id: 63,
//     name: "Trazodone Hydrochloride",
//     color: "Mauv",
//     year: 2009,
//     category: "Structural & Misc Steel Erection",
//     number: 64,
//   },
//   {
//     id: 64,
//     name: "Fluticasone Propionate",
//     color: "Purple",
//     year: 2009,
//     category: "Drywall & Acoustical (FED)",
//     number: 34,
//   },
//   {
//     id: 65,
//     name: "ropivacaine hydrochloride",
//     color: "Green",
//     year: 1974,
//     category: "Soft Flooring and Base",
//     number: 28,
//   },
//   {
//     id: 66,
//     name: "Doxylamine succinate",
//     color: "Teal",
//     year: 1991,
//     category: "Wall Protection",
//     number: 57,
//   },
//   {
//     id: 67,
//     name: "Minoxidil",
//     color: "Orange",
//     year: 2000,
//     category: "Drilled Shafts",
//     number: 94,
//   },
//   {
//     id: 68,
//     name: "metoprolol tartrate",
//     color: "Crimson",
//     year: 2009,
//     category: "Drywall & Acoustical (MOB)",
//     number: 89,
//   },
//   {
//     id: 69,
//     name: "Kit for the Preparation of Technetium Tc99m Sestamibi Injection",
//     color: "Puce",
//     year: 2012,
//     category: "Site Furnishings",
//     number: 57,
//   },
//   {
//     id: 70,
//     name: "Octinoxate, Titanium Dioxide",
//     color: "Pink",
//     year: 2008,
//     category: "Exterior Signage",
//     number: 25,
//   },
//   {
//     id: 71,
//     name: "Hydrocortisone",
//     color: "Fuscia",
//     year: 1999,
//     category: "Curb & Gutter",
//     number: 68,
//   },
//   {
//     id: 72,
//     name: "PHENYLEPHRINE HYDROCHLORIDE",
//     color: "Blue",
//     year: 2012,
//     category: "HVAC",
//     number: 20,
//   },
//   {
//     id: 73,
//     name: "Lisinopril",
//     color: "Green",
//     year: 1998,
//     category: "Soft Flooring and Base",
//     number: 49,
//   },
//   {
//     id: 74,
//     name: "Octinoxate, Octisalate, and Titanium Dioxide",
//     color: "Maroon",
//     year: 2001,
//     category: "Doors, Frames & Hardware",
//     number: 84,
//   },
//   {
//     id: 75,
//     name: "Doxazosin",
//     color: "Purple",
//     year: 2009,
//     category: "Soft Flooring and Base",
//     number: 19,
//   },
//   {
//     id: 76,
//     name: "Orange Pekoe Tea",
//     color: "Goldenrod",
//     year: 2003,
//     category: "RF Shielding",
//     number: 8,
//   },
//   {
//     id: 77,
//     name: "buspirone hydrochloride",
//     color: "Indigo",
//     year: 2012,
//     category: "Granite Surfaces",
//     number: 58,
//   },
//   {
//     id: 78,
//     name: "KALI BROMATUM, CINCHONA OFFICINALIS, SULPHUR, DULCAMARA, HYDRASTIS CANADENSIS, ARNICA MONTANA, BRYONIA CAUSTICUM",
//     color: "Maroon",
//     year: 2012,
//     category: "Site Furnishings",
//     number: 79,
//   },
//   {
//     id: 79,
//     name: "Triclosan",
//     color: "Blue",
//     year: 1988,
//     category: "Marlite Panels (FED)",
//     number: 32,
//   },
//   {
//     id: 80,
//     name: "TITANIUM DIOXIDE",
//     color: "Green",
//     year: 2011,
//     category: "Painting & Vinyl Wall Covering",
//     number: 87,
//   },
//   {
//     id: 81,
//     name: "Menthol",
//     color: "Purple",
//     year: 2011,
//     category: "Framing (Wood)",
//     number: 72,
//   },
//   {
//     id: 82,
//     name: "calcium carbonate",
//     color: "Turquoise",
//     year: 1990,
//     category: "Overhead Doors",
//     number: 54,
//   },
//   {
//     id: 83,
//     name: "TITANIUM DIOXIDE, ZINC OXIDE",
//     color: "Pink",
//     year: 1963,
//     category: "Landscaping & Irrigation",
//     number: 53,
//   },
//   {
//     id: 84,
//     name: "DOXEPIN HYDROCHLORIDE",
//     color: "Indigo",
//     year: 1992,
//     category: "Wall Protection",
//     number: 67,
//   },
//   {
//     id: 85,
//     name: "valacyclovir hydrochloride",
//     color: "Red",
//     year: 1993,
//     category: "Electrical and Fire Alarm",
//     number: 39,
//   },
//   {
//     id: 86,
//     name: "montelukast sodium",
//     color: "Violet",
//     year: 1994,
//     category: "Drywall & Acoustical (FED)",
//     number: 79,
//   },
//   {
//     id: 87,
//     name: "Avobenzone, Octinoxate, Octisalate",
//     color: "Maroon",
//     year: 2007,
//     category: "Plumbing & Medical Gas",
//     number: 41,
//   },
//   {
//     id: 88,
//     name: "CEFEPIME",
//     color: "Yellow",
//     year: 2008,
//     category: "Site Furnishings",
//     number: 60,
//   },
//   {
//     id: 89,
//     name: "tolnaftate",
//     color: "Purple",
//     year: 2005,
//     category: "Roofing (Metal)",
//     number: 68,
//   },
//   {
//     id: 90,
//     name: "Mirtazapine",
//     color: "Red",
//     year: 2012,
//     category: "Structural and Misc Steel (Fabrication)",
//     number: 47,
//   },
//   {
//     id: 91,
//     name: "METHYL NICOTINATE, CAPSAICIN",
//     color: "Orange",
//     year: 2011,
//     category: "Epoxy Flooring",
//     number: 24,
//   },
//   {
//     id: 92,
//     name: "NEUROSPORA INTERMEDIA",
//     color: "Khaki",
//     year: 2007,
//     category: "Curb & Gutter",
//     number: 2,
//   },
//   {
//     id: 93,
//     name: "Aluminum Chlorohydrate",
//     color: "Yellow",
//     year: 2005,
//     category: "Waterproofing & Caulking",
//     number: 68,
//   },
//   {
//     id: 94,
//     name: "Dextromethorphan Hbr, Guiafenesin, Phenylephrine HCl",
//     color: "Khaki",
//     year: 2005,
//     category: "Prefabricated Aluminum Metal Canopies",
//     number: 67,
//   },
//   {
//     id: 95,
//     name: "amlodipine besylate and benazepril hydrochloride",
//     color: "Teal",
//     year: 1987,
//     category: "Site Furnishings",
//     number: 99,
//   },
//   {
//     id: 96,
//     name: "sodium phosphate",
//     color: "Crimson",
//     year: 1991,
//     category: "Curb & Gutter",
//     number: 76,
//   },
//   {
//     id: 97,
//     name: "PAMIDRONATE DISODIUM",
//     color: "Mauv",
//     year: 1998,
//     category: "Site Furnishings",
//     number: 79,
//   },
//   {
//     id: 98,
//     name: "TOPIRAMATE",
//     color: "Khaki",
//     year: 1997,
//     category: "Doors, Frames & Hardware",
//     number: 96,
//   },
//   {
//     id: 99,
//     name: "Naproxen sodium",
//     color: "Crimson",
//     year: 1994,
//     category: "Sitework & Site Utilities",
//     number: 49,
//   },
//   {
//     id: 100,
//     name: "Ketorolac Tromethamine",
//     color: "Fuscia",
//     year: 1994,
//     category: "Hard Tile & Stone",
//     number: 40,
//   },
// ];

// Test data
const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    flex: 0.5,
    align: "center",
    headerAlign: "center",
    minWidth: 50,
    hide: true,
  },
  {
    field: "vzorka",
    headerName: "Vzorka",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 100,
  },
  { field: "kategoria", headerName: "Kategoria", flex: 2.5, minWidth: 250 },
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
];

export const WinesTablePage = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines//wines/all")
      .then((response) => {
        setRows(response.data.map((i: any) => ({ ...i, id: i._id })));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const loggedUser = useContext(LoggedInUserContext);
  const history = useHistory();
  const screenHeight = window.innerHeight - BOTTOM_PADDING;
  const rowCount = rows.reduce((val) => {
    return val + 1;
  }, 0);

  const tableHeight =
    rowCount * ROW_HEIGHT + HEADER_HEIGHT - TABS_HEIGHT > screenHeight
      ? screenHeight - TABS_HEIGHT
      : rowCount * ROW_HEIGHT + HEADER_HEIGHT - TABS_HEIGHT;

  const onRowClick = useCallback(
    (id: number | string) => history.push(`/wines/detail/${id}`),
    [history]
  );

  columns.push(
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
          history.push(`/wines/rate/${params.id}`);
        };

        return <Button onClick={onClick}>Hodnotiť</Button>;
      },
    }
  );

  const tabs = [{ label: "Zoznam vín", onClick: () => history.push("/") }];

  if (loggedUser.loggedInUser?.email !== "hodnotitel@mail.com") {
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
