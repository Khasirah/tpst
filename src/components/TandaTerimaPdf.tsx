import {createPdf} from "pdfmake/build/pdfmake";
import * as v from "pdfmake/build/vfs_fonts"
import {SuratResponse} from "@/model/response/SuratResponse.tsx";
import {getDayName} from "@/model/DaysName.tsx";
import {getMonthName} from "@/model/MonthName.tsx";

export default async function generateTandaTerima(surat: SuratResponse) {
  const dateNow = new Date()
  const dayName = getDayName(dateNow.getDay())
  const monthName = getMonthName(dateNow.getMonth())
  const docDefinition = {
    info: {
      title: "Tanda Terima Surat",
    },
    pageSize: "A4",
    content: [
      {
        columns: [
          {
            width: 70,
            image: "kemenkeuHitamPutih",
            margin: [10, 10, 0, 0]
          },
          [
            {
              text: "KEMENTERIAN KEUANGAN REPUBLIK INDONESIA",
              style: ["text14", "alignCenter", "fontBold"],
            },
            {
              text: "DIREKTORAT JENDERAL PAJAK",
              style: ["text12", "alignCenter", "fontBold"]
            },
            {
              text: "KANTOR WILAYAH DIREKTORAT JENDERAL PAJAK JAKARTA PUSAT",
              style: ["text12", "alignCenter", "fontBold"]
            },
            {
              text: "MENARA DANAREKSA, JALAN MEDAN MERDEKA SEL. NO.14 JAKARTA PUSAT 10110",
              style: ["text9", "alignCenter"]
            },
            {
              text: "TELEPON (021) 3454070; FAKSIMILE (021) 3857202; LAMAN www.pajak.go.id;",
              style: ["text9", "alignCenter"]
            },
            {
              text: "LAYANAN INFORMASI DAN PENGADUAN KRING PAJAK (021) 1500200;",
              style: ["text9", "alignCenter"]
            },
            {
              text: "SUREL pengaduan@pajak.go.id; informasi@pajak.go.id",
              style: ["text9", "alignCenter"]
            },
          ],
        ],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 1, y1: 10,
            x2: 510, y2: 10,
            lineWidth: 3
          }
        ]
      },
      {
        margin: [0, 20, 0, 0],
        text: [
          "BUKTI SERAH TERIMA SURAT\n",
          "KANTOR WILAYAH DJP JAKARTA PUSAT"
        ],
        style: ["text14", "fontBold", "alignCenter"]
      },
      {
        margin: [0, 30, 0, 0],
        table: {
          widths: ["*", "*", "*"],
          headerRows: 1,
          body: [
            // header
            [
              {text: "NOMOR SURAT", style: ["text12", "fontBold", "alignCenter"]},
              {text: "PENGIRIM", style: ["text12", "fontBold", "alignCenter"]},
              {text: "PERIHAL", style: ["text12", "fontBold", "alignCenter"]}
            ],
            // end header
            [
              {text: surat.nomorSurat, style: ["alignCenter"]},
              {text: surat.namaPengirim, style: ["alignCenter"]},
              surat.perihal
            ]
          ]
        }
      },
      // signature
      {
        margin: [0, 70, 0, 0],
        text: `${dayName}, ${dateNow.getDate()} ${monthName} ${dateNow.getFullYear()}`,
        style: ["alignRight"],
      },
      {
        margin: [0, 5, 0, 0],
        text: "Petugas Penerima Surat",
        style: ["alignRight"]
      },
      {
        margin: [0, 70, 0, 20],
        text: surat.namaPetugasTpst,
        style: ["alignRight"]
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 1, y1: 10,
            x2: 510, y2: 10,
            lineWidth: 3,
            dash: {length: 10}
          }
        ]
      },
      {
        margin: [0, 20, 0, 0],
        text: [
          "BUKTI SERAH TERIMA SURAT\n",
          "KANTOR WILAYAH DJP JAKARTA PUSAT"
        ],
        style: ["text14", "fontBold", "alignCenter"]
      },
      {
        margin: [0, 30, 0, 0],
        table: {
          widths: ["*", "*", "*"],
          headerRows: 1,
          body: [
            // header
            [
              {text: "NOMOR SURAT", style: ["text12", "fontBold", "alignCenter"]},
              {text: "PENGIRIM", style: ["text12", "fontBold", "alignCenter"]},
              {text: "PERIHAL", style: ["text12", "fontBold", "alignCenter"]}
            ],
            // end header
            [
              {text: surat.nomorSurat, style: ["alignCenter"]},
              {text: surat.namaPengirim, style: ["alignCenter"]},
              surat.perihal
            ]
          ]
        }
      },
      // signature
      {
        margin: [0, 50, 0, 0],
        text: `${dayName}, ${dateNow.getDate()} ${monthName} ${dateNow.getFullYear()}`,
        style: ["alignRight"],
      },
      {
        margin: [0, 5, 0, 0],
        columns: [
          {
            text: "Pengirim"
          },
          {
            text: "Petugas Penerima Surat",
            style: ["alignRight"]
          }
        ]
      },
      {
        margin: [0, 70, 0, 20],
        columns: [
          {
            text: surat.namaPengirim
          },
          {
            text: surat.namaPetugasTpst,
            style: ["alignRight"]
          }
        ]
      },
    ],
    images: {
      kemenkeuHitamPutih: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkriULBq9w590AMkmuFW0T6SuFTB9mFz_PZQ&s"
    }
    ,
    styles: {
      text14: {
        fontSize: 14
      }
      ,
      text12: {
        fontSize: 12
      }
      ,
      text9: {
        fontSize: 9
      }
      ,
      fontBold: {
        bold: true
      }
      ,
      alignCenter: {
        alignment: "center"
      }
      ,
      alignRight: {
        alignment: "right"
      }
    }
  }

  // noinspection TypeScriptValidateTypes
  return createPdf(
    docDefinition,
    undefined, {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-MediumItalic.ttf",
      },
      Courier: {
        normal: "Courier",
        bold: "Courier-Bold",
        italics: "Courier-Oblique",
        bolditalics: "Courier-BoldOblique",
      },
    },
    v.pdfMake.vfs
  );
}