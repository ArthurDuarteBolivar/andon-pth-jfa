import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Nodemcu } from '../model/nodemcu';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http: HttpClient) { }


  submitForm(nodemcuUpdates: Nodemcu, isValorFinal: boolean): Observable<any> {

    let url: string = "";
    var data: Date = new Date();
    switch (nodemcuUpdates.nameId.name) {
      case "070": //0
        url = "https://docs.google.com/forms/d/e/1FAIpQLSeyzSe6ZExBwkID6gdZ_uBNusEuMAo0BUtSgnvhI4tNzcBALw/formResponse";
        break;
      case "080": //1
        url = "https://docs.google.com/forms/d/e/1FAIpQLSe-EuBb7DrZk55jHF_tRniRXXT6IsAJQea7_NMjdTk12bajFg/formResponse";
        break;
      case "090": //2
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdEHkBW-hbjxqJOzU4kXUqqW4DjsmcXzE_1XUbMdeo9Df-3bA/formResponse";
        break;
      case "100": //3
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdF41TD5Wd1-KRkTxMF5NJLD4U2X3eushwffnldS38YrpCYlQ/formResponse";
        break;
      case "110": //4
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdJRMBQA9SicIgLxb6s7GnwGkbs_-M3ZVGjDbJhZ2xv2Va-rw/formResponse";
        break;
      case "120": //5
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdMRBPu1BzVS7soNWh8T4Q00MNhaQQtAi1NWTTjtneAdV5Fzg/formResponse";
        break;
      case "130": //6
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfwfHTAN4g4gvS7GTJaQwufKjkJ5j36DtOpBkc3IrUaTT_fIg/formResponse";
        break;
      case "140": //7
        url = "https://docs.google.com/forms/d/e/1FAIpQLSehrSQnWkv6txSCZj9OmJlO2VS3s7tY2oT0cmP18ZblNXHxcg/formResponse";
        break;
      case "150": //8
        url = "https://docs.google.com/forms/d/e/1FAIpQLScvpW4H7uq64D8AhFCtSWE62448MoMZaB2U-wnkJMnc5q0F8A/formResponse";
        break;
      case "160": //9
        url = "https://docs.google.com/forms/d/e/1FAIpQLScEw7p2vD5DnYkXzFhMSQRJjy9N7k7CLfZTqDT6ibhJrX-Fng/formResponse";
        break;
      case "170": //10
        url = "https://docs.google.com/forms/d/e/1FAIpQLSde4JO3EM8lyXeHuWW0-HQBckEaeKPu9Ji1eBGa14cwyGyy7g/formResponse";
        break;
      case "180": //11
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdh9aSt8dRmiYzKHsGNjaXm7cZCVs_l8-W14IbWNvNNRtgwTA/formResponse";
        break;
      case "190": //12
        url = "https://docs.google.com/forms/d/e/1FAIpQLScYj4Gm13ww2_Tf2bNGjm-3ISqs3EA5ql8vNZtNO-X4f3J93g/formResponse";
        break;
      case "200": //13
        url = "https://docs.google.com/forms/d/e/1FAIpQLSeCXF8z7_itMCX_xPw10TxjnLzsNdqucXe8SKvUoVJntvIuCQ/formResponse";
        break;
      case "210": //14
        url = "https://docs.google.com/forms/d/e/1FAIpQLSd7aAMDZVTWKvz2m8cCRGs73yh1Tu4ikbmMrKUmG3c48anf6A/formResponse";
        break;
      case "220": //15
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfaVtWXfmkBoMzgFEEEIipZBpe7NS4yn28zUxj45Uf8344NNQ/formResponse";
        break;
      case "230": //16
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfW0lEenVJGs6TNnMs5mr73biSKPpOHQf9qWZu5E-sFbH2H8w/formResponse";
        break;
      case "240": //17
        url = "https://docs.google.com/forms/d/e/1FAIpQLSeR7zqc77cnF6akhaatnxz1p-Oy-PEzF2sZHbDR9bLf-IDKTw/formResponse";
        break;
      case "250": //18
        url = "https://docs.google.com/forms/d/e/1FAIpQLSe6Q85ej19gYjKss4HHVHbFAIdb2EM4XUGw_fKwxzUrwG1v6Q/formResponse";
        break;
      default:
        break;
    }
    var downTime;
    if (isValorFinal) {
      downTime = "VALOR FINAL";
    } else {
      downTime = "";
    }

    if (nodemcuUpdates.count >= 0) {
      const params = new URLSearchParams();
      params.set('ifq', '');
      if(nodemcuUpdates.nameId.name == '080' || nodemcuUpdates.nameId.name == '070'){
        params.set('entry.1176456592', nodemcuUpdates.count.toString());
        params.set('entry.974924983', nodemcuUpdates.maintenance.toString());
        params.set('entry.1153187575', '');
        params.set('entry.2095431211', downTime);
      }else{
        params.set('entry.290312375', nodemcuUpdates.count.toString());
        params.set('entry.2046558341:', nodemcuUpdates.maintenance.toString());
        params.set('entry.1719580299', '');
        params.set('entry.1567371503', downTime);
      }

      const fullUrl = `${url}?${params.toString()}`;

      return this.http.get(fullUrl);
    }
    return of("");
  }
}
