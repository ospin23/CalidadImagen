import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { Base64Service } from 'src/app/services/base64.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { RequestService } from 'src/app/services/request.service';
import { Model } from 'src/app/core/models/model';
import { Response } from 'src/app/core/models/response';
import { JsonPipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-view-control',
  templateUrl: './view-control.component.html',
  styleUrls: ['./view-control.component.scss']
})
export class ViewControlComponent implements OnInit, OnDestroy {
  @ViewChild('attachments') attachment: any;
  modelo: Model;
  response: Response;
  listOfFiles: File[] = [];
  subscription: any;
  base: any = [];
  namefile: any;
  sourceFile: any;
  title: string;
  constructor(
    private authService: MsalService,
    private broadcastService: BroadcastService,
    private http: HttpClient,
    private route: Router,
    private toastr: ToastMessageService,
    private base64: Base64Service,
    private requestService: RequestService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit(): void {
	  this.response= new Response();
    this.shareDataService.addUser(this.authService.getAccount().idTokenClaims.name);
    console.log(this.authService.getAccount().idTokenClaims);
  }

  ngOnDestroy(): void {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    this.route.navigate(['/login']);
    this.authService.logout();
  }

  onFileSelected(event: any): void {
    let file= event.target.files[0];
	if (!(Array.from(environment.formatToValid).includes(file.type)))
	{
		this.toastr.showError(environment.showFormatImagenValid);
	}
	else
	{
		this.namefile= file.name;
		const reader= new FileReader();
		reader.onload = () => { 
			this.sourceFile= <String>reader.result;
		}
		reader.readAsDataURL(file);
		this.base64.base64Enconde(file)
          .then(b => {
            this.modelo = (new Model(file.name, (b.split(',')[1]),
              file.type, localStorage.nombreUsuario));
          });
        this.toastr.showSuccess(environment.successMessage);
	}
  }

  createJob(): void {
	this.CleanModel();
	this.title= "Ejecutando...";
    this.base = JSON.stringify(this.modelo);
	console.log(this.base);
    this.requestService.createJob(this.base)
      .subscribe((newJob) => {
		this.title= "Resultados";
		this.response.documentType= `Tipo de documento: ${newJob.TipoDocumento}`;
		this.response.confidence= `Confianza clasificación: ${newJob.PorcentajeConfianza}`;
		this.response.OCRConfidence= `Confianza de OCR: ${newJob.ConfianzaOCR}`;
		this.response.blurValue= `Valor de nitidez: ${newJob.Nitidez}`;
		this.response.qualityNote= `Nota calidad: ${newJob.NotaCalidad}`;
		this.response.message= `Mensaje: ${newJob.MensajeCalidad}`;
		if(newJob.TipoDocumento == "Documento No Clasificado"){return;}
		let tabla= <HTMLInputElement>document.getElementById("tblResultado");
		tabla.innerHTML= "";
		let headers= ["Nombre Campo", "Valor", "Confianza"];
		let filaHeaders= document.createElement("tr");
		for(let i=0;i<headers.length;i++)
		{
			let nodo= document.createElement("th");
			nodo.innerText= headers[i];
			filaHeaders.appendChild(nodo);
		}
		tabla.appendChild(filaHeaders);
		for(let i=0;i<newJob.LstCampos.length;i++)
		{
			let nuevaFila= document.createElement("tr");
			let nodoNombre= document.createElement("td");
			let nodoValor= document.createElement("td");
			let nodoConfianza= document.createElement("td");
			
			nodoNombre.innerText= newJob.LstCampos[i].Nombre;
			nodoConfianza.innerText= newJob.LstCampos[i].Confianza;
			
			if (newJob.LstCampos[i].Filas == null)
			{
				nodoValor.innerText= newJob.LstCampos[i].Valor;
			}
			else
			{
				let nuevaTabla= document.createElement("table");
				nuevaTabla.setAttribute("border", "1");
				let filaTitulos= document.createElement("tr");
				var primeraColumna= "";
				var datos= "";
				var finTitulo= false;
				for(let j=0; j<newJob.LstCampos[i].Filas.length;j++)
				{
					if (j==0)
					{
						primeraColumna= newJob.LstCampos[i].Filas[j].Nombre;
						let nodoCol= document.createElement("th");
						nodoCol.innerText= primeraColumna;
						filaTitulos.appendChild(nodoCol);
					}
					else
					{
						if(primeraColumna!=newJob.LstCampos[i].Filas[j].Nombre)
						{
							let nodoCol= document.createElement("th");
							nodoCol.innerText= newJob.LstCampos[i].Filas[j].Nombre;
							filaTitulos.appendChild(nodoCol);
							if(j==newJob.LstCampos[i].Filas.length-1){nuevaTabla.appendChild(filaTitulos);break;}
						}
						else
						{
							nuevaTabla.appendChild(filaTitulos);
							break;
						}
					}
				}
				for(let j=0; j<newJob.LstCampos[i].Filas.length;j++)
				{
					if(primeraColumna!=newJob.LstCampos[i].Filas[j].Nombre)
					{
						datos+= "<td>" + newJob.LstCampos[i].Filas[j].Valor + "</td>";
					}
					else
					{
						if(j==0)
						{
							datos+= "<tr><td>" + newJob.LstCampos[i].Filas[j].Valor + "</td>";
						}
						else
						{
							datos+= "</tr><tr><td>" + newJob.LstCampos[i].Filas[j].Valor + "</td>";
						}
					}
				}
				nuevaTabla.innerHTML+= datos;
				nodoValor.appendChild(nuevaTabla);
			}
			nuevaFila.appendChild(nodoNombre);
			nuevaFila.appendChild(nodoValor);
			nuevaFila.appendChild(nodoConfianza);
			tabla.appendChild(nuevaFila);
		}
      });
  }
  
  CleanModel(): void {
	(<HTMLInputElement>document.getElementById("tblResultado")).innerHTML= "";
    this.response.documentType= "";
	this.response.confidence= "";
	this.response.OCRConfidence= "";
	this.response.blurValue= "";
	this.response.qualityNote= "";
	this.response.message= "";
  }

}
