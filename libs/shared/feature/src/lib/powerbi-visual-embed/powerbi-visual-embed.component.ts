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
import { Embed, IVisualEmbedConfiguration, Visual } from 'powerbi-client';
import { EventHandler, PowerBIEmbedComponent } from '../powerbi-embed/powerbi-embed.component';

/**
 * Visual component to embed the visual, extends Base component
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'powerbi-visual[embedConfig]',
  template: '<div class={{cssClassName}} #visualContainer></div>',
})
export class PowerBIVisualEmbedComponent
  extends PowerBIEmbedComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() embedConfig!: IVisualEmbedConfiguration;

  @Input() eventHandlers?: Map<string, EventHandler | null>;

  @ViewChild('visualContainer') private containerRef!: ElementRef<HTMLDivElement>;

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

  getVisual(): Visual {
    return this._embed as Visual;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.embedConfig) {
      const prevEmbedConfig = changes.embedConfig.previousValue as IVisualEmbedConfiguration;

      if (!prevEmbedConfig) {
        return;
      }

      this.embedOrUpdateVisual(prevEmbedConfig);
    }

    if (this.eventHandlers && this.embed) {
      super.setEventHandlers(this.embed, this.eventHandlers);
    }
  }

  ngAfterViewInit(): void {
    if (this.containerRef.nativeElement) {
      if (this.embedConfig.accessToken && this.embedConfig.embedUrl) {
        this.embedVisual();
      } else {
        this.embed = this.powerbi.bootstrap(this.containerRef.nativeElement, this.embedConfig);
      }
    }

    if (this.eventHandlers && this.embed) {
      super.setEventHandlers(this.embed, this.eventHandlers);
    }
  }

  /**
   * Embed the PowerBI Visual
   *
   * @returns void
   */
  private embedVisual(): void {
    if (!this.containerRef.nativeElement) {
      return;
    }

    this.embed = this.powerbi.embed(this.containerRef.nativeElement, this.embedConfig);
  }

  /**
   * When component updates, choose to _embed_ the powerbi visual
   * or do nothing if the embedUrl and accessToken did not update in the new properties
   *
   * @param prevEmbedConfig IVisualEmbedConfiguration
   * @returns void
   */
  private embedOrUpdateVisual(prevEmbedConfig: IVisualEmbedConfiguration): void {
    // Check if Embed URL and Access Token are present in current properties
    if (!this.embedConfig.accessToken || !this.embedConfig.embedUrl) {
      return;
    }

    if (this.containerRef.nativeElement && this.embedConfig.embedUrl !== prevEmbedConfig.embedUrl) {
      this.embedVisual();
    }
  }
}
