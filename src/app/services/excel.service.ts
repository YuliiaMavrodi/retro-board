import {Injectable} from '@angular/core';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
//
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';


import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import {BoardService} from "./board.service";


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
    public boardService: BoardService
  ) {}

  addRow(worksheet: any, data: any): void {
    for (let x1 of data) {
      if(typeof Object.values(x1) === 'object') {
      }
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        // @ts-ignore
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

  }

  exportExcel(): void {
    let workbook = new Workbook()
    let worksheet = workbook.addWorksheet("Board Data");
    // let header1 = ['Id', 'Text', "Like"]

    let header = [
      "Id",
      "Title",
      "List"
      // header1
    ]
    let headerRow = worksheet.addRow(header);

    const boardData = this.boardService.board

    this.addRow(worksheet, boardData)

    let fname = "Board Data"

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }


  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }
  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
  //   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  // }

}
