import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../services/board.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {ExcelService} from "../../services/excel.service";
import {ExcelExportService} from "../../services/excel-export.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public boardService: BoardService,
    public excelService: ExcelService,
    public excelExportService: ExcelExportService,
    private auth: AngularFireAuth,
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  addColumn(title: string) {
    if (title) {
      this.boardService.addColumn(title)
    }
  }

  onLogout() {
    this.auth.signOut().then(() => this.router.navigate(['login']))
  }

  onExportExcel(): void {
    const json = [
      {
        "id": 1,
        "name": "Viki",
        "surname": "Dracula",
        "age": 21
      },
      {
        "id": 2,
        "name": "Rob",
        "surname": "Zombie",
        "age": 12
      },
      {
        "id": 3,
        "name": "Super",
        "surname": "Man",
        "age": 38
      }
    ]
    this.excelExportService.exportAsExcelFile(json, 'portaUpload');
    // console.log(this.boardService.board)

  }


}
