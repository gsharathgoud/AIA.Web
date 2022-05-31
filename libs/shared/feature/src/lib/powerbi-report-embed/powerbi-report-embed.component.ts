import { Embed, IReportEmbedConfiguration, Report } from 'powerbi-client';
import { EventHandler, PowerBIEmbedComponent } from '../powerbi-embed/powerbi-embed.component';
/* eslint-disable @angular-eslint/component-selector */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

/**
 * Report component to embed the report, extends the Base Component
 */
@Component({
  selector: 'powerbi-report[embedConfig]',
  template: '<div class={{cssClassName}} #reportContainer></div>',
})
export class PowerBIReportEmbedComponent
  extends PowerBIEmbedComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() embedConfig!: IReportEmbedConfiguration;

  @Input() phasedEmbedding?: boolean = false;

  @Input() eventHandlers?: Map<string, EventHandler | null>;

  @ViewChild('reportContainer') private containerRef!: ElementRef<HTMLDivElement>;

  private _embed?: Embed;

  private get embed(): Embed | undefined {
    return this._embed;
  }

  private set embed(newEmbedInstance: Embed | undefined) {
    this._embed = newEmbedInstance;
  }

  constructor() {
    super();
  }

  getReport(): Report {
    return this._embed as Report;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.embedConfig) {
      const prevEmbedConfig = changes.embedConfig.previousValue as IReportEmbedConfiguration;

      if (!prevEmbedConfig) {
        return;
      }

      this.embedOrUpdateReport(prevEmbedConfig);
    }

    if (this.eventHandlers && this.embed) {
      super.setEventHandlers(this.embed, this.eventHandlers);
    }
  }

  ngAfterViewInit(): void {
    if (this.containerRef.nativeElement) {
      if (this.embedConfig.accessToken && this.embedConfig.embedUrl) {
        this.embedReport();
      } else {
        this.embed = this.powerbi.bootstrap(this.containerRef.nativeElement, this.embedConfig);
      }
    }

    if (this.eventHandlers && this.embed) {
      super.setEventHandlers(this.embed, this.eventHandlers);
    }
  }

  /**
   * Embed or load the PowerBI Report based on phasedEmbedding flag
   *
   * @returns void
   */
  private embedReport(): void {
    // Check if the HTML container is rendered and available
    if (!this.containerRef.nativeElement) {
      return;
    }

    if (this.phasedEmbedding) {
      this.embed = this.powerbi.load(this.containerRef.nativeElement, this.embedConfig);
    } else {
      this.embed = this.powerbi.embed(this.containerRef.nativeElement, this.embedConfig);
    }
  }

  /**
   * When component updates, choose to _embed_ or _load_ the powerbi report
   * or do nothing if the embedUrl and accessToken did not update in the new properties
   *
   * @param prevEmbedConfig IReportEmbedConfiguration
   * @returns void
   */
  private embedOrUpdateReport(prevEmbedConfig: IReportEmbedConfiguration): void {
    if (!this.embedConfig.accessToken || !this.embedConfig.embedUrl) {
      return;
    }

    if (this.containerRef.nativeElement && this.embedConfig.embedUrl !== prevEmbedConfig.embedUrl) {
      this.embedReport();
    }
  }
}
