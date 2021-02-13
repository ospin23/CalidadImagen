// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  formatToValid: ['image/jpeg', 'image/png', 'image/jpg', 'image/tif', 'image/tiff', 'application/pdf'],
  successMessage: '¡El documento se han cargado con exito!',
  timeToast: 5000,
  clientId: '8089324b-0fc7-4306-8d32-806b409552ac',
  authority: 'https://login.microsoftonline.com/latourrette-consulting.com/',
  redirectUri: 'http://localhost:4200/home',
  protectedResourceMap: 'https://graph.microsoft.com/v1.0/me',
  errorMessage: '¡Formato de docuemneto no permitido!',
  showFormatImagenValid: '¡Formato no valido, utilice uno de los siguientes formatos .png, .jpg, .jpeg, .tif, .tiff, .pdf!',
  endpoint: 'http://localhost/BPOColombia/api/BPO'
};


