/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { Embed, factories, service } from 'powerbi-client';
import { stringifyMap } from '@aia.web/shared/utils';

/**
 * Type for event handler function of embedded entity
 */
export type EventHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event?: service.ICustomEvent<any>,
  embeddedEntity?: Embed
) => void | null;

/**
 * Base component to hold common properties for all the Power BI entities
 */
@Component({
  selector: 'powerbi-embed',
  template: '',
})
export class PowerBIEmbedComponent implements OnInit {
  @Input() cssClassName?: string;

  @Input() service?: service.Service;

  powerbi!: service.Service;

  private prevEventHandlerMapString = '';

  ngOnInit(): void {
    if (this.service) {
      this.powerbi = this.service;
    } else {
      this.powerbi = new service.Service(
        factories.hpmFactory,
        factories.wpmpFactory,
        factories.routerFactory
      );
    }
  }

  /**
   * Sets all event handlers from the input on the embedded entity
   *
   * @param embed Embedded object
   * @param eventHandlerMap Array of event handlers to be set on embedded entity
   * @returns void
   */
  protected setEventHandlers(
    embed: Embed,
    eventHandlerMap: Map<string, EventHandler | null>
  ): void {
    const eventHandlerMapString = stringifyMap(eventHandlerMap);
    if (this.prevEventHandlerMapString === eventHandlerMapString) {
      return;
    }
    this.prevEventHandlerMapString = eventHandlerMapString;
    eventHandlerMap.forEach((eventHandlerMethod, eventName) => {
      embed.off(eventName);
      if (eventHandlerMethod) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        embed.on(eventName, (event: service.ICustomEvent<any>): void => {
          eventHandlerMethod(event, embed);
        });
      }
    });
  }
}
