export class Model {
    Nombre: string;
    Base64: string;
    MimeType: string;
	Usuario: string;

    constructor(NombreArchivo: string, Base64: string, MimeType: string, Usuario: string) {
        this.Nombre = NombreArchivo;
        this.Base64 = Base64;
        this.MimeType = MimeType;
		this.Usuario= Usuario;
    }
}
