/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PowerBIReportEmbedComponent } from '@aia.web/shared/feature';
import { IReportEmbedConfiguration, models, Report, service } from 'powerbi-client';
import {
  errorClass,
  errorElement,
  hidden,
  position,
  reportUrl,
  successClass,
  successElement,
} from '../../constants';
import { HttpService } from './reports.service';

export interface ConfigResponse {
  Id: string;
  EmbedUrl: string;
  EmbedToken: {
    Token: string;
  };
}

export interface IHttpPostMessageResponse<T> {
  statusCode: number;
  statusText: string;
  headers: unknown;
  body: T;
}

@Component({
  selector: 'aia-web-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;
  @ViewChild('status') private statusRef!: ElementRef<HTMLDivElement>;
  @ViewChild('embedReportBtn')
  private embedBtnRef!: ElementRef<HTMLButtonElement>;

  isEmbedded = false;
  displayMessage = 'The report is bootstrapped. Click Embed Report button to set the access token.';
  reportClass = 'report-container hidden';
  phasedEmbeddingFlag = false;

  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: undefined,
  };

  paidBasisFilter: models.IBasicFilter = {
    $schema: 'http://powerbi.com/product/schema#basic',
    target: {
      table: 'Measure Group',
      column: 'Measure',
    },
    operator: 'In',
    values: ['PEPM'],
    filterType: models.FilterType.Basic,
    requireSingleSelection: true,
  };

  globalFilters: models.OnLoadFilters = {
    allPages: {
      operation: models.FiltersOperations.ReplaceAll,
      filters: [this.paidBasisFilter],
    },
  };

  eventHandlersMap = new Map<string, (event?: service.ICustomEvent<unknown>) => void>([
    ['loaded', () => console.log('Report has loaded')],
    [
      'rendered',
      () => {
        console.log('Report has rendered');
        if (!this.isEmbedded) {
          this.displayMessage =
            'Use the buttons above to interact with the report using Power BI Client APIs.';
        }
        this.isEmbedded = true;
      },
    ],
    [
      'error',
      (event?: service.ICustomEvent<unknown>) => {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
  ]);

  constructor(public httpService: HttpService, private element: ElementRef<HTMLDivElement>) {}

  async embedReport(): Promise<void> {
    let reportConfigResponse: ConfigResponse;

    try {
      reportConfigResponse = await this.httpService.getEmbedConfig(reportUrl).toPromise();
    } catch (error) {
      await this.prepareDisplayMessageForEmbed(errorElement, errorClass);
      this.displayMessage = `Failed to fetch config for report. Status: ${error.statusText} Status Code: ${error.status}`;
      console.error(this.displayMessage);
      return;
    }

    this.reportConfig = {
      ...this.reportConfig,
      id: reportConfigResponse.Id,
      embedUrl: reportConfigResponse.EmbedUrl,
      accessToken: reportConfigResponse.EmbedToken.Token,
      filters: this.globalFilters,
      settings: {
        filterPaneEnabled: false,
        layoutType: models.LayoutType.Custom,
        customLayout: {
          displayOption: models.DisplayOption.FitToPage,
          pageSize: {
            type: models.PageSizeType.Widescreen,
          },
        },
      },
    };

    const reportDiv = this.element.nativeElement.querySelector('.report-container');
    if (reportDiv) {
      reportDiv.classList.remove(hidden);
      reportDiv.setAttribute('style', 'height:60vh;');
    }

    const displayMessage = this.element.nativeElement.querySelector('.display-message');
    if (displayMessage) {
      displayMessage.classList.remove(position);
    }

    await this.prepareDisplayMessageForEmbed(successElement, successClass);
    this.displayMessage = 'Access token is successfully set. Loading Power BI report.';
  }

  async hideFilterPane(): Promise<IHttpPostMessageResponse<void> | undefined> {
    const report: Report = this.reportObj.getReport();

    if (!report) {
      this.prepareStatusMessage(errorElement, errorClass);
      this.displayMessage = 'Report not available.';
      console.log(this.displayMessage);
      return;
    }

    const settings = {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
    };

    try {
      const response = await report.updateSettings(settings);
      this.prepareStatusMessage(successElement, successClass);
      this.displayMessage = 'Filter pane is hidden.';
      console.log(this.displayMessage);

      return response;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async prepareDisplayMessageForEmbed(img: HTMLImageElement, type: string): Promise<void> {
    this.embedBtnRef.nativeElement.remove();
    this.statusRef.nativeElement.prepend(img);
    this.statusRef.nativeElement.classList.add(type);
  }

  setDataSelectedEvent(): void {
    this.eventHandlersMap = new Map<string, (event?: service.ICustomEvent<unknown>) => void>([
      ...this.eventHandlersMap,
      ['dataSelected', (event) => console.log(event)],
    ]);
    this.prepareStatusMessage(successElement, successClass);
    this.displayMessage =
      'Data Selected event set successfully. Select data to see event in console.';
  }

  prepareStatusMessage(img: HTMLImageElement, type: string) {
    this.statusRef.nativeElement.prepend(img);
    this.statusRef.nativeElement.classList.add(type);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
