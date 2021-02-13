export const environment = {
  production: true,
  formatToValid: ['image/jpeg', 'image/png', 'image/jpg', 'image/tif', 'image/tiff', 'application/pdf'],
  successMessage: '¡El documento se han cargado con exito!',
  timeToast: 5000,
  clientId: '2bf063ba-8532-4cd2-87c3-31f09f361027',
  authority: 'https://login.microsoftonline.com/latourrette-consulting.com/',
  redirectUri: 'http://localhost/BPOCliente/home',
  protectedResourceMap: 'https://graph.microsoft.com/v1.0/me',
  errorMessage: '¡Formato de docuemneto no permitido!',
  showFormatImagenValid: '¡Formato no valido, utilice uno de los siguientes formatos .png, .jpg, .jpeg, .tif, .tiff, .pdf!',
  endpoint: 'http://localhost/BPOColombia/api/BPO'
};