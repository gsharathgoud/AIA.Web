const successElement = document.createElement('img');
successElement.className = 'status-img';
successElement.src = '/assets/success.svg';

const errorElement = document.createElement('img');
errorElement.className = 'status-img';
errorElement.src = '/assets/error.svg';
const reportUrl = 'https://aka.ms/CaptureViewsReportEmbedConfig';
const errorClass = 'error';
const successClass = 'success';
const hidden = 'hidden';
const position = 'position';

export { errorClass, errorElement, hidden, position, reportUrl, successClass, successElement };
