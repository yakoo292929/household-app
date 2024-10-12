/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/common/IconComponents.tsx
 * PROGRAM NAME   : IconComponents.tsx
 *                : 共通：アイコン
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3ICon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SaveingsIcon from "@mui/icons-material/Savings";

import { ExpenseCategory, IncomeCategory } from "../../types";

////////////////////////////////////////////////////////////////////////
// IconComponents
////////////////////////////////////////////////////////////////////////
const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {

  食費: <FastfoodIcon fontSize="small" />,
  日用品: <AlarmIcon fontSize="small" />,
  住宅費: <AddHomeIcon fontSize="small" />,
  交際費: <Diversity3ICon fontSize="small" />,
  娯楽: <SportsTennisIcon fontSize="small" />,
  交通費: <TrainIcon fontSize="small" />,
  給与: <WorkIcon fontSize="small" />,
  副収入: <AddBusinessIcon fontSize="small" />,
  お小遣い: <SaveingsIcon fontSize="small" />,
  
};

export default IconComponents;
