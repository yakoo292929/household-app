/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/TransactionTable.tsx
 * PROGRAM NAME   : TransactionTable.tsx
 *                : レイアウト：取引テーブル
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { Transaction } from '../../types';
import { financeCalculations, formatCurrency } from '../../utiles/utiles';
import { Grid, useTheme } from '@mui/material';
import IconComponents from '../common/IconComponents';
import { compareDesc, parseISO } from 'date-fns';


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface TransactionTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
}

////////////////////////////////////////////////////////////////////////
// TransactionTableToolbar（ツールバー）
////////////////////////////////////////////////////////////////////////
function TransactionTableToolbar(props: TransactionTableToolbarProps) {

  const { numSelected, onDelete } = props;

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          月の収支
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );

}


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface TransactionTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

////////////////////////////////////////////////////////////////////////
// TransactionTableHead（ヘッド）
////////////////////////////////////////////////////////////////////////
function TransactionTableHead(props: TransactionTableHeadProps) {

  const { onSelectAllClick, numSelected, rowCount } = props;

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <TableHead>

      <TableRow>

        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all desserts',}}
          />
        </TableCell>

        <TableCell align={"left"}>日 付</TableCell>
        <TableCell align={"left"}>カテゴリ</TableCell>
        <TableCell align={"left"}>金 額</TableCell>
        <TableCell align={"left"}>内 容</TableCell>

      </TableRow>

    </TableHead>

  );

}


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface FinancialItemProps {
  title: string;
  value: number;
  color: string;
}

////////////////////////////////////////////////////////////////////////
// FinancialItem（収入・支出・残高表示）
////////////////////////////////////////////////////////////////////////
function FinancialItem({title, value, color}: FinancialItemProps) {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Grid item xs={4} textAlign={"center"}>
      <Typography
        variant="subtitle1"
        component={"div"}>{title}
      </Typography>
      <Typography
        component={"span"}
        fontWeight={"fontWeightBold"}
        sx={{
          color: color,
          fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"},
          wordBreak: "break-word"
        }}
      >
        ¥{formatCurrency(value)}
      </Typography>
    </Grid>

  );

};


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface TransactionTableProps {
  monthlyTransactions: Transaction[];
  onDeleteTransanction: (trasactionId: string | readonly string[]) => Promise<void>;
  // isLoading: boolean;
}

////////////////////////////////////////////////////////////////////////
// TransactionTable
////////////////////////////////////////////////////////////////////////
export default function TransactionTable({monthlyTransactions, onDeleteTransanction}: TransactionTableProps) {

  //-----------------------------------------//
  // useTheme：MUIスタイル設定
  //-----------------------------------------//
  const theme = useTheme();

  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //-----------------------------------------//
  // 全行選択クリック
  //-----------------------------------------//
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = monthlyTransactions.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  //-----------------------------------------//
  // 該当行選択クリック
  //-----------------------------------------//
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
       );
    }
    setSelected(newSelected);
  };

  //-----------------------------------------//
  // ページクリック
  //-----------------------------------------//
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  //-----------------------------------------//
  // 表示件数クリック
  //-----------------------------------------//
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //-----------------------------------------//
  // 削除アイコンクリック
  //-----------------------------------------//
  const handleDelete = () => {
    onDeleteTransanction(selected);
    setSelected([]);

  }

  //-----------------------------------------//
  // トランザクション収支計算
  //-----------------------------------------//
  const {income, expense, balance} = financeCalculations(monthlyTransactions);

  //-----------------------------------------//
  // 空白行設定
  //-----------------------------------------//
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - monthlyTransactions.length) : 0;

  //-----------------------------------------//
  // 取引データから表示件数分取得
  //-----------------------------------------//
  const visibleRows = React.useMemo(() => {
      const sortedMonthlyTransactions = [...monthlyTransactions].sort((a,b) =>
        compareDesc(parseISO(a.date), parseISO(b.date))
      );

      return sortedMonthlyTransactions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

    }, [page, rowsPerPage, monthlyTransactions],

  );

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Box sx={{ width: '100%' }}>

      <Paper sx={{ width: '100%', mb: 2 }}>

        <Grid container sx={{borderBottom: "1px solid rgba(244, 244, 244, 1)"}}>
          <FinancialItem
            title={"収 入"}
            value={income}
            color={theme.palette.incomeColor.main}
          />
          <FinancialItem
            title={"支 出"}
            value={expense}
            color={theme.palette.expenseColor.main}
          />
          <FinancialItem
            title={"残 高"}
            value={balance}
            color={theme.palette.balanceColor.main}
          />
        </Grid>

        {/* ツールバー */}
        <TransactionTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
        />

        {/* テーブルコンテナ */}
        <TableContainer>

          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >

            {/* テーブルヘッド */}
            <TransactionTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={monthlyTransactions.length}
            />

            {/* テーブルボディ */}
            <TableBody>
              {visibleRows.map((transaction, index) => {
                const isItemSelected = selected.includes(transaction.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, transaction.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={transaction.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {transaction.date}
                    </TableCell>
                    <TableCell align="left" sx={{display: "flex", alignItems: "center"}}>
                      {IconComponents[transaction.category]}
                      {transaction.category}
                    </TableCell>
                    <TableCell align="left">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell align="left">
                      {transaction.content}
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* 空行対応 */}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

          </Table>

        </TableContainer>

        {/* ページネーション */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={monthlyTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>

    </Box>

  );

}
