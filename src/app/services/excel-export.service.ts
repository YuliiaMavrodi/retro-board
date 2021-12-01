import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {BoardService} from "./board.service";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_TYPE = 'application/octet-stream';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor(private boardService: BoardService) {
  }

  private s2ab(s: any): any {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  public exportAsExcelFile(): void {
    const boardByTask: any[] = []
    this.boardService.board.map(col => {
      col.list.map(task => {
        boardByTask.push({
          columnTitle: col.title,
          taskText: task.text,
          taskLike: task.like,
          taskComments: task.comments.length
        })
      })
    })


    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(boardByTask);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', bookSST: true, type: 'binary'});
    this.saveAsExcelFile(excelBuffer, 'portaUpload');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([this.s2ab(buffer)], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
